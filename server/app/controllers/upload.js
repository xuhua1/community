const Upload = require('../models/upload');
const UploadComment = require('../models/uploadComment');
const co = require('co');
const User = require('../models/user');
//增加一条upload文件

exports.add = (req, res) => {
  const upload = new Upload(req.body);
  upload.save()
    .then(function (data) {
      res.send({
        success: true,
        searchHistoryId: data._id,
      });
    }).catch(function (e) {
      res.send({
        success: false,
        message: e.message
      });
    });
};

/**
 * 通过UserId进行分页查询
 */
exports.findAllByUser = (req, res) => {
  const userId = req.query.userId;
  const skip = req.query.skip;
  const number = req.query.number;
  Upload.find({ userId: userId }).skip(skip)
    .limit(number).sort({ 'meta.createdAt': -1 }).select('label oneWord inDetail urlList meta.createdAt').exec((err, result) => {
      if (err) {
        res.send({
          success: false,
          message: e.message
        })
      } else {
        res.send({
          success: true,
          data: result
        })
      }
    })
};

/**
 * 查询所有upload
 */
exports.findAll = co.wrap(
  function* (req, res) {
    const qs=new RegExp(req.query.search);
    const userId = req.query.userId;
    console.log(qs,userId);
    try {
      let result;
      if(userId){
        result = yield Upload.find({userId:userId}).sort({ 'meta.createdAt': -1 })
                    .select(' userId oneWord').exec();
      }else{
        result = yield Upload.find({oneWord:qs}).sort({ 'meta.createdAt': -1 })
                    .select(' userId oneWord').exec();
      }
      let promUserArray = [], commentArr = [];
      result.forEach((item) => {
        promUserArray.push(User.findById(item.userId).select('nickname').exec());
        commentArr.push(UploadComment.countDocuments({ uploadId: item._id }).exec());
      });
      const newUserResult = yield Promise.all(promUserArray);
      const newCommentArr = yield Promise.all(commentArr);
      const resResult = newUserResult.map((item, index) => {
        const { nickname } = item;
        const { userId, _id, oneWord } = result[index];
        return { nickname, userId, _id, oneWord, commentNum:newCommentArr[index]};
      });
      res.send({
        success: true,
        data: resResult
      })
    } catch (error) {
      res.send({
        success: false,
        message: error.message
      })
    }
  }
);

/**
 * 更新upload
 */
exports.update = (req, res) => {
  Upload.findByIdAndUpdate(req.body.uploadId, req.body, (err, result) => {
    if (err) {
      res.send({
        success: false,
        message: e.message,
      })
    } else {
      res.send({
        success: true,
      })
    }
  })
};

/**
 * 通过id查询
 */
exports.findOneById = co.wrap(
  function* (req, res) {
    const uploadId = req.query.uploadId;
    try {
      const result = yield Upload.findById(uploadId).sort({ 'meta.createdAt': -1 })
        .select(' userId label oneWord inDetail urlList meta.createdAt').exec();
      const newComment = yield UploadComment.find({ uploadId: result._id }).select('userId uploadValue meta.createdAt').exec();
      const newUser = yield User.findById(result.userId).select('nickname avatar').exec();
      const { avatar, nickname } = newUser;

      let promUserArray = [];
      newComment.forEach((item) => {
        promUserArray.push(User.findById(item.userId).select('avatar nickname').exec());
      });
      const newUserMes = yield Promise.all(promUserArray);

      const newArr = newComment.map((item, index) => {
        const { _id, userId, uploadValue, meta } = item;
        const { avatar, nickname } = newUserMes[index];
        return {
          _id, userId, uploadValue, meta, avatar, nickname,
        }
      });
      const { userId, label, oneWord, inDetail, urlList, meta } = result;
      res.send({
        success: true,
        data: {
          upload: { userId, label, oneWord, inDetail, urlList, meta, avatar, nickname },
          commentList: newArr,
        },
      })
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      })
    }
  }
);
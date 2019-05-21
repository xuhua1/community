const UploadComment = require('../models/uploadComment');
const co = require('co');
const User = require('../models/user');
//增加一条搜索历史

exports.add = (req, res) => {

  const uploadComment = new UploadComment(req.body);
  uploadComment.save()
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
 * 通过uploadId进行分页查询
 */
exports.findAllByUser = co.wrap(
  function* (req, res) {
    const uploadId = req.query.uploadId;
    try {
      const result = yield UploadComment.find({ uploadId: uploadId }).sort({ 'meta.createdAt': -1 })
        .select('userId uploadValue meta.createdAt').exec();
      let promUserArray = [];
      result.forEach((item) => {
        promUserArray.push(User.findById(item.userId, 'nickname avatar').exec());
      });
      const newUserArr = yield Promise.all(promUserArray);
      const newResult = result.map((item, index) => {
        const { nickname, avatar } = newUserArr[index];
        const { uploadValue, meta, _id } = item;
        return { nickname, avatar, uploadValue, meta, _id };
      })
      res.send({
        success: true,
        data: newResult,
      })
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      })
    }
  }
);
const Article = require('../models/article');
const co = require('co');
const User = require('../models/user');
const Comment = require('../models/comment');
//增加一篇文章
const getAbstract = (data) => {
  const arr = JSON.parse(data).blocks || [];
  let abstract = "";
  arr.forEach((item) => {
    abstract += item.text + "  ";
    if (abstract.length > 120) {
      return abstract;
    }
  });
  return abstract;
}
const getAbstractforMark = (data) => {
  let abstract = "";
  for (let i = 0; i < data.length; i++) {
    if ((/[A-Za-z]/).test(data[i]) || (/^[\u4e00-\u9fa5]/).test(data[i])) {
      abstract += data[i];
    }
    if ((abstract).length > 120) return abstract;
  }
  return abstract;
}
exports.add = (req, res) => {
  const articleValue = req.body.articleValue;
  let abstract;
  if (req.body.articleType === "markdown") {
    abstract = getAbstractforMark(articleValue);
  } else {
    abstract = getAbstract(articleValue);
  }
  const article = new Article({ ...req.body, abstract });
  article.save()
    .then(function (data) {
      res.send({
        success: true,
        articleId: data._id,
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
  Article.find({ userId: userId }).skip(skip)
    .limit(number).sort({ 'meta.createdAt': -1 }).select('articleValue articleTitle abstract commentNum likeNum  meta.createdAt').exec((err, result) => {
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
 * 查询所有article
 */
exports.findAll = co.wrap(
  function* (req, res) {
    const qs=new RegExp(req.query.search);
    const userId = req.query.userId;
    try {
      let result;
      if(userId){
        result = yield Article.find({userId:userId}).sort({ 'meta.createdAt': -1 })
        .select(' userId articleTitle articleType likeNum').exec();
      }else{
        result = yield Article.find({articleTitle:qs}).sort({ 'meta.createdAt': -1 })
        .select(' userId articleTitle articleType likeNum').exec();
      }
      let promUserArray = [], commentNumArr=[];
      result.forEach((item) => {
        promUserArray.push(User.findById(item.userId, 'nickname').exec());
        commentNumArr.push(Comment.countDocuments({ articleId: item._id }).exec());
      });
      const newUserResult = yield Promise.all(promUserArray);
      const newCommentNumArr = yield Promise.all(commentNumArr);
      const resResult = newUserResult.map((item, index) => {
        const { nickname } = item;
        const commentNum = newCommentNumArr[index];
        const { articleTitle, articleType,likeNum, _id, userId } = result[index];
        return { nickname, articleTitle, articleType, commentNum, likeNum, _id, userId};
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
 * 更新article
 */
exports.update = (req, res) => {
  Article.findByIdAndUpdate(req.body.articleId, req.body, (err, result) => {
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
    const articleId = req.query.articleId;
    try {
      const result = yield Article.findById(articleId).select('userId articleValue articleType commentNum likeNum meta.createdAt').exec();
      const { userId, articleValue, commentNum, likeNum, _id, meta, articleType } = result;
      const userMes = yield User.findById(userId).select('avatar nickname');
      const { avatar, nickname } = userMes;
      const newResObj = { _id, userId, articleValue, commentNum, likeNum, avatar, nickname, meta, articleType }
      res.send({
        success: true,
        data: newResObj,
      })
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      })
    }
  }
);
const Comment = require('../models/comment');
const User = require('../models/user');
const CommentReply = require('../models/commentreply');
const co = require('co');
//增加一条搜索历史

exports.add = (req, res) => {

  const comment = new Comment(req.body);
  comment.save()
    .then(function (data) {
      res.send({
        success: true,
        commentId: data._id,
      });
    }).catch(function (e) {
      res.send({
        success: false,
        message: e.message
      });
    });
};

/**
 * 通过articleId进行分页查询
 */
exports.findAllByCommentId = co.wrap(
  function* (req, res) {
    const articleId = req.query.articleId;
    const skip = req.query.skip;
    const number = req.query.number;
    try {
      const result = yield Comment.find({ articleId: articleId }).skip(skip).limit(number)
        .sort({ 'meta.createdAt': -1 }).select('userId commentValue meta.createdAt').exec();
      let promUserArray = [], promReplyArray = [];
      console.log(result);
      result.forEach((item, index) => {
        console.log(index);
        promUserArray.push(User.findById(item.userId, 'nickname avatar').exec());
        promReplyArray.push(CommentReply.countDocuments({ commentId: item._id }).exec());
      });
      const newUserResult = yield Promise.all(promUserArray);
      const newReplyNum = yield Promise.all(promReplyArray);

      const resResult = newUserResult.map((item, index) => {
        const { nickname, avatar } = item;
        const { meta, commentValue, _id, userId } = result[index];
        return { nickname, avatar, meta, commentValue, _id, userId, replyNum: newReplyNum[index] };
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
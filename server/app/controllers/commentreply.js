const CommentReply = require('../models/commentreply');
const co = require('co');
const User = require('../models/user');

//增加一条回复评论历史
exports.add = (req, res) => {

  const commentreply = new CommentReply(req.body);
  commentreply.save()
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
 * 
 *  userId: { type: String, required: true },
  commentId: { type: String, required: true },
  commentValue: { type: String, default: '' },

  meta: { 


    fromUserAvatar: results[i].get('fromUserAvatar'),
             fromUserName: results[i].get('fromUserName'),
             fromUserID: results[i].get('fromUserID'),
             toUserName: results[i].get('toUserName'),
             toUserID: results[i].get('toUserID'),
             content: results[i].get('replyCommentText'),
             createdAt: results[i].createdAt,


 */
/**
 * 通过commentId进行查询
 */
exports.findAllByCommentId = co.wrap(
  function* (req, res) {
    const commentId = req.query.commentId;
    try {
      const result = yield CommentReply.find({ commentId: commentId })
        .sort({ 'meta.createdAt': -1 }).select('userId toUserId commentValue meta.createdAt').exec();
      let promFromUArray = [], promToUArray = [];
      result.forEach((item) => {
        promFromUArray.push(User.findById(item.userId, 'nickname avatar').exec());
        promToUArray.push(User.findById(item.toUserId, 'nickname').exec());
      });
      const newFromUM = yield Promise.all(promFromUArray);
      const newToUM = yield Promise.all(promToUArray);
      const newResult = newToUM.map((item, index) => {
        const { userId, toUserId, commentValue, meta } = result[index];
        const { nickname, avatar } = newFromUM[index];
        const toUserName = item ? item.nickname : '未命名';
        return { avatar, nickname, userId, toUserName, toUserId, commentValue, meta };
      })
      res.send({
        success: true,
        data: newResult
      })
    } catch (error) {
      res.send({
        success: false,
        message: error.message
      })
    }
  }
);
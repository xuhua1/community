const Answer = require('../models/questionanswers');
const co = require('co');
const User = require('../models/user');
//增加一条搜索历史

exports.add = (req, res) => {

  const answer = new Answer(req.body);
  answer.save()
    .then(function (data) {
      res.send({
        success: true,
        data: data._id,
      });
    }).catch(function (e) {
      res.send({
        success: false,
        message: e.message
      });
    });
};

/**
 * 查询所有answer
 * userId: { type: String, required: true },
  questionId: { type: String, required: true },
  answerValue: { type: String, required: true },
  likeNum: { type: Number, default: 0 },
  disLikeNum: { type: Number, default: 0 },
  meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date } }
 */
exports.findAllByQuestionId = co.wrap(
  function* (req, res) {
    const questionId = req.query.questionId;
    try {
      let result = yield Answer.find({ questionId }).select('userId answerValue likeNum disLikeNum meta.createdAt').exec();
      let userPro = [];
      result.forEach(item => {
        const pro = User.findById(item.userId).select('avatar nickname').exec();
        userPro.push(pro);
      });
      const result2 = yield Promise.all(userPro);
      const newRes = result2.map((item, index) => {
        const { userId, answerValue, likeNum, disLikeNum, meta } = result[index];
        return {
          userId, answerValue, likeNum, disLikeNum, meta,
          avatar: item.avatar, nickname: item.nickname,
        }
      });
      res.send({
        success: true,
        data: newRes,
      })
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      })
    }
  }
);
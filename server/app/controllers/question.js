const Question = require('../models/question');
const QuestionAnswers = require('../models/questionanswers');
const co = require('co');
const User = require('../models/user');
//增加一条搜索历史

exports.add = (req, res) => {

  const question = new Question(req.body);
  question.save()
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
 * 通过UserId进行分页查询
 */
exports.findAllByUser = (req, res) => {
  const userId = req.query.userId;
  const skip = req.query.skip;
  const number = req.query.number;
  Question.find({ userId: userId }).skip(skip)
    .limit(number).sort({ 'meta.createdAt': -1 }).select('questionValue answers meta.createdAt').exec((err, result) => {
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
 * 分页查询所有Question
 */

exports.findAll = co.wrap(
  function* (req, res) {
    const qs=new RegExp(req.query.search);
    const userId = req.query.userId;
    try {
      let result;
      if(userId){
        result = yield Question.find({userId:userId}).sort({ 'meta.createdAt': -1 })
        .select(' userId oneWord').exec();
      }else{
        result = yield Question.find({oneWord:qs}).sort({ 'meta.createdAt': -1 })
        .select(' userId oneWord').exec();
      }
      
      let promUserArray = [], answerArr = [];
      result.forEach((item) => {
        promUserArray.push(User.findById(item.userId).select('nickname').exec());
        answerArr.push(QuestionAnswers.countDocuments({ questionId: item._id }).exec());
      });
      const newUserResult = yield Promise.all(promUserArray);
      const newAnswerArr = yield Promise.all(answerArr);
      const resResult = newUserResult.map((item, index) => {
        const { nickname } = item;
        const { userId, _id, oneWord } = result[index];
        return { nickname, userId, _id, oneWord, answerNum:newAnswerArr[index]};
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
 * 更新Question
 */
exports.update = (req, res) => {
  Question.findByIdAndUpdate(req.body.questionId, req.body, (err, result) => {
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
 *  userId: { type: String, required: true },
  label: [String],
  oneWord: { type: String, required: true },
  inDetail: { type: String, required: true },
  urlList: [String],

  answers: [answerSchema],
  meta: { createdAt:
 */
exports.findOneById = co.wrap(
  function* (req, res) {
    const questionId = req.query.questionId;
    try {
      let result = yield Question.findById(questionId).exec();
      let userResu = yield User.findById(result.userId).select('nickname avatar').exec();
      const { avatar, nickname } = userResu;
      const { _id, userId, label, meta, oneWord, inDetail, urlList, answers } = result;
      res.send({
        success: true,
        data: { _id, userId, avatar, nickname, label, meta, oneWord, inDetail, urlList, answers },
      })
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      })
    }
  }
);
/**
 * 添加答案
 */
/*
exports.findOneById = (req, res) => {
  Question.findById(req.body.questionId, (err, result) => {
    if (err) {
      res.send({
        success: false,
        message: err
      })
    }
    result.answers.unshift(req.body);
    result.save().then((error, response) => {
      if (error) {
        res.send({
          success: false,
          message: err
        })
      } else {
        res.send({
          success: true,
          data: result
        });
      }
    }
    )
  });
}*/

module.exports = function (app) {

  /**
   * 引入接口，判断cookie
   */
  const user = require('../../controllers/user');
  const article = require('../../controllers/article');
  const comment = require('../../controllers/comment');
  const commentreply = require('../../controllers/commentreply');
  const upload = require('../../controllers/upload');
  const question = require('../../controllers/question');
  const questionAwnser = require('../../controllers/questionanswers');
  const svgCaptcha = require('../../config/captcha');
  const yunPian = require('../../config/yunpian');
  const wx = require('../../wx');
  /**
   * user api公共接口
   */
  app.get('/api/user/findOne', user.findOneById);
  app.post('/api/user/findarr', user.findByArr);
  app.get('/api/user/findall', user.findAll);

  /**
   * 文章 api公共接口
   */

  app.get('/api/article/finbyuser', article.findAllByUser);
  app.get('/api/article/findall', article.findAll);
  app.get('/api/article/findbyid', article.findOneById);

  /**
   * 评论 api公共接口
   */
  app.get('/api/comment/findbyart', comment.findAllByCommentId);

  /**
   * 回复评论 api公共接口
   */
  app.get('/api/replycomment/findcy', commentreply.findAllByCommentId);


  /**
   * upload api公共接口
   */
  app.get('/api/upload/findbyid', upload.findOneById);
  app.get('/api/upload/findall', upload.findAll);

  /**
   * question api接口
   */
  app.get('/api/question/findbyid', question.findOneById);
  app.get('/api/question/findall', question.findAll);
  app.get('/api/question/findbyqid', questionAwnser.findAllByQuestionId);

  /**
   * 验证码
   */
  app.get('/api/getcaptcha', svgCaptcha.getCode);
  app.get('/api/checkcaptcha', svgCaptcha.checkCode);

  /**
   * 短信验证
   */
  app.get('/api/getsmscode', yunPian.sendTplSms);
  app.get('/api/checksmscode', yunPian.checkTplSms);

  /**
   * 小程序公共接口
   */
  app.get('/wxapi/getdata', wx.getdata);
  app.get('/wxapi/getmusicdata', wx.getmusicdata);
};
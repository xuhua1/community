module.exports = function (app) {

  /**
   * 引入接口，判断cookie
   */
  const OSS = require('ali-oss');
  const fs = require('fs');
  const path = require('path');
  const conf = require('../../config/alioss/config');
  const STS = OSS.STS;

  const user = require('../../controllers/user');
  const searchHistory = require('../../controllers/searchHistory');
  const article = require('../../controllers/article');
  const comment = require('../../controllers/comment');
  const commentreply = require('../../controllers/commentreply');
  const question = require('../../controllers/question');
  const questionAwnser = require('../../controllers/questionanswers');
  const upload = require('../../controllers/upload');
  const uploadComment = require('../../controllers/uploadComment');
  const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(404).send('false');
  }

  /**
   * user api私有接口
   */
  app.post('/api/user/add', isAuthenticated, user.add);
  app.post('/api/user/update'/*, isAuthenticated*/, user.update);

  /**
   * 搜索历史 api私有接口
   */
  app.post('/api/search/add', isAuthenticated, searchHistory.add);
  app.get('/api/search/findAll', isAuthenticated, searchHistory.findAll);
  app.delete('/api/search/remove', isAuthenticated, searchHistory.remove);
  app.get('/api/search/chitem', isAuthenticated, searchHistory.cHItem)

  /**
   * 文章 api私有接口
   */
  app.post('/api/article/add', isAuthenticated, article.add);
  app.post('/api/article/update', isAuthenticated, article.update);

  /**
   * 评论 api私有
   */
  app.post('/api/comment/add',/* isAuthenticated, */ comment.add);
  /**
   * 回复评论私有接口
   */
  app.post('/api/replycomment/add', commentreply.add);
  /**
   * question api私有接口
   */
  app.post('/api/question/add', isAuthenticated, question.add);
  app.post('/api/question/addawnser', questionAwnser.add);

  /**
   * upload api私有接口
   */
  app.post('/api/upload/add', /* isAuthenticated, */ upload.add);

  app.post('/api/upload/addcomment',/* isAuthenticated, */ uploadComment.add);


  /**
   * alioss获取上传密钥
   */
  app.get('/api/sts',/* isAuthenticated, */(req, res) => {
    let policy;
    if (conf.PolicyFile) {
      policy = fs.readFileSync(path.resolve(__dirname, '../../config/alioss/', conf.PolicyFile)).toString('utf-8');
    }

    const client = new STS({
      accessKeyId: conf.AccessKeyId,
      accessKeySecret: conf.AccessKeySecret
    });

    client.assumeRole(conf.RoleArn, policy, conf.TokenExpireTime).then((result) => {
      res.json({
        AccessKeyId: result.credentials.AccessKeyId,
        AccessKeySecret: result.credentials.AccessKeySecret,
        SecurityToken: result.credentials.SecurityToken,
        Expiration: result.credentials.Expiration
      });
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
  });
};
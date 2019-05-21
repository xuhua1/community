const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const session = require("express-session");
const passport = require('passport');
const co = require('co');
const User = require('./app/models/user');
const hostname = '0.0.0.0';
require('./app/config/passport')(passport);

const newApp = express();
const app = express();
const http = require('http').createServer(app);


app.use(express.static(__dirname + '/public'));//设置静态文件目录 url访问 public下的html,png等资源
app.use(cookie());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST,OPTIONS,GET,DELETE,PUT');
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Content-Type", "application/json;charset=utf-8")
  if (req.method.toLocaleLowerCase() === 'options') {
    res.status(200);
    return res.json({});   //直接返回空数据，结束此次请求
  } else {
    next();
  }
});



app.post('/register', co.wrap(function* (req, res) {
  const user = new User(req.body);
  try {
    yield user.save();
    req.logIn(user, err => {
      if (err) req.send({ success: false, message: '设置cookie失败' });
      return res.send({
        success: true,
        data: {
          userId: req.user._id,
          avatar: req.user.avatar,
          nickname: req.user.nickname,
        }
      });
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err.errors.phone.message
    });
  }
}));

const checkCaptcha = function (req, res, next) {
  const { captcha } = req.session;
  if (req.body.captcha === captcha) return next();
  res.send({
    success: false,
    captchaNotMatch: true,
  })
}

app.post('/login',
  checkCaptcha,
  passport.authenticate('local', { failureRedirect: '/signin' }),
  co.wrap(function* (req, res) {
    try {
      const phone = req.body.phone;
      const result = yield User.find({ phone }).select('avatar nickname').exec();
      res.send({
        success: true,
        data: result,
      })
    } catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
  })
);

app.get('/logout', function (req, res) {
  req.logout();
  res.send({
    success: true,
  });
});


require('./app/routes')(app);
require('./app/routes/private')(app);
require('./app/routes/public')(app);
// levantando el Servidor


var server = http.listen(3000, hostname, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://127.0.0.1:3000", host, port);

});

const io = require('socket.io')(http);
require('./app/config/socket')(io);
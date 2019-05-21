// 修改为您的apikey.可在官网（https://www.yunpian.com)登录后获取
const https = require('https');
const qs = require('querystring');

const apikey = '2babdcc27b785ecb090678e4c136936e';
// 修改为您要发送的手机号码，多个号码用逗号隔开
//const mobile = '13609753484';
// 指定发送的模板编号
const tpl_id = 2793130;
// 指定发送模板的内容
//const tpl_value = { '#code#': '2222' };
// 智能匹配模板发送https地址
const sms_host = 'sms.yunpian.com';

send_sms_uri = '/v2/sms/single_send.json';
// 指定模板发送接口https地址
send_tpl_sms_uri = '/v2/sms/tpl_single_send.json';
// 发送语音验证码接口https地址
send_voice_uri = '/v2/voice/send.json';

exports.checkTplSms = (req, res) => {
  const smsCodeValue = req.query.smscode;
  const { smscode } = req.session;
  if (smsCodeValue === smscode) {
    res.send({
      success: true,
    })
  } else {
    res.send({
      success: false,
    })
  }
}

exports.sendTplSms = (req, res) => {
  try {
    const mobile = req.query.phone;
    const random = Math.floor(Math.random() * 10000);

    const strRandom = random + '';
    req.session.smscode = strRandom;
    const tpl_value = { '#code#': strRandom };
    console.log(mobile, tpl_value);
    console.log(req.session);
    send_tpl_sms(send_tpl_sms_uri, apikey, mobile, tpl_id, tpl_value);
    res.send({
      success: true,
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
}

function send_tpl_sms (uri, apikey, mobile, tpl_id, tpl_value) {
  const post_data = {
    'apikey': apikey,
    'mobile': mobile,
    'tpl_id': tpl_id,
    'tpl_value': qs.stringify(tpl_value),
  };//这是需要提交的数据  
  const content = qs.stringify(post_data);
  post(uri, content, sms_host);
}
function post (uri, content, host) {
  const options = {
    hostname: host,
    port: 443,
    path: uri,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };
  const req = https.request(options, function (res) {
    // console.log('STATUS: ' + res.statusCode);  
    // console.log('HEADERS: ' + JSON.stringify(res.headers));  
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });
  //console.log(content);
  req.write(content);

  req.end();
}
const svgCaptcha = require('svg-captcha');

exports.getCode = (req, res) => {
  const codeConfig = {
    size: 4,
    ignoreChars: '0o1il',
    noise: 2,
    height: 40,
    background: '#cc9966',
    /**
     * height: number // height of captcha
fontSize: number // captcha text size
charPreset: string // random character preset
     */
  }
  const captcha = svgCaptcha.create(codeConfig);
  req.session.captcha = captcha.text.toLowerCase();
  const codeData = {
    success: true,
    data: captcha.data,
  }
  res.send(codeData);
}

exports.checkCode = (req, res) => {
  const captchaValue = req.query.captcha;
  const { captcha } = req.session;
  if (captchaValue.toLowerCase() === captcha) {
    res.send({
      success: true,
    })
  } else {
    res.send({
      success: false,
    })
  }

}
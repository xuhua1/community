import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from 'antd';
import {Link} from 'react-router-dom';
import {
  LoginWrapper,
  LoginBox,
  Logo
} from './style';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props.getCaptcha();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.logIn(values, this.props.history);
      }
    });
  }
  getSvgCaptchaImage = (data) => {
    return (
      <div style={{ width: '150px', height: '40px', display: 'inline-block' }} dangerouslySetInnerHTML={{ __html: data }} />
    )
  }
  validateCaptcha = async (rule, value, callback) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/checkcaptcha?captcha=' + value, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
      });
      const responseJson = await response.json();
      console.log(response);
      if (responseJson.success) {
        callback();
      } else {
        callback("验证码错误");
      }
    } catch (error) {
      message.error("验证码验证失败");
      console.log(error);
      callback();
    }
  }
  render () {
    console.log(1);
    const { svgCaptcha } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <LoginWrapper>
        <LoginBox>
          <Link to="/home"><Logo/></Link>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '手机号不能为空!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '密码不能为空!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={11}>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: '验证码不能为空!' }, {
                      validator: this.validateCaptcha,
                    }],
                    validateTrigger: 'onSubmit',
                  })(
                    <Input type="text" placeholder="验证码" />
                  )}</Col>
                <Col offset={1} span={12} onClick={() => { this.props.getCaptcha() }} >{this.getSvgCaptchaImage(svgCaptcha)}</Col>
              </Row>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住我</Checkbox>
              )}
              <Link className="login-form-forgot" to="">忘记密码</Link>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
              <Link to="./register">注册</Link>
            </Form.Item>
          </Form>
        </LoginBox>
      </LoginWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    svgCaptcha: state.getIn(['login', 'svgCaptcha']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCaptcha () {
      dispatch(actionCreator.getCaptcha());
    },
    logIn (values, history) {
      console.log(values);
      dispatch(actionCreator.logIn(values, history));
    },
  }
}
let LoginForm = Form.create()(Login);
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
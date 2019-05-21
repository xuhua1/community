import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import { Form, Input, Select, Checkbox, Button, Row, Col, message } from 'antd';
import {
  LoginWrapper,
  RegisterBox,
  Logo,
  RegisterItem
} from './style';

const { Option } = Select;


class Register extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.register(values, this.props.history);
      }
    });
  }

  validateNumber = (rule, value, callback) => {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      callback();
    } else {
      callback('请输入正确的手机号格式!');
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { smsTime, getSmsCode } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    const validateSmsCode = async (rule, value, callback) => {
      try {
        const response = await fetch('https://zuoyecloud.com/api/checksmscode?smscode=' + value, {
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
    return (
      <LoginWrapper>
        <RegisterBox>
          <Logo />
          <RegisterItem>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item
                label="邮箱"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }]
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                label={(
                  <span>
                    昵称
                </span>
                )}
              >
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: '请输入昵称!', whitespace: true }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                label="手机"
              >
                {getFieldDecorator('phone', {
                  rules: [{
                    required: true, message: '请输入手机号!'
                  }, {
                    validator: this.validateNumber,
                  }],
                })(
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
              </Form.Item>
              <Form.Item
                label="密码"
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: '请输入密码!',
                  }],
                })(
                  <Input.Password prefix={<span />} />
                )}
              </Form.Item>
              <Form.Item
                label="验证码"
              >
                <Row>
                  <Col span={14}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: '验证码不能为空!' }, {
                        validator: this.validateSmsCode,
                      }],
                      validateTrigger: 'onSubmit',
                    })(
                      <Input type="text" placeholder="验证码" />
                    )}</Col>
                  <Col span={10} style={{ textAlign: "center" }} onClick={() => { }} onClick={() => getSmsCode(smsTime)} >
                    <Button type={smsTime === 0 ? 'default' : "dashed"} >
                      &nbsp;&nbsp;
                      <span style={{ fontSize: '16px', letterSpacing: '5px' }}>{smsTime === 0 ? "获取验证码" : smsTime}</span>
                      &nbsp;&nbsp;
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                })(
                  <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
              </Form.Item>
            </Form>
          </RegisterItem>
        </RegisterBox>
      </LoginWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    smsTime: state.getIn(['login', 'smsTime']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register (values, history) {
      if (!values.agreement) {
        message.warn('请先同意协议');
        return;
      }
      dispatch(actionCreator.register(values, history));
    },
    getSmsCode (smsTime) {
      if (smsTime !== 0) return null;
      const phone = '13609753484';
      dispatch(actionCreator.getSmsCode(phone));
    }
  }
}
let RegisterForm = Form.create()(Register);
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
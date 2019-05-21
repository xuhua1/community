import { Form, Button, Input } from 'antd';
import React from 'react';
const { TextArea } = Input;
export const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea placeholder="请输入评论" autosize={{ minRows: 2 }} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        提交
      </Button>
    </Form.Item>
  </div>
);

export const ReplyEditor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea placeholder="请输入评论" autosize={{ minRows: 1 }} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        提交
      </Button>
    </Form.Item>
  </div>
);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Header from '../../../common/header';
import { Input, Upload, Icon, Modal, Button, Cascader, message } from 'antd';
import {
  QuestionBox,
  QuestionEdit,
  OneWord,
  InDetail,
  ImageUpload,
  SubmitQuestion,
} from './style';
const { TextArea } = Input;

class Question extends Component {
  beforeUpload (file) {
    const isJPG = (/image/).test(file.type);
    if (!isJPG) {
      message.error('只能上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 4;
    if (!isLt2M) {
      message.error('图片最大4MB!');
    }
    return isJPG && isLt2M;
  }
  render () {
    const { question, handleChangeOneWord, handleChangeInDetail, handleSubmitQ } = this.props;
    const { handleChangeUploadImage, handleCancelImageView, handlePreviewImage, uploadImage } = this.props;
    const newQuestion = question.toJS();
    newQuestion.history = this.props.history;
    const { previewVisible, previewImage, fileList } = newQuestion.image;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <QuestionBox>
        <Header />
        <QuestionEdit>
          <OneWord>
            <TextArea style={{ fontSize: 20 }} placeholder="一句话描述你的问题" autosize={true} onChange={handleChangeOneWord} value={newQuestion.oneWord} />
          </OneWord>
          <InDetail>
            <TextArea style={{ fontSize: 16 }} placeholder="详细描述问题" autosize={{ minRows: 3 }} onChange={handleChangeInDetail} value={newQuestion.inDetail} />
          </InDetail>
          <ImageUpload className="clearfix">
            <Upload
              name="avatar"
              beforeUpload={this.beforeUpload}
              customRequest={({ file }) => uploadImage(file, fileList.length)} //在这里 改list
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreviewImage}
              onChange={({ file, fileList }) => { this.beforeUpload(file, true) && handleChangeUploadImage(fileList) }}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancelImageView}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </ImageUpload>
          <SubmitQuestion>
            <Button type="primary" shape="round" size={'large'} onClick={() => handleSubmitQ(newQuestion)}>提交问题</Button>
          </SubmitQuestion>
        </QuestionEdit>
      </QuestionBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.getIn(['question', 'question']),
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    //文本编辑
    handleChangeOneWord (event) {
      dispatch(actionCreator.handleChangeOneWord(event.target.value));
    },
    handleChangeInDetail (event) {
      dispatch(actionCreator.handleChangeInDetail(event.target.value));
    },
    //预览
    handleCancelImageView () {
      dispatch(actionCreator.handleCancelImageView());
    },
    handlePreviewImage (file) {
      dispatch(actionCreator.handlePreviewImage(file));
    },
    //上传文件
    handleChangeUploadImage (fileList) {
      console.log(arguments);
      dispatch(actionCreator.handleChangeUploadImage(fileList));
    },
    uploadImage (file, index) {
      dispatch(actionCreator.uploadImage(file, index));
    },
    //上传
    handleSubmitQ (data) {
      dispatch(actionCreator.handleSubmitQ(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
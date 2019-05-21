import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Header from '../../../common/header';
import { Input, Upload, Icon, Button } from 'antd';
import {
  UploadBox,
  UploadEdit,
  OneWord,
  InDetail,
  FileUpload,
  SubmitQuestion,
  Title
} from './style';
const { TextArea } = Input;
const { Dragger } = Upload;
class Question extends Component {
  render () {
    const { files, handleChangeOneWord, handleChangeInDetail } = this.props;
    const { handleChangeUploadFile, uploadFile, handleSubmit } = this.props;

    const newFiles = files.toJS();

    const props = {
      name: 'file',
      multiple: true,
      customRequest: ({ file }) => uploadFile(file, newFiles.fileList.length),
      onChange: handleChangeUploadFile,
      fileList: newFiles.fileList,
    };
    return (
      <UploadBox>
        <Header />
        <UploadEdit>
          <FileUpload className="clearfix">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或拖拽上传</p>
              <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
          </FileUpload>
          <OneWord>
            <TextArea style={{ fontSize: 20 }} placeholder="文件标题" autosize={true} onChange={handleChangeOneWord} value={newFiles.oneWord} />
          </OneWord>
          <InDetail>
            <TextArea style={{ fontSize: 16 }} placeholder="详细描述文件" autosize={{ minRows: 3 }} onChange={handleChangeInDetail} value={newFiles.inDetail} />
          </InDetail>
          <SubmitQuestion>
            <Button type="primary" shape="round" size={'large'} onClick={() => handleSubmit(newFiles,this.props.history)}>提交</Button>
          </SubmitQuestion>
        </UploadEdit>
      </UploadBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.getIn(['upload', 'files']),
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
    //改变ui
    handleChangeUploadFile (file) {
      const { fileList } = file;
      console.log(file);
      dispatch(actionCreator.handleChangeUploadFile(fileList));
    },
    //上传文件
    uploadFile (file, index) {
      console.log(file, index);
      dispatch(actionCreator.uploadFile(file, index));
    },
    //提交问题
    handleSubmit (files,history) {
      dispatch(actionCreator.handleSubmit(files,history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
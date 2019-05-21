import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import textInsert from './insert';
import { Col, Upload, Tooltip, Icon, Modal, Input } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import marked from './marked';
import 'highlight.js/styles/tomorrow.css'
import {
  AllBox,
  MarkdownBox,
  MarkdownText,
  ToolBar,
  TextBox,
  ViewBox,
  ModalWrap,
  TitleWrapper
} from './style';

class Markdown extends Component {
  constructor(props) {
    super(props);
    this.handleMarkdownRef = $vm => {
      this.$vm = $vm;
    }
  }
  insert = (e, url) => {
    const type = e.currentTarget ? e.currentTarget.getAttribute('data-type') : e;
    let value = '';
    const vmValue = this.$vm.value;
    if (vmValue.length !== 0) {
      const lastTwo = vmValue.slice(-2);
      if (type === 'table') {
        if (lastTwo[0] !== '\n') {
          value += '\n\n';
        } else if (lastTwo[0] !== '\n') {
          value += '\n';
        }
      } else if (type === 'list' || type === 'h1' || type === 'h2' || type === 'h3' || type === 'h4' || type === 'code' || type === 'block') {
        if (lastTwo[1] !== '\n') {
          value += '\n';
        }
      }
    };
    textInsert(this.$vm, type, url, value);
    this.props.changeValue(this.$vm.value);
  }
  onChange = e => {
    const data = e.target.value;
    this.props.changeValue(data);
    const { historydata, historyIndex } = this.props;
    const newHistory = historydata.toJS();
    window.clearTimeout(this.currentTimeout);
    this.currentTimeout = setTimeout(() => {
      // 撤销后修改，删除当前以后记录
      if (historyIndex < newHistory.length - 1) {
        newHistory.splice(historyIndex + 1)
      }
      // 超出记录最多保存数后，滚动储存
      if (newHistory.length >= 20) {
        newHistory.shift()
      }
      // 记录当前位置
      const newHistoryIndex = newHistory.length
      newHistory.push(data)
      this.props.changeHistory(newHistory, newHistoryIndex);
    }, 500);
  }
  undo = () => {
    const { historydata, historyIndex } = this.props;
    const newHistory = historydata.toJS();
    const newHistoryIndex = historyIndex - 1;
    if (newHistoryIndex < 0) return;
    this.props.changeHistory(newHistory, newHistoryIndex);
    const value = newHistory[newHistoryIndex];
    this.props.changeValue(value);
  }
  redo = () => {
    const { historydata, historyIndex } = this.props;
    const newHistory = historydata.toJS();
    const newHistoryIndex = historyIndex + 1;
    if (newHistoryIndex > newHistory.length) return;
    this.props.changeHistory(newHistory, newHistoryIndex);
    const value = newHistory[newHistoryIndex];
    this.props.changeValue(value);
  }
  render () {
    const { titleValue, handleTitleChange, uploadImage, markdownValue, changePreview, changeModel, preView, handleSave } = this.props;
    return (
      <AllBox>
        <MarkdownBox>
          <TextBox>
            <ToolBar>
              <Col span={1} onClick={this.undo}>
                <Tooltip placement="bottom" title="撤销">
                  <Icon type="step-backward" />
                </Tooltip>
              </Col>
              <Col span={1} onClick={this.redo}>
                <Tooltip placement="bottom" title="下一步">
                  <Icon type="step-forward" />
                </Tooltip>
              </Col>
              <Col span={1} data-type="h1" onClick={this.insert}>
                <Tooltip placement="bottom" title="一级标题">
                  H1
                </Tooltip>
              </Col>
              <Col span={1} data-type="h2" onClick={this.insert}>
                <Tooltip placement="bottom" title="二级标题">
                  H2
                </Tooltip>
              </Col>
              <Col span={1} data-type="h3" onClick={this.insert}>
                <Tooltip placement="bottom" title="三级标题">
                  H3
                </Tooltip>
              </Col>
              <Col span={1} data-type="h4" onClick={this.insert}>
                <Tooltip placement="bottom" title="四级标题">
                  H4
                </Tooltip>
              </Col>
              <Col span={1} data-type="table" onClick={this.insert}>
                <Tooltip placement="bottom" title="表格">
                  <Icon type="table" />
                </Tooltip>
              </Col>
              <Col span={1} data-type="code" onClick={this.insert}>
                <Tooltip placement="bottom" title="代码">
                  <Icon type="edit" />
                </Tooltip>
              </Col>
              <Col span={1} data-type="list" onClick={this.insert}>
                <Tooltip placement="bottom" title="列表">
                  <Icon type="ordered-list" />
                </Tooltip>
              </Col>
              <Col span={1} data-type="block" onClick={this.insert}>
                <Tooltip placement="bottom" title="引用">
                  <Icon type="file-search" />
                </Tooltip>
              </Col>
              <Col span={1} data-type="pic">
                <Upload
                  showUploadList = {false}
                  customRequest={({ file }) => { uploadImage(file, this.insert.bind(this)) }} //上传函数
                  beforeUpload={() => { }}  //上传之前
                >
                  <Tooltip placement="bottom" title="上传图片">
                    <Icon type="camera" />
                  </Tooltip>
                </Upload>
              </Col>
              <Col span={1} data-type="link" onClick={this.insert} >
                <Tooltip placement="bottom" title="插入链接">
                  <Icon type="link" />
                </Tooltip>
              </Col>
              <Col span={1} onClick={changeModel} >
                <Tooltip placement="bottom" title="查看markdown语法">
                  <Icon type="book" />
                </Tooltip>
              </Col>
              <Col span={1} onClick={() => handleSave(markdownValue, titleValue,this.props.history)} >
                <Tooltip placement="bottom" title="保存">
                  <Icon type="save" />
                </Tooltip>
              </Col>
              <Col offset={6} span={2} onClick={changePreview} >
                <Tooltip placement="bottom" title="回到首页">
                  <Link to="/home"><Icon type="rollback" /></Link>
                </Tooltip>
              </Col>
              <Col span={2} onClick={changePreview} >
                <Tooltip placement="bottom" title="预览">
                  <Icon type="eye" />
                </Tooltip>
              </Col>
            </ToolBar>
            <TitleWrapper>
              <Input onChange={(e) => handleTitleChange(e.target.value)} value={titleValue} placeholder="请输入标题" style={{ height: "40px", padding: "0 20px", fontSize: "15px" }} />
            </TitleWrapper>
            <MarkdownText
              ref={this.handleMarkdownRef}
              value={markdownValue}
              onChange={this.onChange}
            />
          </TextBox>
          <ViewBox className={preView ? '' : 'unshow'}>
            <div
              className="for-preview for-markdown-preview"
              dangerouslySetInnerHTML={{ __html: marked(markdownValue) }}
            />
          </ViewBox>
          <Modal
            title="Markdown语法简介"
            visible={this.props.modal}
            footer={null}
            onCancel={this.props.changeModel}

          >
            <ModalWrap>
              <p>>> 嵌套引用 </p>
              <p>*斜体*</p>
              <p>**粗体**</p>
              <p>`使用反引号标记`</p>
              <p>* [x] 已完成选项</p>
              <br />
              <p>1. 有序列表第一项</p>
              <p>2. 有序列表第二项</p>
              <br />
              <p>***或--- 三个或以上设置分割线</p>
              <p>##### 五级标题</p>
              <p>[标题](链接地址)</p>
              <p>![图片描述](图片链接地址)</p>
            </ModalWrap>
          </Modal>
        </MarkdownBox>
      </AllBox>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    historydata: state.getIn(['markdown', 'history']),
    historyIndex: state.getIn(['markdown', 'historyIndex']),
    markdownValue: state.getIn(['markdown', 'markdownValue']),
    preView: state.getIn(['markdown', 'preView']),
    modal: state.getIn(['markdown', 'model']),
    titleValue: state.getIn(['markdown', 'titleValue'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage (file, insert) {
      dispatch(actionCreator.uploadImage(file, insert));
    },
    changeValue (value) {
      dispatch(actionCreator.changeValue(value));
    },
    changeHistory (history, historyIndex) {
      dispatch(actionCreator.changeHistory(history, historyIndex));
    },
    changePreview () {
      dispatch(actionCreator.changePreview());
    },
    changeModel () {
      dispatch(actionCreator.changeModel());
    },
    handleSave (value, titleValue,history) {
      dispatch(actionCreator.handleSave(value, titleValue,history));
    },
    handleTitleChange (value) {
      dispatch(actionCreator.handleTitleChange(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markdown);
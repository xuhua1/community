import React, { Component } from 'react';
import OSS from 'ali-oss';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {Link,Redirect} from 'react-router-dom';
//import htmlToDraft from 'html-to-draftjs';
import {Input} from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store';

import {
  Back,
  Release,
  AllBox,
  TitleWrapper
} from './style';

const rawContentState = {"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"http://i.imgur.com/aMtBIep.png","height":"auto","width":"100%"}}},"blocks":[{"key":"9unl6","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"95kn","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"7rjes","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

class EditorConvertToHTML extends Component {
  
  imageUploadCallBack = (file) => new Promise(
    async (resolve, reject) => {
      try {
        let response = await fetch('https://zuoyecloud.com/api/sts', {
          method: 'GET',
          credentials: 'include',
        });
        let responseJson = await response.json();
        const { AccessKeyId, AccessKeySecret, SecurityToken } = responseJson;
        let ossConfig = {
          accessKeyId: AccessKeyId,
          accessKeySecret: AccessKeySecret,
          stsToken: SecurityToken,
          endpoint: 'oss-cn-hangzhou.aliyuncs.com',
          bucket: 'zuoyecloud-file',
        }
        let client = new OSS(ossConfig);
        //let tempCheckpoint;

        let result = await client.multipartUpload(file.name, file, {
          progress: async function (p, checkpoint) {
            // 记录断点, 如果关闭了浏览器，然后重新启动继续上传的话，是不行的，请参考上边对file对象的描述
            //tempCheckpoint = checkpoint;
          }
        })
        if (result.res.status === 200) {
          resolve({
            "data": {
              "link": result.res.requestUrls[0]
            }
          });
        }
      } catch (error) {
        reject(error);
      }
    }
  );
  render () {
    const { editorContent, releaseEditValue,onEditorChange,editorState } = this.props;
    const { handleTitleChange, titleValue } = this.props;
    return (
      <AllBox>
        <Link to="/home"><Back>首页</Back></Link>
        <Release onClick={() => releaseEditValue(editorContent,titleValue,this.props.history)}>发布</Release>
        <TitleWrapper>
        <Input onChange={(e)=>handleTitleChange(e.target.value)} value={titleValue} placeholder="请输入标题" style={{height:"40px", padding:"0 20px",fontSize:"18px"}} />
        </TitleWrapper>
        <Editor
          toolbarClassName="edit-draft-toolbar"
          wrapperClassName="edit-draft-wrapper"
          editorClassName="edit-draft-editor"
          toolbar={{
            history: { inDropdown: true },
            inline: { inDropdown: false },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            image: { uploadCallback: this.imageUploadCallBack },
            fontFamily: { options: ['宋体', '黑体', '楷体', '微软雅黑', 'Arial', 'Georgia',] }
          }}
          ContentState={editorContent}
          EditorState={editorState}
          onContentStateChange={onEditorChange}
          placeholder=""
          spellCheck
          onFocus={() => { }}
          onBlur={() => { }}
          onTab={() => { return true; }}
          localization={{ locale: 'zh', translations: { 'generic.add': 'Test-Add' } }}
        />

        {/*
        {draftToHtml(editorContent)}
         {JSON.stringify(editorContent)}
        */}
      </AllBox>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    editorState: state.getIn(['write','editorState']),
    editorContent: state.getIn(['write', 'editorContent']),
    titleValue: state.getIn(['write', 'titleValue'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    releaseEditValue (editorContent,titleValue,history) {
      dispatch(actionCreator.releaseEditValue(editorContent, titleValue,history));
    },
    onEditorChange (editorContent) {
      window.scrollTo(0, document.body.scrollHeight);
      /**draftToHtml(editorContent)) */
      console.log(JSON.parse(JSON.stringify(editorContent)));
      dispatch(actionCreator.changeEditValue(JSON.stringify(editorContent)));
    },
    handleTitleChange(value){
      dispatch(actionCreator.handleTitleChange(value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorConvertToHTML);
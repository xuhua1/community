import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import { actionCreator } from './store';
import Header from '../../../common/header';
import CommentCom from './comment';
import { Comment, Avatar, Tooltip, Icon, Row, Col } from 'antd';
import moment from 'moment';
import marked from '../../write/markdown/marked';
import 'highlight.js/styles/tomorrow.css';
import Lockr from 'lockr';
//import ReplyCom from './replyCom';
import {
  ArticleyWrapper,
  ContentWrapper,
  CommentWrapper
} from './style';
import { Editor } from './editor';
import draftToHtml from 'draftjs-to-html';
const getActions = (commentNum, likeNum) => {
  const actions = [
    <span>
      <Tooltip title="喜欢">
        <Icon
          type="like"
        />&nbsp;&nbsp;喜欢
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>
        {likeNum}
      </span>
    </span>,
    <span>
      <Tooltip title="评论">
        <Icon
          type="message"
        />&nbsp;&nbsp;评论
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>
        {commentNum}
      </span>
    </span>
  ];
  return actions;
}

class Paper extends PureComponent {

  componentDidMount () {
    const { match, initArticleValue, downComment } = this.props;
    NProgress.start();
    const artId = match.params.id;
    initArticleValue(artId, NProgress);
    downComment(artId);
  }

  render () {

    const artId = this.props.match.params.id;
    const { textAreaValue, handleTextAreaValue, handleSaveComment, submitting } = this.props;
    let { articleType, articleValue, commentNum, likeNum, createdAt, avatar, nickname } = this.props.article.toJS();
    const handleSubmit = () => {
      handleSaveComment(artId, textAreaValue)
    }
    const getNewCom = ()=><CommentCom articleId={artId} />
    return (
      <React.Fragment>
        <Header />
        <ArticleyWrapper >
          <Row>
            <Col span={22} offset={1} style={{ marginTop: '20px' }}>
              <Comment
                //actions={getActions(commentNum, likeNum)}
                author={<a>{nickname}</a>}
                avatar={(
                  <Avatar
                    src={avatar}
                    alt={nickname}
                  />
                )}
                datetime={(
                  <Tooltip title={createdAt}>
                    <span>{moment(createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>
                  </Tooltip>
                )}
              />
            </Col>
          </Row>
          {articleType==="richEditor"&&<ContentWrapper dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(articleValue))}} />}
          {articleType==="markdown"&&<div
              className="for-preview for-markdown-preview"
              dangerouslySetInnerHTML={{ __html: marked(articleValue) }}
            />}
          <CommentWrapper>
            <Comment
              avatar={(
                <Avatar
                  src={Lockr.get('avatar')}
                  alt={Lockr.get('nickname')}
                />
              )}
              content={(
                <Editor
                  onChange={handleTextAreaValue}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  value={textAreaValue}
                />)}
            />
           {getNewCom()}
          </CommentWrapper>
        </ArticleyWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.getIn(['article', 'article']),
    textAreaValue: state.getIn(['article', 'textAreaValue']),
    submitting: state.getIn(['article', 'commentSubmitting']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //实时该变评论
    handleTextAreaValue (event) {
      dispatch(actionCreator.changeTextAreaValue(event.target.value));
    },
    //评论保存
    handleSaveComment (artId, textAreaValue) {
      dispatch(actionCreator.handleSaveComment(artId, textAreaValue));
    },
    //初始化
    initArticleValue (artId, NProgress) {
      dispatch(actionCreator.initArticleValue(artId, NProgress));
    },
    downComment(artId){
      dispatch(actionCreator.getCommentList(artId, 0));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paper);

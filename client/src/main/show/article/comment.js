import React, { PureComponent } from 'react';
import { actionCreator } from './store';
import { connect } from 'react-redux';
import ReplyCom from './replyCom';
import {
  List, Avatar, Button, Skeleton, Comment, Tooltip, Icon,
} from 'antd';
import {
  LinkUser,
  SpanNum
} from './style';
import moment from 'moment';
import { ReplyEditor } from './editor';

class LoadMoreList extends PureComponent {

  constructor(props){
    super(props);
    const newAllArticle = this.props.allArticle.toJS();
    this.props.clearAddComment();
    newAllArticle.forEach(item=>{
      if(item._id === this.props.articleId ){
        this.commentNum = item.commentNum;
      }
    })
  }
  onLoadMore = () => {
    //设置loading true;设置articleComment增加三个空数组
    const { articleId,onLoadingComment, getCommentList,articleComment } = this.props;
    const skip = articleComment.toJS().length;
    onLoadingComment();
    getCommentList(articleId, skip);
  }

  getActions = (replyNum, commentID, fromUserID, fromUserName) => {
    const { loadReplyComment, loadReplyEdit } = this.props;
    const actions = [
      <span>
        <Tooltip title="查看回复">
          <Icon
            type="message"
            theme="twoTone"
            onClick={() => { loadReplyComment(commentID) }}
          />
          <SpanNum>
            {replyNum}
          </SpanNum>
        </Tooltip>
      </span>,
      <span>
        <Tooltip title="回复">
          <Icon
            type="edit"
            theme="twoTone"
            onClick={() => { loadReplyEdit(commentID, fromUserID, fromUserName) }}
          />
        </Tooltip>
      </span>,
    ];
    return actions;
  }
  getEditCommentChild = () => {
    const { replyEditor, handleReplyCommentTextAreaValue, handleReplyCommentSubmit,articleComment } = this.props;
    const newUserCommentTo = replyEditor.toJS();
    const newArticleComment = articleComment.toJS();
    const { toUserName, toUserID, toCommentID, replyCommentValue, replyCommentSubmitting } = newUserCommentTo;
    const editCommentChild = (<Comment
      content={(
        <ReplyEditor
          onChange={(event) => handleReplyCommentTextAreaValue(event.target.value)}
          onSubmit={() => handleReplyCommentSubmit(toCommentID, replyCommentValue, toUserID, toUserName,newArticleComment)}
          submitting={replyCommentSubmitting}
          value={replyCommentValue}
        />)}
    />);
    return editCommentChild;
  }
  getCommentChildren = (id, replyNum) => {
    const commentChildren = (<ReplyCom commentID={id} replyNum={replyNum}></ReplyCom>);
    return commentChildren;
  }
  render () {
    const { initLoading, loading, articleComment, replyEditor, isLoadReplyComment, addComment  } = this.props;
    const newArticleComment = articleComment.toJS();
    const newReplyEditor = replyEditor.toJS();
    const newIsLoadReplyComment = isLoadReplyComment.toJS();
    console.log( newIsLoadReplyComment, newArticleComment, this.commentNum , addComment,newArticleComment.length)
    this.commentNum = this.commentNum?this.commentNum:0;
    const loadMore = ((this.commentNum + addComment) !== newArticleComment.length)&&!initLoading && !loading ? (
      <div style={{
        textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
      }}
      >
        <Button onClick={this.onLoadMore}>加载更多</Button>
      </div>
    ) : null;

    return (
      <React.Fragment>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout='vertical'
          loadMore={loadMore}
          dataSource={newArticleComment}
          renderItem={(item) => {
            return (
              <List.Item>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <Comment
                    actions={this.getActions(item.comment.replyNum, item.comment.id, item.comment.fromUserID, item.comment.fromUserName)} //[<span>{item.comment.replyNum}条回复</span>]}
                    author={<LinkUser>{item.comment.fromUserName}</LinkUser>}
                    avatar={<Avatar src={item.comment.avatar} />}
                    content={<p>{item.comment.content}</p>}
                    datetime={
                      <Tooltip title={item.comment.createdAt}>
                        <span>{moment(item.comment.createdAt, "YYYY-MM-DD HH:mm:ss").fromNow()}</span> {/*	 moment("20111031", "YYYYMMDD").fromNow(); -> 3年前*/}
                      </Tooltip>
                    }
                  >
                    {(item.comment.replyNum > 0) && !newIsLoadReplyComment[item.comment.id] && this.getCommentChildren(item.comment.id, item.comment.replyNum)}
                    {newReplyEditor && newReplyEditor.loadEdit && (newReplyEditor.toCommentID === item.comment.id) && this.getEditCommentChild()}
                  </Comment>
                </Skeleton>
              </List.Item>
            )
          }}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    initLoading: state.getIn(['article', 'initLoading']),
    loading: state.getIn(['article', 'loading']),
    articleComment: state.getIn(['article', 'articleComment']),
    skip: state.getIn(['article', 'skip']),
    addComment: state.getIn(['article', 'addComment']),

    allArticle: state.getIn(['body','paperList']),
    //回复评论
    replyComment: state.getIn(['article', 'replyComment']),
    //评论对象
    replyEditor: state.getIn(['article', 'replyEditor']),
    //展开/折叠回复
    isLoadReplyComment: state.getIn(['article', 'isLoadReplyComment']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //实时改变回复编辑框数据
    handleReplyCommentTextAreaValue (value) {
      dispatch(actionCreator.changeReplyCommentTextAreaValue(value));
    },
    //回复提交
    handleReplyCommentSubmit (commentID, textAreaValue, toUserID, toUserName,newArticleComment) {
      dispatch(actionCreator.handleReplyCommentSubmit(commentID, textAreaValue, toUserID, toUserName,newArticleComment));
    },
    //加载评论中
    onLoadingComment () {
      dispatch(actionCreator.onLoadingComment());
    },
    //分页获取评论数据
    getCommentList (articleId, skip) {
      dispatch(actionCreator.getCommentList(articleId, skip));
    },
    //展开/折叠回复
    loadReplyComment (commentID) {
      dispatch(actionCreator.loadReplyComment(commentID));
    },
    //展开/折叠编辑
    loadReplyEdit (commentID, fromUserID, fromUserName) {
      dispatch(actionCreator.changeToUser(commentID, fromUserName, fromUserID));
    },

    //清理新增评论
    clearAddComment(){
      dispatch(actionCreator.clearAddComment());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreList);
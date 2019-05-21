import React, { PureComponent } from 'react';
import { Comment, Avatar } from 'antd';
import { actionCreator } from './store';
import { connect } from 'react-redux';
import { Tooltip, Icon, Skeleton, } from 'antd';
import moment from 'moment';
import {
  LinkUser
} from './style';
class ReplyCom extends PureComponent {

  componentDidMount () {
    const { commentID, replyComment, replyNum, addEmptyReplyComment, addReplyComment } = this.props;
    if (replyNum > 0 && !replyComment[commentID]) {
      addEmptyReplyComment(replyNum, commentID);
      addReplyComment(commentID);
    }
  }

  getActions (fromUserName, fromUserID) {
    const { changeToUser, commentID } = this.props;
    const actions = [
      <Tooltip title="回复">
        <Icon
          type="edit"
          theme="twoTone"
          onClick={() => changeToUser(commentID, fromUserName, fromUserID)}
        />
      </Tooltip>];
    return actions;
  }
  ///改用comment循环
  render () {
    const commentID = this.props.commentID//或取评论ID
    const { replyComment } = this.props;
    const newReplyComment = replyComment.toJS();
    const newReplyCommentList = newReplyComment[commentID];
    return (
      <React.Fragment>
        {
          newReplyCommentList && newReplyCommentList.comment.map((item, index) => {
            return (
              <Skeleton avatar title={false} loading={newReplyCommentList.loading} active key={item.content + index}>
                <Comment
                  actions={this.getActions(item.fromUserName, item.fromUserID)}
                  author={<span><LinkUser>{item.fromUserName}&nbsp;&nbsp;</LinkUser><span>回复</span><LinkUser>&nbsp;&nbsp;{item.toUserName}</LinkUser></span>}
                  avatar={(
                    <Avatar
                      src={item.fromUserAvatar}
                      alt={item.fromUserName}
                    />
                  )}
                  content={<p>{item.content}</p>}
                  datetime={
                    <Tooltip title={item.createdAt}>
                      <span>{moment(item.createdAt, "YYYY-MM-DD HH:mm:ss").fromNow()}</span>
                    </Tooltip>
                  }
                >
                </Comment>
              </Skeleton>
            );
          })
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    replyComment: state.getIn(['article', 'replyComment'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEmptyReplyComment (replyNum, commentID) {
      dispatch(actionCreator.addEmptyReplyComment(replyNum, commentID));
    },
    addReplyComment (commentID) {
      dispatch(actionCreator.addReplyComment(commentID))
    },
    changeToUser (commentID, fromUserName, fromUserID) {
      dispatch(actionCreator.changeToUser(commentID, fromUserName, fromUserID));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyCom);
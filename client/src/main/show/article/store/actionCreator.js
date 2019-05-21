import * as constants from './constants';
import moment from 'moment';
import { message } from 'antd';
import Lockr from 'lockr';



//textArea实时修改
export const changeTextAreaValue = (value) => ({
  type: constants.CHANGE_TEXTAREA_VALUE,
  value
});

//实时改变回复编辑框
export const changeReplyCommentTextAreaValue = (value) => ({
  type: constants.CHANGE_REPLY_TEXTAREA_VALUE,
  value
});
//增加空数组
export const addEmptyReplyComment = (replyNum, commentID) => ({
  type: constants.ADD_EMPTY_REPLY_COMMENT,
  replyNum,
  commentID
});

//加载评论中...
export const onLoadingComment = () => ({
  type: constants.ON_LOADING_COMMENT
});

/**
 * 初始化回复框
 */
export const changeToUser = (commentID, fromUserName, fromUserID) => ({
  type: constants.CHANGE_TOUSER,
  commentID,
  fromUserName,
  fromUserID
});

/**
 * 初始化文章展示
 */
const initArticle = (value, articleId) => ({
  type: constants.INIT_ARTICLE,
  value,
  articleId
});
export const initArticleValue = (articleId, NProgress) => {
  return async (dispatch) => {
    try {
      let response = await fetch('https://zuoyecloud.com/api/article/findbyid?articleId=' + articleId, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        console.log(responseJson);
        const { articleType,avatar, nickname, userId, articleValue, commentNum, likeNum, meta, _id } = responseJson.data;
        let date = new Date(meta.createdAt);
        const newDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        dispatch(initArticle({articleType, avatar, nickname, userId, articleValue, commentNum, likeNum, _id, createdAt: newDate }, articleId));
        NProgress.done();
      }
    } catch (error) {
      console.log(error);
    }
  }
}


/**
 * 上传评论并清空评论
 */
const clearComment = (firstComment, commentId, userId, nickname, avatar, time) => ({
  type: constants.CLEAR_COMMENT,
  firstComment,
  commentId,
  userId, nickname, avatar, time
});
const commentSubmitting = () => ({
  type: constants.COMMENT_SUBMITTING,
});
export const handleSaveComment = (articleId, commentValue) => {
  const userId = Lockr.get('userId');
  const nickname = Lockr.get('nickname');
  const avatar = Lockr.get('avatar');
  if (!userId) {
    message.warning("清先登录");
    return ()=>{};
  }
  return async (dispatch) => {
    dispatch(commentSubmitting());
    try {
      let response = await fetch('https://zuoyecloud.com/api/comment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId, articleId, commentValue }),
      });
      let responseJson = await response.json();
      if (responseJson.success) {
        dispatch(clearComment(commentValue, responseJson.commentId, userId, nickname, avatar, moment().format('YYYY-MM-DD HH:mm:ss')));
      }
    } catch (error) {
      message.error("添加信息失败");
      console.log(error);
    }
  }
}

/**
 * 获取评论,每次获取最多5个
 */

//删除之前加的CommentList空白项目,加入新的数据表
const changeCommentList = (commentList,skip) => ({
  type: constants.CHANGE_COMMENT_LIST,
  listArray: commentList,
  skip,
});
export const getCommentList = (articleId, skip) => {
  const number = 5;
  return async (dispatch) => {
    try {
      let response = await fetch('https://zuoyecloud.com/api/comment/findbyart?articleId=' + articleId + '&skip=' + skip + '&number=' + number, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      let responseJson = await response.json();
      if (responseJson.success) {
        console.log(responseJson);
        const commentList = responseJson.data.map((item) => {
          let date = new Date(item.meta.createdAt);
          const newDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
          return {
            loading: false,
            comment: {
              id: item._id,
              fromUserName: item.nickname,
              fromUserID: item.userId,
              content: item.commentValue,
              avatar: item.avatar,
              replyNum: item.replyNum,
              createdAt: newDate,
            }
          }
        })
        dispatch(changeCommentList(commentList,skip));
      }
    } catch (error) {
      console.log(error);
    }
  }
}


//空数组赋值
const addReplyCommentList = (commentID, commentList) => ({
  type: constants.ADD_REPLY_COMMENT_LIST,
  commentID,
  commentList
});

//将空数组赋值
export const addReplyComment = (commentId) => {
  return async (dispatch) => {
    try {
      let response = await fetch('https://zuoyecloud.com/api/replycomment/findcy?commentId=' + commentId, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      let responseJson = await response.json();
      console.log(responseJson);
      let newResult;
      if (responseJson.success) {
        console.log(responseJson);
        newResult = responseJson.data.map((item, index) => {
          let date = new Date(item.meta.createdAt);
          const newDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
          return ({
            fromUserAvatar: item.avatar,
            fromUserName: item.nickname,
            fromUserID: item.userId,
            toUserName: item.toUserName,
            toUserID: item.toUserId,
            content: item.commentValue,
            createdAt: newDate,
          });
        });
        console.log(newResult);
        (newResult) && dispatch(addReplyCommentList(commentId, newResult));

      }
    } catch (error) {
      console.log(error);
    }
  }
}




/**
 * @return 上传回复并清空
 */
const clearReplyComment = (firstReplyComment, commentID,neWArticleComment) => ({
  type: constants.CLEAR_REPLY_COMMENT,
  firstReplyComment,
  commentID,
  neWArticleComment
});

//提交的动画
const ReplyCommentSubmit = (commentID) => ({
  type: constants.REPLY_COMMENT_SUBMITTING,
  commentID
});

export const handleReplyCommentSubmit = (commentId, oldCommentValue, toUserId, toUserName,newArticleComment) => {
  const valueBefore = ('@' + toUserName + '   ').length;
  let commentValue = oldCommentValue.substring(valueBefore);
  const userId = Lockr.get('userId');
  console.log(commentValue.split(" "));
  if (!userId) {
    message.warning("清先登录");
    return null;
  }
  const neWArticleComment = JSON.parse(JSON.stringify(newArticleComment));
  neWArticleComment.forEach(item=>{
    if(item.comment.id === commentId){
      item.comment.replyNum = item.comment.replyNum + 1;
    }
  })
  return async (dispatch) => {
    dispatch(ReplyCommentSubmit(commentId));
    try {
      let response = await fetch('https://zuoyecloud.com/api/replycomment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId, commentId, commentValue, toUserId }),
      });
      console.log(response);
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        const lastReplyComment = {
          fromUserAvatar: Lockr.get('avatar'),
          fromUserID: Lockr.get('userId'),
          fromUserName: Lockr.get('nickname'),
          toUserID: toUserId,
          toUserName: toUserName,
          content: commentValue,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
        dispatch(clearReplyComment(lastReplyComment, commentId,neWArticleComment));
      }
    } catch (error) {
      message.error("添加信息失败");
      console.log(error);
    }
  }
}

/**
 * 展开折叠回复
 */
export const loadReplyComment = (commentID) => ({
  type: constants.LOAD_REPLY_COMMENT,
  commentID
});

export const clearAddComment = ()=> ({
  type: constants.CLEAR_ADD_COMMENT,
})
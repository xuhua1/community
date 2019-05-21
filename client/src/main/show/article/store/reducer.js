import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  articleId: '',
  article: {},
  textAreaValue: '',

  //comment
  initLoading: false,
  loading: false,
  articleComment: [],
  replyComment: { initLoading: false, loadReplyComment: false },

  //评论分页
  skip: 0,

  //新增评论
  addComment: 0,

  //提交评论
  commentSubmitting: false,

  //是否展开回复
  isLoadReplyComment: {},
  //评论编辑对象

  //用户点击出现编辑框评论的对象;
  replyEditor: { loadEdit: false, replyCommentValue: '12', replyCommentSubmitting: false, toCommentID: "d8026768ca", toUserName: '1', toUserID: '1' },
});
//https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png
//immutable对象的set方法结合之前immutable对象值生成全新对象返回
export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_TEXTAREA_VALUE:
      return state.set('textAreaValue', action.value);
    case constants.COMMENT_SUBMITTING:
      return state.set('commentSubmitting', true);
    case constants.CLEAR_ADD_COMMENT:
      return state.set('addComment',0);
    //添加评论
    case constants.CLEAR_COMMENT:
      const afterAddComment = state.get('articleComment').unshift(fromJS({
        loading: false, comment: {
          id: action.commentId,
          fromUserName: action.nickname,
          fromUserID: action.userId,
          content: action.firstComment,
          avatar: action.avatar,
          replyNum: 0,
          createdAt: action.time,
        }
      }));
      return state.merge({
        textAreaValue: "",
        commentSubmitting: false,
        articleComment: afterAddComment,
        addComment: state.get('addComment')+1,
      });

    //增加评论,清空编辑框,将上传动画暂停
    case constants.CLEAR_REPLY_COMMENT:
      const newReplyComment = state.getIn(['replyComment', action.commentID, 'comment']);
      let newRealReplyComment = newReplyComment ? [...newReplyComment, action.firstReplyComment] : [action.firstReplyComment];
      console.log(newRealReplyComment);
      const newReplyCommentState = state.get('replyComment').set(action.commentID, fromJS({ loading: false, comment: newRealReplyComment }));
      return state.set('replyComment', newReplyCommentState)
        .set('articleComment',fromJS(action.neWArticleComment))
        .setIn(['replyEditor', 'replyCommentValue'], '')
        .setIn(['replyEditor', 'replyCommentSubmitting'], false)
        .setIn(['replyEditor', 'loadEdit'], false);
    //空数组等待填充数据
    case constants.ON_LOADING_COMMENT:
      const preComment = state.get('articleComment');
      const emptyArray = [...new Array(5)].map(() => ({ loading: true, comment: { id: '', fromUserName: '', fromUserID: '', content: '', avatar: '', replyNum: '', createdAt: '' } }));
      const addComment = preComment.concat(emptyArray);
      return state.merge({
        loading: true,
        articleComment: addComment
      });
    //展开/折叠回复
    case constants.LOAD_REPLY_COMMENT:

      const isLoad = state.getIn(['isLoadReplyComment', action.commentID]);
      const newIsLoadReplyComment = state.get('isLoadReplyComment').set(action.commentID, !isLoad);
      return state.set('isLoadReplyComment', newIsLoadReplyComment);

    //改变评论数组
    case constants.CHANGE_COMMENT_LIST:
      const laPreComment = state.get('articleComment').slice(0, -5);
      const newComment = laPreComment.concat(fromJS(action.listArray));
      return state.merge({
        loading: false,
        articleComment: newComment,
        skip: !action.skip? action.listArray.length : state.get('skip') + action.listArray.length,
      })


    case constants.ADD_EMPTY_REPLY_COMMENT:
      //增加action.replyNum个空数组
      const emptyReplyArray = [...new Array(action.replyNum)].map(() => ({ fromUserAvatar: '', fromUserName: '', fromUserID: '', toUserName: '', toUserID: '', content: '', createdAt: '' }));
      const commentJS = { loading: true, comment: emptyReplyArray };
      const newReplyCommentList = state.get('replyComment').set(action.commentID, commentJS);
      return state.set('replyComment', newReplyCommentList);
    case constants.ADD_REPLY_COMMENT_LIST:
      //获取并展示将空数组赋值回复数据
      const newAddCommentJS = { loading: false, comment: action.commentList }
      const newAddReplyCommentList = state.get('replyComment').set(action.commentID, newAddCommentJS);
      return state.set('replyComment', newAddReplyCommentList);
    case constants.CHANGE_TOUSER:
      //初始化回复评论对象
      const newReplyEditor = state.get('replyEditor').merge({
        loadEdit: true,
        toCommentID: action.commentID,
        toUserID: action.fromUserID,
        toUserName: action.fromUserName,
        replyCommentValue: '@' + action.fromUserName + '   ',
      });
      return state.set('replyEditor', newReplyEditor);
    case constants.CHANGE_REPLY_TEXTAREA_VALUE:
      //实时改变回复内容
      const changeReplyCommentValue = state.get('replyEditor').set('replyCommentValue', action.value);
      return state.set('replyEditor', changeReplyCommentValue);
    case constants.REPLY_COMMENT_SUBMITTING:
      //开始上传动画
      const changeReplyCommentSubmitting = state.get('replyEditor').set('replyCommentSubmitting', true);
      return state.set('replyEditor', changeReplyCommentSubmitting);

    case constants.INIT_ARTICLE:
      return state.set('article', fromJS(action.value)).set('articleId', action.articleId);
    default:
      return state;
  }
}
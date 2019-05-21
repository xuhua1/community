import * as constants from './constants';
import { fromJS } from 'immutable';
const defaultState = fromJS({
  uploadValue: {
  },
  commentList: [],
  uploadTextValue: '',
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_TEXT_VALUE:
      return state.set('uploadTextValue', action.value);
    case constants.ADD_UPLOAD_COMMENT:
      const newCommentList = state.get('commentList').push(fromJS(action.lastComment));
      //console.log(action.lastComment.commentValue);
      return state.set('commentList', newCommentList).set('uploadTextValue','');
    case constants.INIT_UPLOAD:
      return state.set('uploadValue', fromJS(action.data));
    case constants.INIT_COMMENT_LIST:
      return state.set('commentList', fromJS(action.data));
    default:
      return state;
  }
}
import * as constants from './constants';
import { fromJS } from 'immutable';

import { EditorState } from 'draft-js';

const defaultState = fromJS({
  editorContent: undefined,
  editorState: EditorState.createEmpty()
});

export default (state = defaultState, action ) => {
  switch(action.type){
    case constants.CHANGE_EDIT_VALUE: 
      //immutable对象的set方法结合之前immutable对象值生成全新对象返回。
      return state.set('editorContent',action.data);
    case constants.CHANGE_EDIT_STATE: 
      //immutable对象的set方法结合之前immutable对象值生成全新对象返回。
      return state.set('editorState',action.data);
    case constants.INIT_ARTICLE_STATE: 
      //immutable对象的set方法结合之前immutable对象值生成全新对象返回。
      return state.set('editorState',EditorState.createEmpty()).set('editorContent',undefined);
    default:
      return state;
  }
}
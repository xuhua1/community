import * as constants from './constants';
import { fromJS } from 'immutable';

import { EditorState } from 'draft-js';

const defaultState = fromJS({
  titleValue: "",
  editorContent: undefined,
  editorState: EditorState.createEmpty(),
});

export default (state = defaultState, action ) => {
  switch(action.type){
    case constants.CHANGE_EDIT_VALUE: 
      return state.set('editorContent',action.data);
    case constants.CHANGE_EDIT_STATE: 
      return state.set('editorState',action.data);
    case constants.INIT_ARTICLE_STATE: 
      return state.set('editorState',EditorState.createEmpty()).set('editorContent',undefined);
    case constants.HANDLE_TITLE_CHANGE:
      return state.set('titleValue',action.data);
    default:
      return state;
  }
}
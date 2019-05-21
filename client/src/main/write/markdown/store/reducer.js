import * as constants from './constants';
import { fromJS } from 'immutable';


const defaultState = fromJS({
  history: [],
  historyIndex: 0,
  markdownValue: '',
  preView: false,
  model: false,
  titleValue:"",
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHNAGE_VALUE:
      return state.set('markdownValue', action.data);
    case constants.CHANGE_HISTORY:
      return state.set('history', fromJS(action.history)).set('historyIndex', action.historyIndex);
    case constants.CHANGE_PREVIEW:
      return state.set('preView', !state.get('preView'));
    case constants.CHANGE_MODEL:
      return state.set('model', !state.get('model'));
    case constants.HANDLE_TITLE_CHANGE:
      return state.set('titleValue', action.data);
    default:
      return state;
  }
}
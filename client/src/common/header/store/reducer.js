import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  focused: false,
  searchValue: '',
  searchingValue: '',
  mouseInHistory: false,
  SearchHistoryList: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {

    case constants.HANDLE_INPUT_FOCUS:
      return state.set('focused', true);
    case constants.HANDLE_INPUT_BLUR:
      return state.set('focused', false);
    case constants.HANDLE_MOUSE_IN_HISTORY:
      return state.set('mouseInHistory', true);
    case constants.HANDLE_MOUSE_OUT_HISTORY:
      return state.set('mouseInHistory', false);

    case constants.DELETE_SEARCH_HIS_ITEM:
      return state.set('SearchHistoryList', state.get('SearchHistoryList').delete(action.data));

    case constants.BEGIN_SEARCH:
      return state.set('searchingValue', action.data);

    case constants.CHANGE_HISTORY_LIST:
      return state.set('SearchHistoryList', fromJS(action.data));
    case constants.SEARCH_VALUE:
      return state.set('searchValue', action.data);
    case constants.ADD_HISTORY_ITEM:
      return state.set('SearchHistoryList', state.get('SearchHistoryList').unshift(fromJS({ searchValue: state.get('searchValue'), _id: action.searchHistoryId })));
    case constants.CHANGE_HIS_ITEM:
      const nSearchHistory = state.get('SearchHistoryList').get(action.data);
      const nSearchHistoryList = state.get('SearchHistoryList').delete(action.data).unshift(nSearchHistory);
      return state.set('SearchHistoryList', nSearchHistoryList).set('searchValue', nSearchHistory.get('searchValue'));
    default:
      return state;
  }
}
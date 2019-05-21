import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  value: "22",
  menuCurrent:'article',
  paperList: []
});

export default (state = defaultState, action ) => {
  switch(action.type){
    case constants.CHANGE_MENU_CURRENT: 
      return state.set('menuCurrent', action.key);
    case constants.CHANGE_PAPER_LIST:
      return state.set('paperList', fromJS(action.data));
    default:
      return state;
  }
}
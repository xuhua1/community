import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  ImesValue: "",
  toUser: "",
  toUserName: "",
  toUserAvatar: "",
  userList: [],
  ImesList: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CANGE_IMAGE_VALUE:
      return state.set('ImesValue', action.data);
    case constants.SET_TO_USER:
      return state.set('toUserName',action.toUserName);
    case constants.CHANGE_TO_USER:
      let userJs={};
      const newUserList = state.get('userList');
      const newList = newUserList.toJS().map(item => {
        if (item._id === action.data) {
          userJs = item;
          item.unread = 0;
          return item;
        }
        return item;
      });
      return state.set('toUser', action.data).set('toUserAvatar', userJs.avatar).set('toUserName', userJs.nickname).set('userList', fromJS(newList));
    case constants.INIT_USER:
      return state.set('userList', fromJS(action.data));
    case constants.IMES_DIA:
      return state.set('ImesList', fromJS(action.data));
    case constants.SUBMIT_IME:
      const newImesList = state.get('ImesList').push(fromJS(action.data));
      return state.set('ImesList', newImesList).set('ImesValue', '');
    case constants.ADD_IMES_DIA_ITEM:
      const addImes = {
        fromId: state.get('toUser'),
        avatar: state.get('toUserAvatar'),
        imes: action.data,
        createdAt: action.createdAt,
      }
      const newImes = state.get('ImesList').push(fromJS(addImes));
      return state.set('ImesList', newImes);
    case constants.ADD_UN_READ:
      const newuserList = state.get('userList').toJS();
      newuserList.forEach(item => {
        if (item._id === action.data) {
          item.unread++;
        }
      });
      return state.set('userList', fromJS(newuserList));
    case constants.CLEAR_UNSEND:
      const c_userList = state.get('userList');
      const c_newUserList = c_userList.toJS().map(item => {
        if (item._id === action.data) {
          item.unsend = 0;
          return item;
        }
        return item;
      });
      return state.set('userList', fromJS(c_newUserList));
    case constants.ADD_UNSEND:
      const a_userList = state.get('userList');
      const a_newUserList = a_userList.toJS().map(item => {
        if (item._id === action.data) {
          item.unsend++;
          return item;
        }
        return item;
      });
      return state.set('userList', fromJS(a_newUserList));
    case constants.ADD_NEW_USER:
      //const d_userList = state.get('userList');
      //const d_newUserList = d_userList.unshift(fromJS(action.data));
      return state;//.set('userList', fromJS(d_newUserList));
    //文本编辑
    default:
      return state;
  }
}
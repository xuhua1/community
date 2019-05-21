import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  svgCaptcha: '<div></div>',
  smsTime: 0,
  paperList:[],
  questionList:[],
  uploadList:[],
  userInfo: {
    nickname: '123',
    email: '1@1.cn',
    userSign: '111',
    avatar: '',
    userSign:'',
    _id: '',
  },
  imagePick: {
    changing: false,
    startX: 0,
    startY: 0,
    clickId: '',
    x: 120,
    y: 120,
    w: 200,
    h: 200,
  },
  setting: {
    setAvatar: false,
    picurl: '',
    setMesbtn: '',
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_SVG_CAPTCHA:
      return state.set('svgCaptcha', action.data);
    case constants.CHANGE_SMS_TIME:
      return state.set('smsTime', action.data);
    case constants.CHANGE_USER_INFO:
      return state.set('userInfo', fromJS(action.data));
    case constants.HANDLE_MOUSE_DOWN:
      const newImagePick = state.get('imagePick').merge({
        startX: action.startX,
        startY: action.startY,
        clickId: action.clickId,
        changing: true,
      });
      return state.set('imagePick', newImagePick);
    case constants.HANDLE_UP:
      return state.setIn(['imagePick', 'changing'], false);
    case constants.MOVE_PIC_PICK:
      const newPicPick = state.get('imagePick').merge(action.imagePickValue);
      return state.set('imagePick', newPicPick);
    case constants.CANCEL_ACATAR_PICK:
      return state.setIn(['setting', 'setAvatar'], false).setIn(['setting', 'picurl'], '');
    case constants.CROP_PIC:
      return state.setIn(['setting', 'setAvatar'], false).setIn(['userInfo', 'avatar'], action.data);

    case constants.CHANGE_USER_MES:
      return state.setIn(['setting', 'setMesbtn'], action.data);
    case constants.SET_AVATAR_URL:
      return state.setIn(['setting', 'setAvatar'], true).setIn(['setting', 'picurl'], action.data);
    case constants.UPDATE_USER_MES:
      const newUserInfo = state.get('userInfo').merge(action.data)
      return state.set('userInfo', newUserInfo);
    case constants.CLEAR_LOGIN:
      return state.set('userInfo', fromJS({}));
    case constants.CHANGE_LIST:
      if(action.menu === 'article'){
        return state.set('paperList',fromJS(action.list))
      }else if(action.menu === 'question'){
        return state.set('questionList',fromJS(action.list))
      }else {
        return state.set('uploadList',fromJS(action.list))
      } 
    default:
      return state;
  }
}
import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  questionShow: {},
  textAraVal: "",
  imageList: [{
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }],
  answers: [],
  submit: false,
  previewVisible: false,
  previewImage: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.HANDLE_PREVIEW:
      return state.set('previewVisible', true).set('previewImage', action.data);
    case constants.HANDLE_CANCEL:
      return state.set('previewVisible', false);
    case constants.INIT_QUESTION_SHOW_ACTION:
      return state.merge({
        questionShow: fromJS(action.initQuestionShowData),
        imageList: fromJS(action.urlList),
      });
    case constants.HANDLE_CHANGE:
      return state.set('textAraVal', action.data);
    case constants.INIT_ANSWER:
      return state.set('answers', fromJS(action.data));
    case constants.INIT_SUBMIT:
      return state.set('submit', true);
    case constants.ADD_SUBMIT:
      const newanswers = state.get('answers').unshift(fromJS(action.data));
      return state.set('answers', newanswers).set('submit',false).set('textAraVal','');
    default:
      return state;
  }
}
import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  question: {

    oneWord: '',
    inDetail: '',
    label: [],
    image: {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    },
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
    //文本编辑
    case constants.HANDLE_CHANGE_ONE_WORD:
      const newQuestionOneWord = state.get('question').set('oneWord', action.oneWord);
      return state.set('question', newQuestionOneWord);
    case constants.HANDLE_CHANGE_IN_DETAIL:
      const newQuestionInDetail = state.get('question').set('inDetail', action.inDetail);
      return state.set('question', newQuestionInDetail);
    //设置图片预览
    case constants.HANDLE_PREVIEW_IMAGE:
      return state.setIn(['question', 'image', 'previewImage'], action.file.url || action.file.thumbUrl).setIn(['question', 'image', 'previewVisible'], true);
    case constants.HANDLE_CANCEL_IMAGEVIEW:
      return state.setIn(['question', 'image', 'previewVisible'], false);
    //设置上传图片
    case constants.HANDLE_CHANGE_UPLOAD_IMAGE:
      return state.setIn(['question', 'image', 'fileList'], fromJS(action.fileList));
    case constants.UP_LOAD_IMAGE:
      const FileList = state.getIn(['question', 'image', 'fileList']);
      const newFileList = FileList.slice(0, -1);
      const fileLast = FileList.last().merge({ 'url': action.url, name: action.name, status: 'done' });
      const newImageFileList = newFileList.push(fileLast);
      return state.setIn(['question', 'image', 'fileList'], newImageFileList);
    case constants.CHANGE_PERCENT:
      const percentFileList = state.getIn(['question', 'image', 'fileList']);
      const beforeFileList = percentFileList.slice(0, action.index);
      const afterFileList = percentFileList.slice(action.index + 1);
      const newFile = percentFileList.slice(action.index, action.index + 1).get(0).merge({
        percent: action.p * 100,
        status: action.p < 1 ? 'uploading' : 'done',
      });
      const newAllFileList = beforeFileList.push(newFile).concat(afterFileList);
      return state.setIn(['question', 'image', 'fileList'], newAllFileList);
    case constants.HANDLE_CASCADER_CHANGE:
      return state.setIn(['question', 'label'], fromJS(action.value));
    default:
      return state;
  }
}
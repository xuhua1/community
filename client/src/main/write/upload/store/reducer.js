import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  files: {
    label: [],
    oneWord: '',
    inDetail: '',
    fileList: [],
    urlList: [],
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
    //文本编辑
    case constants.HANDLE_CHANGE_ONE_WORD:
      const newQuestionOneWord = state.get('files').set('oneWord', action.oneWord);
      return state.set('files', newQuestionOneWord);
    case constants.HANDLE_CHANGE_IN_DETAIL:
      const newQuestionInDetail = state.get('files').set('inDetail', action.inDetail);
      return state.set('files', newQuestionInDetail);
    //设置上传文件
    case constants.HANDLE_CHANGE_UPLOAD_FILE:
      console.log(action.fileList);
      return state.setIn(['files', 'fileList'], fromJS(action.fileList));
    //改变进度条
    case constants.FILE_PROGRESS:
      const FileList = state.getIn(['files', 'fileList']);
      const beforeFileList = FileList.slice(0, action.fileIndex);
      const afterFileList = FileList.slice(action.fileIndex + 1);
      const newFile = FileList.slice(action.fileIndex, action.fileIndex + 1).get(0).merge({
        percent: action.p * 100,
        status: action.p < 1 ? 'uploading' : 'done',
      });
      const newAllFileList = beforeFileList.push(newFile).concat(afterFileList);
      return state.setIn(['files', 'fileList'], newAllFileList);
    //增加urlList
    case constants.ADD_URL:
      const newUrlList = state.getIn(['files', 'urlList']).push(fromJS({ url: action.url, filename: action.filename }));
      return state.setIn(['files', 'urlList'], newUrlList);
    //改变标签
    case constants.ON_CHANGE_LABEL:
      return state.setIn(['files', 'label'], fromJS(action.value));
    default:
      return state;
  }
}
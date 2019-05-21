import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as bodyReducer } from '../main/show/body/store';
import { reducer as writeReducer } from '../main/write/article/store';
import { reducer as articleReducer } from '../main/show/article/store';
import { reducer as seminarReducer } from '../main/show/seminar/store';
import { reducer as markdownReducer } from '../main/write/markdown/store';
import { reducer as questionReducer } from '../main/write/question/store';
import { reducer as uploadReducer } from '../main/write/upload/store';
import { reducer as loginReducer } from '../main/login/store';
import { reducer as showUploadReducer } from '../main/show/upload/store';
import { reducer as showQuestionReducer } from '../main/show/question/store';
import { reducer as imesReducer } from '../main/write/imes/store';

const reducer = combineReducers({
  header: headerReducer,
  body: bodyReducer,
  write: writeReducer,
  markdown: markdownReducer,
  article: articleReducer,
  seminar: seminarReducer,
  question: questionReducer,
  upload: uploadReducer,
  login: loginReducer,
  showUpload: showUploadReducer,
  showQuestion: showQuestionReducer,
  imes: imesReducer,
});

export default reducer;
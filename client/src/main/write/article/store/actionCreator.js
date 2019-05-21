import * as constants from './constants';
import Lockr from 'lockr';
import { message } from 'antd';

const initArticleState = () => ({
  type: constants.INIT_ARTICLE_STATE
})
export const changeEditValue = (data) => ({
  type: constants.CHANGE_EDIT_VALUE,
  data
});

export const changeEditState = (data) => ({
  type: constants.CHANGE_EDIT_STATE,
  data
});

export const handleTitleChange = (data)=>({
  type: constants.HANDLE_TITLE_CHANGE,
  data
})

export const releaseEditValue = (editorContent,titleValue,history) => {
  const userId = Lockr.get('userId');
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/article/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId, articleValue: editorContent, articleTitle: titleValue })
      });
      const responseJson = await response.json();
      console.log(responseJson, userId);
      if (responseJson.success) {
        message.success('发布成功');
        history.push({pathname:`/article/${responseJson.articleId}`});
      }
    } catch (error) {
      message.error("发布失败");
      console.log(error);
    }
  }
}


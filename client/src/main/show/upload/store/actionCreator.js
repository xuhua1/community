import * as constants from './constants';
import Lockr from 'lockr';
import { message } from 'antd';
import moment from 'moment';
//const userId = Lockr.get('userId');
//const avatar = Lockr.get('avatar');
//const nickname = Lockr.get('nickname');

//实时改变评论框
export const handleChange = (value) => ({
  type: constants.CHANGE_TEXT_VALUE,
  value
});


/**
 * 初始化数据
 */
/*const initDateAction = () => ({
  type: constants.INIT_DATE_ACTION
});*/
const initUpload = (initUploadJs) => ({
  type: constants.INIT_UPLOAD,
  data: initUploadJs
});
const initCommentList = (newCommentList) => ({
  type: constants.INIT_COMMENT_LIST,
  data: newCommentList
});
export const initData = (uploadId) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/upload/findbyid?uploadId=' + uploadId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        const { userId, nickname, urlList, meta, avatar, oneWord, inDetail, label } = responseJson.data.upload;
        let date = new Date(meta.createdAt);
        const newDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        const initUploadJS = {
          userId, nickname, urlList, meta, avatar, oneWord, inDetail, label,
          createdAt: newDate,
        }
        dispatch(initUpload(initUploadJS));
        
        const newCommentList = responseJson.data.commentList.map((item) => {
          const { userId, meta, nickname, uploadValue, avatar } = item;
          let date = new Date(meta.createdAt);
          const newDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
          return {
            userId, createdAt: newDate, nickname, uploadValue, avatar
          }
        });
        dispatch(initCommentList(newCommentList));
      }
      console.log(responseJson);

    } catch (error) {
      message.error("添加信息失败");
      console.log(error);
    }
  }
};

/**
 * 提交数据
 */
const addUploadComment = (lastComment) => ({
  type: constants.ADD_UPLOAD_COMMENT,
  lastComment,

})
export const handleSubmit = (uploadValue, uploadId) => {
  const userId = Lockr.get('userId');
  const avatar = Lockr.get('avatar');
  const nickname = Lockr.get('nickname');
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/upload/addcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId, uploadId, uploadValue }),
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        const lastComment = {
          userId, avatar, nickname, commentValue: uploadValue, createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        }
        dispatch(addUploadComment(lastComment))
      } else {
        message.error('服务器出现问题');
      }
    } catch (error) {
      message.error("添加信息失败");
      console.log(error);
    }
  }
}
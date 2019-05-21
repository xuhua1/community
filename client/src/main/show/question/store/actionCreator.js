import * as constants from './constants';
import { message } from 'antd';
import moment from 'moment';
import Lockr from 'lockr';
//const userId = Lockr.get('userId');
//const avatar = Lockr.get('avatar');
//const nickname = Lockr.get('nickname');
export const handlePreview = (file) => ({
  type: constants.HANDLE_PREVIEW,
  data: file.url
});
export const handleCancel = () => ({
  type: constants.HANDLE_CANCEL
});
export const handleChange = (data) => ({
  type: constants.HANDLE_CHANGE,
  data,
})
/**
 * 初始化questionShow数据 
 */
const initQuestionShowAction = (initQuestionShowData, urlList) => ({
  type: constants.INIT_QUESTION_SHOW_ACTION,
  initQuestionShowData, urlList
})
export const initQuestionShow = (questionId) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/question/findbyid?questionId=' + questionId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        const { userId, avatar, nickname, meta, label, oneWord, inDetail, urlList, answers } = responseJson.data;
        let date = new Date(meta.createdAt);
        const newDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        const initQuestionShowData = {
          userId, avatar, nickname, oneWord, inDetail, label,
          createdAt: newDate,
        }
        const newUrlList = urlList.map((item, index) => {
          return {
            uid: '-' + index + Math.ceil(Math.random() * 10000000),
            name: '无',
            status: 'done',
            url: item,
          }
        })
        dispatch(initQuestionShowAction(initQuestionShowData, newUrlList));
      }
    } catch (error) {
      message.error("添加信息失败");
      console.log(error);
    }
  }
}

/**
 * init 评论
 */
const initAnswer = (data) => ({
  type: constants.INIT_ANSWER,
  data,
})
export const initQuestionAnswer = (questionId) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/question/findbyqid?questionId=' + questionId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        const newAwnList = responseJson.data.map((item) => {
          let date = new Date(item.meta.createdAt);
          const newDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
          const { answerValue, avatar, disLikeNum, likeNum, nickname, userId } = item;
          return {
            answerValue, avatar, disLikeNum, likeNum, nickname, userId,
            createdAt: newDate,
          }
        })
        dispatch(initAnswer(newAwnList))
      }
      console.log(responseJson);
    } catch (error) {
      message.error("添加信息失败");
      console.log(error);
    }
  }
}
//add 
const initSubmit = () => ({
  type: constants.INIT_SUBMIT,
});
const addSubmit = (data) => ({
  type: constants.ADD_SUBMIT,
  data
})
export const handleSubmit = (questionId, answerValue) => {
  const userId = Lockr.get('userId');
  const avatar = Lockr.get('avatar');
  const nickname = Lockr.get('nickname');
  return async (dispatch) => {
    dispatch(initSubmit());
    try {
      const response = await fetch('https://zuoyecloud.com/api/question/addawnser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId, questionId, answerValue }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        console.log(responseJson);
        message.success('发布成功');
        const newObj = {
          answerValue: answerValue, avatar, disLikeNum: 0, likeNum: 0, nickname, userId,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        dispatch(addSubmit(newObj));
      }
    } catch (error) {
      message.error("发布失败");
      console.log(error);
    }
  }
}


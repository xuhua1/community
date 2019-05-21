import * as constants from './constants';
import Lockr from 'lockr';
import { message } from 'antd';
import OSS from 'ali-oss';
import moment from 'moment';

export const changeImesValue = (data) => ({
  type: constants.CANGE_IMAGE_VALUE,
  data
});
/**
 * 发送信息
 */
const submitime = (data) => ({
  type: constants.SUBMIT_IME,
  data,
})
export const sumbitImes = (data, socket) => {
  console.log(data,"///");
  const userId = Lockr.get('userId');
  const userAvatar = Lockr.get('avatar');
  return (dispatch) => {
    socket.emit('sendmes', data);
    const createdAt = moment().format('YYYY-MM-DD HH:mm');
    const listItem = {
      fromId: userId,
      createdAt,
      imes: data,
      avatar: userAvatar,
    }
    dispatch(submitime(listItem));
  }
}

/**
 * 接收数据
 */
const addImesDiaItem = (data, createdAt) => ({
  type: constants.ADD_IMES_DIA_ITEM,
  data,
  createdAt,
});
const addUnRead = (fromId) => ({
  type: constants.ADD_UN_READ,
  data: fromId,
});
const clearUnSend = (fromId) => ({
  type: constants.CLEAR_UNSEND,
  data: fromId,
});
const addUnSend = (toId) => ({
  type: constants.ADD_UNSEND,
  data: toId,
});
const addNewUser = (data) => ({
  type: constants.ADD_NEW_USER,
  data,
})
export const onsendMes = (code, data) => {
  return (dispatch) => {
    console.log(code,data);
    switch (code) {
      case 500:
        console.log("error");
        break;
      case 200:
        const createdAt = moment().format('YYYY-MM-DD HH:mm');
        console.log(data.txt, createdAt);
        dispatch(addImesDiaItem(data.txt, createdAt));
        break;
      case 202:
      case 201: //在列表中
        const { fromId } = data;
        dispatch(addUnRead(fromId));
        break;
      /*case 202: //不再列表中
        const item = {
          _id: data.fromId,
          avatar: data.avatar,
          nickname: data.nickname,
          unsend: 0,
          unread: 1,
        }
        dispatch(addNewUser(item));
        break;*/
      case 300:
        dispatch(clearUnSend(data.fromId));
        break;
      case 400:
        dispatch(addUnSend(data.toId));
        break;
    }
  }
}
/**
 * 改变聊天框用户
 */
const changeToUser = (toUser) => ({
  type: constants.CHANGE_TO_USER,
  data: toUser,
});
export const changeToUserFun = (toUser, socket) => {
  const userId = Lockr.get('userId');
  return (dispatch) => {
    console.log(userId, toUser);
    socket.emit("secondconnect", userId, toUser);
    dispatch(changeToUser(toUser));
  }
}
const setToUser = (toUserName) =>({
  type: constants.SET_TO_USER,
  toUserName,
})
export const changeToUserName = (toUser, socket, toUserName)=>{
  const userId = Lockr.get('userId');
  return (dispatch) => {
    console.log(userId, toUser);
    socket.emit("secondconnect", userId, toUser);
    dispatch(setToUser(toUserName));
  }
}

/**
 * 初始化聊天
 */
const ImesDia = (data) => ({
  type: constants.IMES_DIA,
  data,
});
export const initImesDia = (res, toAvatar) => {
  const userId = Lockr.get('userId'); 
  const userAvatar = Lockr.get('avatar');
  return (dispatch) => {
    console.log(res, toAvatar);
    const newRes = res.map(item => {
      let avatar;
      if (item.fromId === userId) {
        avatar = userAvatar;
      } else {
        avatar = toAvatar;
      }
      const { ImesValue, fromId } = item;
      let date = new Date(item.meta.createdAt);
      const newDate = moment(date).format('YYYY-MM-DD HH:mm');
      return {
        fromId,
        avatar,
        imes: ImesValue,
        createdAt: newDate,
      }
    });
    dispatch(ImesDia(newRes));
  }
}

/**
 * 初始化用户
 */
const initUser = (list) => ({
  type: constants.INIT_USER,
  data: list,
})
export const initUserList = (unSend, unRead, allArr) => {
  return async (dispatch) => {
    console.log(unSend, unRead, allArr);
    //发送id得到所有用户信息
    try {
      const response = await fetch('https://zuoyecloud.com/api/user/findarr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userArr: allArr })
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        const userArr = responseJson.data;
        userArr.forEach(item => {
          item.unsend = 0;
          item.unread = 0;
          unSend.forEach(send => {
            if (item._id === send.toId) {
              item.unsend = send.number;
            }
          });
          unRead.forEach(read => {
            if (item._id === read.fromId) {
              item.unread = read.number;
            }
          });
        });
        console.log(userArr);
        dispatch(initUser(userArr));
      }
    } catch (error) {
      message.error("发布失败");
      console.log(error);
    }
  }
}
/*
const changeAllUserList = (data)=>({
  type: constants.CHANGE_ALL_USERLIST,
  data
})
export const getAllUser = ()=>{
  return async (dispatch)=>{
    try {
      const response = await fetch('http://zuoyecloud.com/api/user/findall', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        dispatch(changeAllUserList(responseJson.data));
      }
    } catch (error) {
      message.error("增加历史失败");
      console.log(error);
    }
  }
}*/
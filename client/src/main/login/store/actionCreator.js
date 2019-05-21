import * as constants from './constants';
import { message } from 'antd';
//import { dispatch } from 'rxjs/internal/observable/range';
import 'whatwg-fetch';
import Lockr from 'lockr';
import OSS from 'ali-oss';
//const userId = Lockr.get('userId');

/**
 * 注册
 */
export const register = (values, routeHistory) => {
  const { email, nickname, password, phone } = values;
  return (dispatch) => {
    fetch('https://zuoyecloud.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, nickname, password, phone }),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (!data.success) {
        message.error(data.message);
      } else {
        message.success("注册成功, 正在前往首页");
        const {userId, avatar, nickname}=data.data;
        Lockr.set('userId', userId);
        Lockr.set('nickname', nickname);
        Lockr.set('avatar', avatar);
        routeHistory.push('/home');
      }
    }).catch((err) => {
      message.error("登陆失败, 请稍后重试");
    })
  }
}

/**
 * 校验验证码
 */
/**
 * 登陆
 */
export const logIn = (values, routeHistory) => {
  const { phone, password, captcha, remember } = values;
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ phone, password, captcha }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        console.log(responseJson.data);
        const { nickname, avatar, _id } = responseJson.data[0];
        Lockr.set('userId', _id);
        Lockr.set('nickname', nickname);
        Lockr.set('avatar', avatar);
        routeHistory.push('/home');
      }
    } catch (error) {
      message.error("登陆失败, 请稍后重试");
      console.log(error);
    }
  }
}
/**
 * 验证码
 */
const changeSvgCaptcha = (data) => ({
  type: constants.CHANGE_SVG_CAPTCHA,
  data
})
export const getCaptcha = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/getcaptcha', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        dispatch(changeSvgCaptcha(responseJson.data));
      }
    } catch (error) {
      message.error('获取验证码失败');
      console.log(error);
    }
  }
}

/**
 * 短信
 */
const changeSmsTime = (time) => ({
  type: constants.CHANGE_SMS_TIME,
  data: time,
})
export const getSmsCode = (phone) => {
  console.log(phone);
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/getsmscode?phone=' + phone, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        let a = 60;
        const timeInterval = setInterval(() => {
          dispatch(changeSmsTime(a));
          if (a === 0) clearInterval(timeInterval);
          a = a - 1;
        }, 1000);
      }
    } catch (error) {
      message.error('发送短信失败, 请重试!');
      console.log(error);
    }
  }
}

/**
 *初始化用户信息
 */
const changeUserInfo = (data) => ({
  type: constants.CHANGE_USER_INFO,
  data
})
export const initUserInfo = (userId) => {
  return (dispatch) => {
    fetch('https://zuoyecloud.com/api/user/findOne?userId=' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (!data.success) {
        console.log(data.message)
      } else {
        console.log(data);
        dispatch(changeUserInfo(data.data))
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}

/**
 * 头像选择鼠标拖拽
 */
export const handleMouseDown = (mouseX, mouseY, id) => ({
  type: constants.HANDLE_MOUSE_DOWN,
  startX: mouseX,
  startY: mouseY,
  clickId: id,
});
export const handleUp = () => ({
  type: constants.HANDLE_UP,
});

/**
 * 移动鼠标
 * @param {*} mouseX 
 * @param {*} mouseY 
 * @param {*} jsImagePick 
 */
const movePicPick = (imagePickValue) => ({
  type: constants.MOVE_PIC_PICK,
  imagePickValue,
})
export const ImagePickMove = (mouseX, mouseY, jsImagePick) => {
  return (dispatch) => {
    const addx = mouseX - jsImagePick.startX;
    const addy = mouseY - jsImagePick.startY;
    console.log(jsImagePick.clickId, addx, addy);
    const initPick = (clickId) => {
      switch (clickId) {
        case 'ImagePick':
          return {
            x: addx + jsImagePick.x,
            y: addy + jsImagePick.y,
          }
        case 'BottomCenterButton':
          return {
            h: addy + jsImagePick.h,
          }
        case 'BottomRightButton':
          return {
            h: addy + jsImagePick.h,
            w: addx + jsImagePick.w,
          }
        case 'RightButton':
          return {
            w: addx + jsImagePick.w,
          }
        default:
          return {
            x: addx + jsImagePick.x,
            y: addy + jsImagePick.y,
          }
      }
    }
    const PickValue = initPick(jsImagePick.clickId);
    const imagePickValue = { ...PickValue, startX: mouseX, startY: mouseY }
    dispatch(movePicPick(imagePickValue));
  }
}

export const cancelAcatarPick = () => ({
  type: constants.CANCEL_ACATAR_PICK,
});
/**
 * 剪辑完成图片
 */
const cropPic = (url) => ({
  type: constants.CROP_PIC,
  data: url,
});

export const confirmAcatarPick = (jsImagePick, picurl) => {
  return async (dispatch) => {
    const { x, y, w, h } = jsImagePick;
    const userId = Lockr.get('userId');
    const url = `${picurl}/crop,x_${x},y_${y},w_${w},h_${h}/circle,r_2000/format,png`;
    dispatch(cropPic(url));
    Lockr.set('avatar', url);
    try {
      let response = await fetch('https://zuoyecloud.com/api/user/update', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },//5c914ac242064112f9489d26
        body: JSON.stringify({ userId, avatar: url }),
      });
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        message.success('提交成功');
      }
    } catch (error) {
      message.error(error + '')
    }
  }
}

/**
 * setting 设置
*/

export const setUserMesBtn = (data) => ({
  type: constants.CHANGE_USER_MES,
  data,
});
const updateUserMes = (data) => ({
  type: constants.UPDATE_USER_MES,
  data,
})
export const handleSubmitSet = (value, setMesbtn) => {
  return async (dispatch) => {
    let newObj;
    const userId = Lockr.get('userId');
    if(setMesbtn==='setEmail'){
      if(/\w+@\w+\..+/.test(value)){
        newObj={
          userId,
          email: value,
        }
      }else{
        message.error("邮箱格式错误");
        return;
      }
    }else if(setMesbtn==='setUserSign'){
      if((value)!==""){
        newObj={
          userId,
          userSign: value,
        }
      }else{
        message.error('签名格式错误');
        return;
      }
    }
    try {
      let response = await fetch('https://zuoyecloud.com/api/user/update', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObj),
      });
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        message.success('提交成功');
        dispatch(updateUserMes(newObj));
      }
    } catch (error) {
      message.error(error + '')
    }
  }
}

/**
 * 上传头像
 */
const setAvatarUrl = (url) => ({
  type: constants.SET_AVATAR_URL,
  data: url,
})
export const handleSubAva = (file) => {
  return async (dispatch) => {
    try {
      let response = await fetch('https://zuoyecloud.com/api/sts', {
        method: 'GET',
        credentials: 'include',
      });
      let responseJson = await response.json();
      const { AccessKeyId, AccessKeySecret, SecurityToken } = responseJson;
      let ossConfig = {
        accessKeyId: AccessKeyId,
        accessKeySecret: AccessKeySecret,
        stsToken: SecurityToken,
        endpoint: 'oss-cn-hangzhou.aliyuncs.com',
        bucket: 'zuoyecloud-file',
      }
      let client = new OSS(ossConfig);

      let result = await client.multipartUpload(file.name, file, {
        progress: async function (p, checkpoint) {
          // 记录断点, 如果关闭了浏览器，然后重新启动继续上传的话，是不行的，请参考上边对file对象的描述
          //let tempCheckpoint = checkpoint;
          //console.log(p) 断点
        }
      })
      console.log(result);
      if (result.res.status === 200) {
        const urlAdd = '?x-oss-process=image/resize,w_440,limit_0';
        const resUrl = result.res.requestUrls[0];
        const newUrl = resUrl + urlAdd;
        dispatch(setAvatarUrl(newUrl));
      }
    } catch (err) {
      message.error('上传失败');
    }
  }
}

/**
 * 登出  /src/common/header/index.js使用
 */
/**
 * 退出登陆
 */
const clearLogin = ()=>({
  type: constants.CLEAR_LOGIN,
});
export const loginOut = ()=>{
  return async (dispatch) => {
    dispatch(clearLogin());
    Lockr.flush();
    try {
      const response = await fetch('https://zuoyecloud.com/logout', {
        method: 'GET',
        credentials: 'include',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 * 该变列表
 */
const changeList = (list,menu)=>({
  type: constants.CHANGE_LIST,
  list,
  menu,
})
export const handleChangPaperList = (menu)=>{
  const userId = Lockr.get('userId');
  return async (dispatch) => {
    try {
      let response = await fetch(`https://zuoyecloud.com/api/${menu}/findall?userId=${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        console.log(responseJson);
        dispatch(changeList(responseJson.data, menu));
      }
    } catch (error) {
      message.error("添加信息失败");
      console.log(error);
    }
  }
}
import * as constants from './constants';
import Lockr from 'lockr';
import { message } from 'antd';
import OSS from 'ali-oss';
//const userId = Lockr.get('userId');

export const changeValue = (data) => ({
  type: constants.CHNAGE_VALUE,
  data,
})
export const changeHistory = (history, historyIndex) => ({
  type: constants.CHANGE_HISTORY,
  history,
  historyIndex,
})
export const changePreview = () => ({
  type: constants.CHANGE_PREVIEW,
})
export const changeModel = () => ({
  type: constants.CHANGE_MODEL,
});
export const handleTitleChange = (data)=>({
  type: constants.HANDLE_TITLE_CHANGE,
  data
})

/**
 * 
 */

export const handleSave = (value,titleValue,history) => {
  console.log(titleValue);
  const userId = Lockr.get('userId');
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/article/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId, articleValue: value, articleType: 'markdown',articleTitle:titleValue })
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        message.success('发布成功');
        history.push({pathname:`/article/${responseJson.articleId}`})
      }
    } catch (error) {
      message.error("发布失败");
      console.log(error);
    }
  }
}

export const uploadImage = (file, insert) => {
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
      let tempCheckpoint;

      let result = await client.multipartUpload(file.name, file, {
        progress: async function (p, checkpoint) {
          // 记录断点, 如果关闭了浏览器，然后重新启动继续上传的话，是不行的，请参考上边对file对象的描述
          //tempCheckpoint = checkpoint;
        }
      })
      console.log(result);
      if (result.res.status === 200) {
        insert('image', result.res.requestUrls[0]);
      }
    } catch (err) {
      message.error('上传失败');
      console.log(err);
    }

  }
}
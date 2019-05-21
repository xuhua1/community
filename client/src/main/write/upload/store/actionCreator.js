import * as constants from './constants';
import Lockr from 'lockr';
import { message } from 'antd';
import OSS from 'ali-oss';

export const handleChangeOneWord = (oneWord) => ({
  type: constants.HANDLE_CHANGE_ONE_WORD,
  oneWord
});
export const handleChangeInDetail = (inDetail) => ({
  type: constants.HANDLE_CHANGE_IN_DETAIL,
  inDetail
});
export const handleChangeUploadFile = (fileList) => ({
  type: constants.HANDLE_CHANGE_UPLOAD_FILE,
  fileList
});
export const changeUploadFile = (url) => ({
  type: constants.UP_LOAD_FILE,
  url,
});
export const onChangeLabel = (value) => ({
  type: constants.ON_CHANGE_LABEL,
  value
});
/**
 * 提交问题
 */
export const handleSubmit = (files,history) => {
  const { label, oneWord, inDetail, urlList } = files;
  console.log(files);
  const userId = Lockr.get('userId');

  return async (dispatch) => {
    try {
      let response = await fetch('https://zuoyecloud.com/api/upload/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, label, oneWord, inDetail, urlList }),
      });
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        message.success('提交成功');
        console.log(responseJson);
        history.push({pathname:`/upload/${responseJson.searchHistoryId}`});
      }
    } catch (error) {
      message.error(error + '')
    }
  }
}

/**
 * 上传并更新progress 
 */
const fileProgress = (p, fileIndex) => ({
  type: constants.FILE_PROGRESS,
  p,
  fileIndex
});
const addUrl = (url, filename) => ({
  type: constants.ADD_URL,
  url,
  filename
});
export const uploadFile = (file, fileIndex) => {
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
          tempCheckpoint = checkpoint;
          dispatch(fileProgress(p, fileIndex));
        }
      })
      console.log(result);
      if (result.res.status === 200) {
        dispatch(addUrl(result.res.requestUrls[0], result.name));
      }
    } catch (err) {
      message.error('上传失败');
    }
  }
}
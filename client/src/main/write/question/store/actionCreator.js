import * as constants from './constants';
import 'whatwg-fetch';
import Lockr from 'lockr';
import OSS from 'ali-oss';
import { message } from 'antd';


export const handleChangeOneWord = (oneWord) => ({
  type: constants.HANDLE_CHANGE_ONE_WORD,
  oneWord
});
export const handleChangeInDetail = (inDetail) => ({
  type: constants.HANDLE_CHANGE_IN_DETAIL,
  inDetail
});
export const handleChangeUploadImage = (fileList) => ({
  type: constants.HANDLE_CHANGE_UPLOAD_IMAGE,
  fileList
});
export const handleCancelImageView = () => ({
  type: constants.HANDLE_CANCEL_IMAGEVIEW
});
export const handlePreviewImage = (file) => ({
  type: constants.HANDLE_PREVIEW_IMAGE,
  file
});
export const handleCascaderChange = (value) => ({
  type: constants.HANDLE_CASCADER_CHANGE,
  value
})
/**
 * 上传文件并改变url
 */
const changeUploadImage = (url, name) => ({
  type: constants.UP_LOAD_IMAGE,
  url,
  name,
});
const changePercent = (p, index) => ({
  type: constants.CHANGE_PERCENT,
  p,
  index,
})
export const uploadImage = (file, index) => {
  console.log(file, index);
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
          dispatch(changePercent(p, index));
        }
      })
      console.log(result);
      if (result.res.status === 200) {
        dispatch(changeUploadImage(result.res.requestUrls[0], result.name));
      }
    } catch (err) {
      message.error('上传失败');
      console.log(err);
    }

  }
}

/**
 * 上传问题
 */

export const handleSubmitQ = ({ oneWord, inDetail, label, image,history }) => {
  const urlList = image.fileList.map((item) => (item.url));
  console.log(oneWord, inDetail, label, urlList);
  const userId = Lockr.get('userId');
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/question/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId, label, oneWord, inDetail, urlList }),
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        message.success('发布成功');
        history.push({pathname:`/question/${responseJson.data}`})
      }
    } catch (error) {
      message.error("发布失败");
      console.log(error);
    }
  }
}
import * as constants from './constants';
import Lockr from 'lockr';
import { message } from 'antd';


/**改变搜索框 */
export const changeSearchValue = (data) => ({
  type: constants.SEARCH_VALUE,
  data
});

/**
 * 判断搜索框
 */
export const handleInputFocus = () => ({
  type: constants.HANDLE_INPUT_FOCUS,
});

export const handleInputBlur = () => ({
  type: constants.HANDLE_INPUT_BLUR,//HANDLE_INPUT_BLUR
});

export const handleMouseInHistory = () => ({
  type: constants.HANDLE_MOUSE_IN_HISTORY,
});

export const handleMouseOutHistory = () => ({
  type: constants.HANDLE_MOUSE_OUT_HISTORY,
});


/**
 * 获取所有历史搜索
 */
const changeHistoryList = (data) => ({
  type: constants.CHANGE_HISTORY_LIST,
  data,
});

export const getHistoryList = () => {
  const userId = Lockr.get('userId');
  return async (dispatch) => {
    if (!userId) {
      dispatch(changeHistoryList([]));
      return null;
    }
    try {
      const response = await fetch('https://zuoyecloud.com/api/search/findAll?userId=' + userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        dispatch(changeHistoryList(responseJson.data));
      }
    } catch (error) {
      console.log(error);
    }
  }
}


/**
 * 删除一个项目
 */
const deleteSearchHisItem = (data) => ({
  type: constants.DELETE_SEARCH_HIS_ITEM,
  data,
});
export const handleDeleteSearchHisItem = (item, index) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://zuoyecloud.com/api/search/remove?hisId=' + item._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        dispatch(deleteSearchHisItem(index));
      }
    } catch (error) {
      message.error("删除失败");
      console.log(error);
    }
  }
}

/**
 * 搜索历史按下
 */
const changehisItem = (data) => ({
  type: constants.CHANGE_HIS_ITEM,
  data,
});
const beginSearch = (data) => ({
  type: constants.BEGIN_SEARCH,
  data,
})
export const handleInfoItemClick = (item, index) => {
  return async (dispatch) => {
    //展示界面接收参数
    try {
      const response = await fetch('https://zuoyecloud.com/api/search/chitem?hisId=' + item._id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
      });
      const responseJson = await response.json();
      if (responseJson.success) {
        dispatch(changehisItem(index));
      }
    } catch (error) {
      message.error("增加历史失败");
      console.log(error);
    }
  }
}

/**
 * 搜索框按下
 */
const addHistoryItem = (searchHistoryId) => ({
  type: constants.ADD_HISTORY_ITEM,
  searchHistoryId
});

export const handleInputKeyPress = (searchValue,newSearchHistory) => {
  return async (dispatch) => {
    dispatch(beginSearch(searchValue));
    let i = true;
    const userId = Lockr.get('userId');
    newSearchHistory.forEach((item,index)=>{
      if(item.searchValue === searchValue ){
        i = false;
      }
    })
    if(i&&userId){
      try {
        const response = await fetch('https://zuoyecloud.com/api/search/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId, searchValue }),
        });
        const responseJson = await response.json();
        if (responseJson.success) {
          dispatch(addHistoryItem(responseJson.data));
        }
      } catch (error) {
        message.error('增加信息失败');
        console.log(error);
      }
    }
  }
}
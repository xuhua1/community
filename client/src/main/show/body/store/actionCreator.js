import * as constants from './constants';
import { message } from 'antd';
export const changeMenuCurrent = (key) => ({
  type: constants.CHANGE_MENU_CURRENT,
  key
});
const changePaperList = (data)=>({
  type: constants.CHANGE_PAPER_LIST,
  data
})
export const handleChangPaperList = (search, menu)=>{
  console.log(search,menu);
  return async (dispatch) => {
    try {
      let response = await fetch(`https://zuoyecloud.com/api/${menu}/findall?search=${search}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.success) {
        if(responseJson.data.length===0){
          message.warn("查询到0条记录");
        }
        {
          dispatch(changePaperList(responseJson.data));
        }
      }
    } catch (error) {
      message.error("添加信息失败");
      console.log(error);
    }
  }
}
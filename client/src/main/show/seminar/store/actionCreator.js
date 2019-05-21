import * as constants from './constants';
import GlobalVar from '../../../../common/config'

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

export const releaseEditValue = (data) => {
  alert(1);
  return (dispatch) => {
    console.log(data);

    /* eslint-disable */
    const ArticleData = Bmob.Object.extend("Article");
    let ArticleItem = new ArticleData;
    /* eslint-enable */
    ArticleItem.save({
      userId: GlobalVar.userId,
      articleHtml: data
    }, {
        success: function (addSearchHistorItem) {
          // 添加成功
          console.log("添加成功");
        },
        error: function (gameScore, error) {
          // 添加失败
          console.log("添加失败");
        }
      });
    dispatch(initArticleState());
  }
}


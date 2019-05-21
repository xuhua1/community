import React, { Component } from 'react';
import { Globalstyle } from './style.js';
import Header from './common/header';
class App extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    Bmob.initialize("6a770cf94a87d3a2e2ca93d88fb4f6bf", "910de93350c7282502fa400cf5f3642a");
    this.state = {
      value: ''
    }
  }
  render () {
    return (
      <React.Fragment>
        <Globalstyle />
        <div onClick={this.handleChange}>
          点击
        </div>
      </React.Fragment>
    );
  }

  handleChange (e) {
    // eslint-disable-next-line
    var GameScore = Bmob.Object.extend("GameScore");
    var gameScore = new GameScore();
    gameScore.set("score", 1337);
    gameScore.save(null, {
      success: function (object) {
        alert("create object success, object id:" + object.id);
      },
      error: function (model, error) {
        alert("create object fail");
      }
    });
  }
}

export default App;


searchHistory.save({
  userId: "1",
  inFo: "第三次搜索"
}, {
    success: function (searchHistory) {
      // 添加成功
      console.log("添加成功");
    },
    error: function (searchHistory, error) {
      // 添加失败
      console.log("添加失败");
    }
  });

"2eb29a45221": {
  loading: false,
    loadEdit: false,
      comment: [{
        fromUserAvatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        fromUserName: 'ZHANG_SAN',
        fromUserID: '1',
        toUserName: 'LI_SI',
        toUserID: '2',
        content: 'ZHANG_SAN对LI_SI说',
        createdAt: '2013-3-5 12:03:22'
      }, {
        fromUserAvatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        fromUserName: 'LI_SI',
        fromUserID: '2',
        toUserName: 'ZHANG_SAN',
        toUserID: '1',
        content: 'LI_SI对ZHANG_SAN说',
        createdAt: '2013-3-5 12:03:22'
      }]
}

// [{ loading: false, comment: { id: '123', title: '2', content: '45', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', replyNum: '3', createdAt: '2019-03-07 17:15:45' } }, { loading: false, comment: { id: '444', title: "2", content: "345", avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', replyNum: '3', createdAt: '2019-03-07 17:15:45' } }],
getList = (dataSource) => {
  const actions = [
    <Tooltip title="回复">
      <Icon
        type="edit"
        theme="twoTone"
        onClick={() => { alert(1) }}
      />
    </Tooltip>];
  return (
    <List
      className="reply-comment-list"
      itemLayout='vertical'
      loading={false}
      dataSource={dataSource.comment}
      renderItem={item => {
        return (


          <List.Item>
            <Skeleton avatar title={false} loading={dataSource.loading} active>
              <Comment
                actions={actions}
                author={<span><LinkUser>{item.fromUserName}&nbsp;&nbsp;</LinkUser><span>回复</span><LinkUser>&nbsp;&nbsp;{item.toUserName}</LinkUser></span>}
                avatar={(
                  <Avatar
                    src={item.fromUserAvatar}
                    alt={item.fromUserName}
                  />
                )}
                content={<p>{item.content}</p>}
                datetime={
                  <Tooltip title={item.createdAt}>
                    <span>{moment(item.createdAt, "YYYY-MM-DD HH:mm:ss").fromNow()}</span>
                  </Tooltip>
                }
              >
              </Comment>
            </Skeleton>
          </List.Item>
        )
      }}
    />
  )
}

<Row type="flex" justify="start" align="middle">
  {
    colTitleNum.map((item, index) => (
      <Col span={6} key={item + index}>
        <ColNum>{item.num}</ColNum>
        <ColTitle>{item.title} <Icon type="right" style={{ fontSize: '13px' }} /></ColTitle>
      </Col>
    ))
  }
</Row>
const colTitleNum = [{ title: '文章', num: '32' }, { title: '关注', num: '32' }, { title: '粉丝', num: '2' }]


/**
 * 初始化用户信息
 */
const initUserValue = (data) => ({
  type: constants.INIT_USER_VALUE,
  data
});
export const getInitUser = () => {
  alert(1);
  return (dispatch) => {
    fetch('http://zuoyecloud.com/api/user/findOne?userId=' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (!data.success) {
        message.error(data.message);
      } else {
        dispatch(initUser(data.data));
      }
    }).catch((err) => {
      message.error("获取信息失败");
      console.log(err);
    })
  }
}
case constants.INIT_USER_VALUE:
const userInfo = state.get('userInfo');
const getUserInfo = fromJS(action.userInfo).filter((val, key) => {
  return userInfo.has(key);
});
const setUserInfo = userInfo.merge(getUserInfo);
return state.set('userInfo', setUserInfo);
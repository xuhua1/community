import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Lockr from 'lockr';
import Header from '../../common/header';
import PaperItem from '../show/body/paperItem';
import Question from '../show/body/questionItem';
import Upload from '../show/body/uploadItem';
import { Badge, Tabs, Icon, Avatar, Row, Col, Button } from 'antd';
import {
  UserBox,
  UserWrapper,
  TabsWrapper,
  InfoWrapper,
  Follow,
  NickName,
  Sign
} from './style';
const TabPane = Tabs.TabPane;
class UserInfo extends Component {
  componentDidMount () {
    /**
     * 初始化数据, 获得用户的信息, 获得用户的关注情况, 获得导航栏数据
     */
    const userId = Lockr.get('userId');
    const userInfoId = this.props.match.params.id;
    this.props.initUserInfo(userId);
    this.props.handleChangPaperList('article');
  }
  handleTab = (index)=>{
    const arr = ['article','question','upload'];
    index = parseInt(index)-1;
    const str = arr[index];
    this.props.handleChangPaperList(str);
  }
  render () {
    const { nickname, userSign, avatar } = this.props.userInfo;
    return (
      <UserBox>
        <Header />
        <UserWrapper>
          <InfoWrapper>
            <Row type="flex" justify="center" align="middle">
              <Col span={2}>
                <Avatar size={50} src={avatar} />
              </Col>
              <Col span={4}>
                <NickName>
                  {nickname}
                </NickName>
              </Col>
              <Col offset={2} span={4}>
                <Sign>{userSign}</Sign>
              </Col>
            </Row>
          </InfoWrapper>
          <TabsWrapper>
            <Tabs defaultActiveKey="1" onChange={this.handleTab}>
                  <TabPane tab={
                    <span>
                      <Icon type='profile'/>文章
                    </span>
                    }
                    key="1"
                  >
                    <PaperItem paperList = {this.props.paperList}></PaperItem>
                  </TabPane>

                  <TabPane tab={
                    <span>
                      <Icon type='question' /> 问题
                    </span>
                    }
                    key="2"
                  >
                    <Question paperList = {this.props.questionList}></Question>
                  </TabPane>

                  <TabPane tab={
                    <span>
                      <Icon type='file'/>文件
                    </span>
                    }
                    key="3"
                  >
                    <Upload paperList = {this.props.uploadList}></Upload>
                  </TabPane>
            </Tabs>
          </TabsWrapper>
        </UserWrapper>
      </UserBox >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    paperList: state.getIn(['login','paperList']).toJS(),
    questionList:state.getIn(['login','questionList']).toJS(),
    uploadList: state.getIn(['login','uploadList']).toJS(),
    userInfo: state.getIn(['login', 'userInfo']).toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initUserInfo (userId) {
      dispatch(actionCreator.initUserInfo(userId));
    },
    handleChangPaperList(menu){
      dispatch(actionCreator.handleChangPaperList(menu));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
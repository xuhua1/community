import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Header from '../../../common/header';
import { Avatar, Input, Upload, Icon, Button, Cascader, Row, Col, Badge, Collapse } from 'antd';
import Lockr from 'lockr';
import {
  ImesBox,
  UserItem,
  Nickname,
  ImesTitle,
  MesItem,
  LeftMesItem,
  MesTextArea,
  MesList,
  UserList,
  ImesWrapper,
  LeftWrapper,
  RightWrapper,
  BadgeWrapper,
} from './style';
import io_client from 'socket.io-client';
const { Panel } = Collapse;
const { TextArea } = Input;
class Imes extends Component {
  componentDidMount () {
    const userId = Lockr.get('userId');
    this.socket = io_client('https://zuoyecloud.com/');
    this.socket.emit("makeconnect", userId);
    this.socket.on("sendtwou", (res, toAvatar) => {
      console.log(res, toAvatar);
      this.props.initImesDia(res, toAvatar);
    });
    this.socket.on("aboutfromid", (unSend, unRead, allArr) => {
      this.props.initUserList(unSend, unRead, allArr);
    });
    this.socket.on("msg", (code, data) => {
      this.props.onsendMes(code, data);
    });
  }
  getMesItem = (item, index) => {
    const userId = Lockr.get('userId');
    if (userId !== item.fromId) {
      return (
        <Row key={item.imes + index} style={{ marginTop: '40px' }}>
          <Col offset={5} span={16}>
            <MesItem>
              <span className={"mes"}>{item.imes}</span>
              <span className={"rightTime"}>{item.createdAt}</span>
              <div style={{ clear: "both" }}></div>
              <div className={"triangle"}></div>
              <div className={"inTriangle"}></div>
            </MesItem>
          </Col>
          <Col offset={1} span={2}>
            <Avatar size={40} src={item.avatar} />
          </Col>
        </Row>
      )
    } else {
      return (
        <Row key={item.imes + index} style={{ marginTop: '40px' }}>
          <Col span={2} style={{ textAlign: "right" }}>
            <Avatar size={40} src={item.avatar} />
          </Col>
          <Col offset={1} span={16}>
            <LeftMesItem>
              <span className="mes">{item.imes}</span>
              <span className="leftTime">{item.createdAt}</span>
              <div style={{ clear: "both" }}></div>
              <div className="triangle"></div>
              <div className="inTriangle"></div>
            </LeftMesItem>
          </Col>
        </Row>
      )
    }
  }
  render () {
    const userId = Lockr.get('userId');
    const { allUser,toUserName, ImesList, changeImesValue, ImesValue, sumbitImes, changeToUser, userList } = this.props;
    const jsImesList = ImesList.toJS();
    const jsuserList = userList.toJS();
    console.log(jsuserList);
    return (
      <ImesBox>
        <Header />
        <ImesWrapper>
          <LeftWrapper>
            <UserList>
                  {
                    jsuserList.map(item => {
                      return item._id!==userId?(
                        <UserItem id={item._id} key={item._id}  onClick={() => changeToUser(item._id, this.socket)}>
                          <Avatar size={30} src={item.avatar} />
                          <Nickname>{item.nickname}</Nickname>
                          <BadgeWrapper>
                            <Badge count={item.unread} />
                            <Badge count={item.unsend} style={{ backgroundColor: '#52c41a' }} />
                          </BadgeWrapper>
                        </UserItem>
                      ):null;
                    })
                  }
            </UserList>
          </LeftWrapper>
          <RightWrapper>
            <MesList>
              {
                jsImesList.map((item, index) => {
                  return this.getMesItem(item, index);
                })
              }
            </MesList>
          </RightWrapper>
          <ImesTitle>与{toUserName}的对话</ImesTitle>
          <MesTextArea>
            <TextArea rows={3} style={{ marginBottom: "10px", }} value={ImesValue} onChange={changeImesValue} />
            <Button type="primary" onClick={() => sumbitImes(ImesValue, this.socket)}>发送</Button>
          </MesTextArea>
        </ImesWrapper>
      </ImesBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ImesList: state.getIn(['imes', 'ImesList']),
    ImesValue: state.getIn(['imes', 'ImesValue']),
    userList: state.getIn(['imes', 'userList']),
    toUserName: state.getIn(['imes', 'toUserName']),
    allUser: state.getIn(['imes','allUser']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeImesValue (e) {
      dispatch(actionCreator.changeImesValue(e.target.value));
    },
    sumbitImes (ImesValue, socket) {
      if (ImesValue === "") return;
      dispatch(actionCreator.sumbitImes(ImesValue, socket));
    },
    changeToUser (value, socket) {
      console.log(value);
      dispatch(actionCreator.changeToUserFun(value, socket));
    },
    //初始化用户列表
    initUserList (unSend, unRead, allArr) {
      dispatch(actionCreator.initUserList(unSend, unRead, allArr));
    },
    //初始化聊天框
    initImesDia (res, toAvatar) {
      dispatch(actionCreator.initImesDia(res, toAvatar));
    },
    //发送数据
    onsendMes (code, data) {
      dispatch(actionCreator.onsendMes(code, data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Imes);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Header from '../../../common/header';
import { Badge, Tabs, Icon, Avatar, Row, Col, Button } from 'antd';
import {
  UserBox,
  TabsWrapper,
  InfoWrapper,
  Follow,
  NickName,
  Sign,
  SemRightWrapper,
  SemLeftWrapper,
  Edit,
  EditItem
} from './style';
const TabPane = Tabs.TabPane;
class Seminar extends Component {
  render () {
    //const userInfoID = this.props.match.params.id;
    const signValue = '这是我的签名';
    const navList = [{ icon: 'profile', title: '文章', num: "21" }, { icon: 'question', title: '提问', num: "21" }, { icon: 'file', title: '文件', num: "21" }]
    return (
      <UserBox>
        <Header />
        <Row>
          <Col span={18}>
            <SemLeftWrapper>
              <InfoWrapper>
                <Row type="flex" justify="center" align="middle">
                  <Col span={4}>
                    <Avatar shape="square" size={64} src="http://b-ssl.duitang.com/uploads/item/201508/18/20150818233659_KVuMT.jpeg" />
                  </Col>
                  <Col span={4}>
                    <NickName>
                      中国人
                  </NickName>
                  </Col>
                  <Col offset={2} span={4}>
                    <Sign>{signValue}</Sign>
                  </Col>
                  <Col offset={3} span={2}>
                    <Button icon="check-circle" size={'default'}><Follow>已关注</Follow></Button>
                    { /*<Button type="primary" icon="plus-circle" size={'default'}><Follow>关 注</Follow></Button>*/}
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </InfoWrapper>
              <TabsWrapper>
                <Tabs defaultActiveKey="1">
                  {
                    navList.map((item, index) => (
                      <TabPane tab={
                        <span>
                          <Icon type={item.icon} />{item.title + " "}
                          <Badge count={item.num} offset={[0, -3]} style={{ backgroundColor: 'rgba(82,196,26,0.2)', color: 'blue', boxShadow: '0 0 0 1px #d9d9d9 inset' }} /></span>
                      }
                        key={index + 1 + ''}>
                        134
                    </TabPane>
                    ))
                  }
                </Tabs>
              </TabsWrapper>
            </SemLeftWrapper>
          </Col>
          <Col span={6}>
            <SemRightWrapper>
              <Edit>
                <EditItem>
                  <Button type="primary" icon="edit" size={'large'}><Follow>写文章</Follow></Button>
                </EditItem>
                <EditItem>
                  <Button type="primary" icon="question" size={'large'}><Follow>提问</Follow></Button>
                </EditItem>
                <EditItem>
                  <Button type="primary" icon="upload" size={'large'}><Follow>上传</Follow></Button>
                </EditItem>
              </Edit>
            </SemRightWrapper>
          </Col>
        </Row>
      </UserBox >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editorState: state.getIn(['write', 'editorState']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditorChange (editorContent) {
      dispatch(actionCreator.changeEditValue(editorContent));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seminar);
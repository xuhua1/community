import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Header from '../../common/header';
import AvatarPick from './avatarPick';
import {
  LoginWrapper,
  SettingWrapper,
  WrapCard
} from './style';
import Lockr from 'lockr';
import { Upload, Icon, Button, Avatar, Input, Col, Row } from 'antd';
const { Search } = Input;
class Setting extends Component {

  componentDidMount(){
    const userId = Lockr.get('userId');
    !this.props.userInfo.avatar&&this.props.initUserInfo(userId);
  }
  /**
   * email
   * avatar
   * assign
   */
  render () {
    const { handleSubAva, setUserMesBtn, handleSubmitSet, setting, userInfo } = this.props;
    const { setMesbtn, setAvatar, picurl } = setting;
    const { avatar, email,userSign } = userInfo;
    const lockrAvatar = Lockr.get('avatar');
    const Arr = [email, userSign];
    return (
      <LoginWrapper>
        <Header />
        <SettingWrapper>
          <WrapCard>
            <div><Avatar size={64} src={avatar?avatar:lockrAvatar} /></div>
            <Upload customRequest={handleSubAva} fileList={[]}>
              <Button>
                <Icon type="upload" />上传头像
              </Button>
            </Upload>
            {
              setAvatar && (<AvatarPick />)
            }
          </WrapCard>
          <WrapCard>
            {
              ['setEmail', 'setUserSign'].map((item,index) => {
                if (setMesbtn === item) {
                  return (
                    <Row key={item} style={{margin:"20px"}}>
                      <Col offset={2} span={20}><Search
                        placeholder={Arr[index]}
                        enterButton="提交"
                        size="large"
                        onSearch={value => handleSubmitSet(value, setMesbtn)}
                      /></Col>
                    </Row>
                  )
                } else {
                  return (
                    <Row key={item} style={{margin:"20px"}}>
                      <Col span={18}>{Arr[index]}</Col>
                      <Col span={6}><Button type="primary" id={item} onClick={setUserMesBtn} >修改</Button></Col>
                    </Row>
                  )
                }
              })
            }
          </WrapCard>
        </SettingWrapper>
      </LoginWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    setting: state.getIn(['login', 'setting']).toJS(),
    userInfo: state.getIn(['login', 'userInfo']).toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserMesBtn (e) {
      const id = e.target.id;
      dispatch(actionCreator.setUserMesBtn(id));
    },
    handleSubmitSet (value, setMesbtn) {
      dispatch(actionCreator.handleSubmitSet(value, setMesbtn));
    },
    handleSubAva ({ file }) {
      dispatch(actionCreator.handleSubAva(file));
    },
    initUserInfo(userId){
      dispatch(actionCreator.initUserInfo(userId));      
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Setting);




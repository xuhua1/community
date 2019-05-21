import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreator } from './store';
import { actionCreator as loginActionCreator } from '../../main/login/store';
import { actionCreator as setPaperList } from '../../main/show/body/store';
import { Avatar, Menu, Dropdown, Icon, Button } from 'antd';
import {Link} from 'react-router-dom';
import Lockr from 'lockr';
import {
  HeaderWrapper,
  Nav,
  Logo,
  SearchWrapper,
  NavSearch,
  SearchHistory,
  HistoryItem,
  InfoItem,
  DeleteHistoryItem,
  RightWrapper,
  Login,
  Write
} from './style';

const userId = Lockr.get('userId');
class HEADer extends PureComponent {

  getHistoryArea = () => {
    const { focused, mouseInHistory, searchHistory, handleDeleteSearchHisItem, handleMouseInHistory, handleMouseOutHistory, handleInfoItemClick } = this.props;
    const newSearchHistory = searchHistory.toJS();
    if (focused || mouseInHistory) {
      return (
        <SearchHistory
          onMouseEnter={handleMouseInHistory}
          onMouseLeave={handleMouseOutHistory}>
          {
            newSearchHistory.map((item, index) => {
              return (
                <HistoryItem key={item + index}>
                  <InfoItem onClick={() => handleInfoItemClick(item, index)}>
                    {item.searchValue}
                  </InfoItem>
                  <DeleteHistoryItem
                    onClick={() => { handleDeleteSearchHisItem(item, index) }}>删除
                  </DeleteHistoryItem>
                </HistoryItem>
              )
            })
          }
        </SearchHistory>
      )
    } else {
      return null;
    }
  }

  looseBlur = () => {
    this.refs.inputext.blur();
  }

  render () {
    const {userInfo , loginOut}=this.props;
    const avatar = userInfo.avatar || Lockr.get('avatar');
    
    const userMenu = (
      <Menu>
        <Menu.Item>
          <Link to={"/user/" + userId}><Icon type="user" />&nbsp;&nbsp;我的主页</Link>
        </Menu.Item>
        <Menu.Item>
          <Link  to={"/setting/" + userId}><Icon type="setting" />&nbsp;&nbsp;设置</Link>
        </Menu.Item>
        <Menu.Item onClick={loginOut}>
          <Link to="/login"><Icon type="logout" />&nbsp;&nbsp;退出</Link>
        </Menu.Item>
      </Menu>
    );
    const writeMenu = (
      <Menu>
        <Menu.Item>
          <Link  to={"/write"}><Icon type="edit" />&nbsp;&nbsp;富文本</Link>
        </Menu.Item>
        <Menu.Item>
          <Link  to={"/markdown"}><Icon type="form" />&nbsp;&nbsp;markdown</Link>
        </Menu.Item>
      </Menu>
    );
    const {current, focused, mouseInHistory, handleInputFocus, handleInputBlur, searchValue, handleChangeSearchValue, handleInputKeyPress, searchHistory } = this.props;  
    return (
      <HeaderWrapper>
        <Nav>
          <Link to={"/home"}>
            <Logo />
          </Link>
          <SearchWrapper>
            <CSSTransition
              in={focused || mouseInHistory}
              timeout={300}
              classNames="slide"
            >
              <NavSearch
                ref="inputext"
                className={focused || mouseInHistory ? 'focused' : ''}
                onFocus={() => handleInputFocus(searchHistory)}
                onBlur={handleInputBlur}
                value={searchValue}
                onChange={handleChangeSearchValue}
               onKeyPress={(event) => { if (event.charCode === 13) { this.looseBlur(); /*handleInputKeyPress(searchValue)*/ } }}
              />
            </CSSTransition>
            <Button onClick={()=>handleInputKeyPress(searchValue,this.props.searchHistory.toJS(),current)}>搜索</Button>
            {this.getHistoryArea()}
          </SearchWrapper>
          <RightWrapper>
            {
              avatar ? (
                <Dropdown overlay={userMenu} placement="bottomCenter">    
                    <Avatar src={avatar} size={46} style={{ marginTop: 7 }} />
                </Dropdown>
              ) : (<Link to="/login"><Login style={{color:"#000000"}}>登陆</Login></Link>)
            }
            <Dropdown overlay={writeMenu} placement="bottomCenter">    
            <Write>书写</Write>
            </Dropdown>
          </RightWrapper>
        </Nav>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.getIn(['header', 'focused']),
    searchValue: state.getIn(['header', 'searchValue']),
    mouseInHistory: state.getIn(['header', 'mouseInHistory']),

    searchHistory: state.getIn(['header', 'SearchHistoryList']),
    userInfo: state.getIn(['login', 'userInfo']).toJS(),

    current: state.getIn(['body', 'menuCurrent']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeSearchValue (event) {
      dispatch(actionCreator.changeSearchValue(event.target.value));
    },

    handleInputFocus (searchHistory) {
      (searchHistory.size === 0&&userId) && dispatch(actionCreator.getHistoryList());
      dispatch(actionCreator.handleInputFocus());
    },
    handleInputBlur () {
      dispatch(actionCreator.handleInputBlur());
    },
    handleMouseInHistory () {
      dispatch(actionCreator.handleMouseInHistory());
    },
    handleMouseOutHistory () {
      dispatch(actionCreator.handleMouseOutHistory());
    },

    handleDeleteSearchHisItem (item, index) {
      dispatch(actionCreator.handleDeleteSearchHisItem(item, index));
    },

    handleInfoItemClick (item, index) {
      dispatch(actionCreator.handleInfoItemClick(item, index));
      dispatch(actionCreator.handleMouseOutHistory());
    },

    handleInputKeyPress (searchValue,newSearchHistory,current) {
      dispatch(setPaperList.handleChangPaperList(searchValue,current));
      dispatch(actionCreator.handleInputKeyPress(searchValue,newSearchHistory));
    },

    //登出
    loginOut(){
      dispatch(loginActionCreator.loginOut());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HEADer);
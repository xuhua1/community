import { Menu, Icon } from 'antd';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreator } from '../store';
class NavBar extends PureComponent {

  componentDidMount(){
    this.props.changeMenuCurrent(this.props.current, this.props.searchingValue);
  }

  handleClick = (e) => {
    this.props.changeMenuCurrent(e.key, this.props.searchingValue);
  }

  render () {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.props.current]}
        mode="horizontal"
      >
        <Menu.Item key="article">
          <Link to='/home/article'><Icon type="book" theme="twoTone" />文章</Link>
        </Menu.Item>
        <Menu.Item key="question">
          <Link to='/home/question'>
            <Icon type="question-circle" theme="twoTone" />问题
           </Link>
        </Menu.Item>
        <Menu.Item key="upload">
          <Link to='/home/upload'><Icon type="crown" theme="twoTone" />文件</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.getIn(['body', 'menuCurrent']),
    searchingValue: state.getIn(['header', 'searchingValue'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeMenuCurrent (key,searchVal) {
      dispatch(actionCreator.changeMenuCurrent(key));
      dispatch(actionCreator.handleChangPaperList(searchVal,key));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

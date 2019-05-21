import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import {
  PickWrapper,
  Pick,
  ImageWrapper,
  RightButton,
  BottomCenterButton,
  BottomRightButton
} from './style';
import { Row, Col, Button } from 'antd';

function getMouseXY (e) {
  var x = 0, y = 0;
  e = e || window.event;
  if (e.pageX) {
    x = e.pageX;
    y = e.pageY;
  } else {
    x = e.clientX + document.body.scrollLeft - document.body.clientLeft;
    y = e.clientY + document.body.scrollTop - document.body.clientTop;
  }
  return {
    x: x,
    y: y
  };
}

class AvatarPick extends Component {
  render () {
    const { handleMouseDown, handleUp, ImagePickMove, imagePick, picurl } = this.props;
    const jsImagePick = imagePick.toJS();
    const { cancelAcatarPick, confirmAcatarPick } = this.props;
    return (
      <PickWrapper >
        <Pick />
        <ImageWrapper onMouseUp={handleUp} onMouseMove={(e) => jsImagePick.changing && ImagePickMove(e, jsImagePick,this.refs.img)}>
          <img ref="img" src={picurl} />
          <div
            id="ImagePick"
            style={{
              width: jsImagePick.w + 'px',
              height: jsImagePick.h + 'px',
              cursor: 'move',
              position: 'absolute',
              top: jsImagePick.y + 'px',
              left: jsImagePick.x + 'px',
              backgroundImage: `url(${picurl})`,
              backgroundPosition: (-jsImagePick.x + 'px ') + (-jsImagePick.y + 'px'), //改变了 + ' '  + 
            }}
            onMouseDown={handleMouseDown}
          >
            <RightButton id="RightButton" />
            <BottomCenterButton id="BottomCenterButton" />
            <BottomRightButton id="BottomRightButton" />
          </div>
          <Row>
            <Col span={12}><Button style={{ width: '100%' }} onClick={cancelAcatarPick}>取消</Button></Col>
            <Col span={12}><Button type="primary" style={{ width: '100%' }} onClick={() => confirmAcatarPick(jsImagePick, picurl)}>确定</Button></Col>
          </Row>
        </ImageWrapper>
      </PickWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imagePick: state.getIn(['login', 'imagePick']),
    picurl: state.getIn(['login', 'setting', 'picurl']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleMouseDown (e) {
      const mouseX = parseInt(getMouseXY(e).x);
      const mouseY = parseInt(getMouseXY(e).y);
      const id = e.target.id;
      dispatch(actionCreator.handleMouseDown(mouseX, mouseY, id));
    },
    handleUp () {
      dispatch(actionCreator.handleUp());
    },
    ImagePickMove (e, jsImagePick,img) {
      const mouseX = parseInt(getMouseXY(e).x);
      const mouseY = parseInt(getMouseXY(e).y);
      //const {x,y,w,h} = jsImagePick;
      //if(x+w>=img.width||y+h>=img.height) return;
      dispatch(actionCreator.ImagePickMove(mouseX, mouseY, jsImagePick,img.width,img.height));
    },
    cancelAcatarPick () {
      dispatch(actionCreator.cancelAcatarPick());
    },
    confirmAcatarPick (jsImagePick, picurl) {
      dispatch(actionCreator.confirmAcatarPick(jsImagePick, picurl));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AvatarPick);




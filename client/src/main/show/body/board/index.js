import React from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom';

const Board = ()=>  (
  <React.Fragment >
    <div>
      <Link to="/write"><Button style={{width:"240px",margin:"20px"}} type="primary" shape="round" icon="edit" size={"large"}>富文本编辑器</Button></Link>
      <Link to="/markdown"> <Button style={{width:"240px",margin:"20px"}} type="primary" shape="round" icon="form" size={"large"}>Markdown编辑器</Button></Link>
      <Link to="/question"><Button style={{width:"240px",margin:"20px"}} type="primary" shape="round" icon="question" size={"large"}>提出问题</Button></Link>
      <Link to="/upload"><Button style={{width:"240px",margin:"20px"}} type="primary" shape="round" icon="file" size={"large"}>上传文件</Button></Link>
      <Link to="/imes"><Button style={{width:"240px",margin:"20px"}} type="primary" shape="round" icon="file" size={"large"}>聊天界面</Button></Link>
    </div>
  </React.Fragment>
);
export default Board;
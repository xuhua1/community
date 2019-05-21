import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Header from '../../../common/header';
import { Button, Card, Avatar, Row, Col, Form, Input, Comment, Tooltip, Tag } from 'antd';
import moment from 'moment';
import Lockr from 'lockr';
import {
  QuesBox,
  Intro,
  MesWrapper,
  Detail,
  Label
} from './style';
const { TextArea } = Input;

const Editor = ({
  onChange, onSubmit, submitting, value,
}) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          增加评论
      </Button>
      </Form.Item>
    </div>
  );

class Question extends Component {
  componentDidMount () {
    const { match } = this.props;
    const uploadId = match.params.id;
    this.props.initData(uploadId);
  }
  download(href, title){
    href = href.split("?")[0];
    const a = document.createElement('a');
    a.setAttribute('download', title);
    a.setAttribute('href', href);
    a.setAttribute('target', '_blank');
    a.click();
  }
  render () {
    const uploadId = this.props.match.params.id;
    const { handleChange, handleSubmit, uploadTextValue, uploadValue, commentList } = this.props;
    const jsCommentList = commentList.toJS();
    const jsUploadValue = uploadValue.toJS();
    const avatar = Lockr.get('avatar');
    const nickname = Lockr.get('nickname');
    return (
      <QuesBox>
        <Header />
        <Card style={{ width: 960, marginTop: 16, }} loading={false}>
          <Comment
            datetime={(
              <Tooltip title={jsUploadValue.createdAt}>
                <span>{moment(jsUploadValue.createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>
              </Tooltip>
            )}
            avatar={(
              <Avatar
                src={jsUploadValue.avatar}
              />
            )}
            content={(
              <p>{jsUploadValue.nickname}</p>
            )}
          />
          <MesWrapper>
            <Intro>
              <p>
                {jsUploadValue.oneWord}
              </p>
            </Intro>
            <Detail>
              <p>
                {jsUploadValue.inDetail}
              </p>
            </Detail>
            {
              jsUploadValue.urlList && jsUploadValue.urlList.map((item, index) => {
                return (
                  <Row key={item + index} style={{ marginTop: 20, paddingBottom: 10, borderBottom: '1px solid gray' }}>
                    <Col span={20}>{item.filename}</Col>
                    <Col span={4}>
                        <Button onClick = {()=>this.download(item.url, item.filename)} type="primary" icon="download" size={"small"}>下载</Button>
                    </Col>
                  </Row>
                );
              })
            }
            {
              jsCommentList.map((item, index) => {
                //console.log(item); //commentValue
                return (
                  <Comment
                    key={item.nickname + index}
                    author={<a href='/'>{item.nickname}</a>}
                    avatar={(
                      <Avatar
                        src={item.avatar}
                        alt={item.nickname}
                      />
                    )}
                    content={( 
                      <p>{item.commentValue? item.commentValue:item.uploadValue}</p>
                    )}
                    datetime={(
                      <Tooltip title={item.createdAt}>
                        <span>{moment(item.createdAt, "YYYY-MM-DD HH:mm:ss").fromNow()}</span>
                      </Tooltip>
                    )}
                  />
                )
              })
            }
            <Comment
              avatar={(
                <Avatar
                  src={avatar}
                  alt={nickname}
                />
              )}
              content={(
                <Editor
                  onChange={handleChange}
                  onSubmit={() => handleSubmit(uploadTextValue, uploadId)}
                  submitting={false}
                  value={uploadTextValue}
                />
              )}
            />
          </MesWrapper>
        </Card>
      </QuesBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uploadValue: state.getIn(['showUpload', 'uploadValue']),
    commentList: state.getIn(['showUpload', 'commentList']),
    uploadTextValue: state.getIn(['showUpload', 'uploadTextValue']),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleChange (e) {
      dispatch(actionCreator.handleChange(e.target.value))
    },
    handleSubmit (uploadValue, uploadId) {
      dispatch(actionCreator.handleSubmit(uploadValue, uploadId));
    },
    initData (uploadId) {
      dispatch(actionCreator.initData(uploadId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
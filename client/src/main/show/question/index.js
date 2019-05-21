import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Header from '../../../common/header';
import { Button, Card, Avatar, Row, Col, Modal, Form, Input, Comment, Tooltip, Tag, Upload } from 'antd';
import moment from 'moment';
import Lockr from 'lockr';
import {
  QuesBox,
  Label,
  Intro,
  Detail,
  MesWrapper
} from '../upload/style';
const { Meta } = Card;
const { TextArea } = Input;
const avatar = Lockr.get('avatar');
const nickname = Lockr.get('nickname');
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
          提交答案
      </Button>
      </Form.Item>
    </div>
  );

class QuestionShow extends Component {

  componentDidMount () {
    const questionId = this.props.match.params.id;
    this.props.initQuestionShow(questionId);
  }

  render () {
    const questionId = this.props.match.params.id;
    const { submit, answers, imageList, handlePreview, previewVisible, previewImage, handleCancel, questionShow, handleSubmit, handleChange, textAraVal } = this.props;
    return (
      <QuesBox>
        <Header />
        <Card style={{ width: 960, marginTop: 16, }} loading={false}>
          <Comment
            datetime={(
              <Tooltip title={questionShow.createdAt}>
                <span>{moment(questionShow.createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>
              </Tooltip>
            )}
            avatar={(
              <Avatar
                src={questionShow.avatar}
              />
            )}
            content={(
              <p>{questionShow.nickname}</p>
            )}
          />
          <MesWrapper>
            <Label>
              {
                questionShow.label && questionShow.label.map((item, index) => {
                  return (
                    <Tag color="cyan" key={item + index}>{item}</Tag>
                  )
                })
              }
            </Label>
            <Intro>
              <p>
                {questionShow.oneWord}
              </p>
            </Intro>
            <Detail>
              <p>
                {questionShow.inDetail}
              </p>
            </Detail>
            <div className="clearfix">
              <Upload
                listType="picture-card"
                fileList={imageList}
                onPreview={handlePreview}
                showUploadList={{ showRemoveIcon: false }}
              >
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
            {
              answers.map((item, index) => {
                return (
                  <Comment
                    key={item.nickname + index}
                    author={<a>{item.nickname}</a>}
                    avatar={(
                      <Avatar
                        src={item.avatar}
                        alt={item.nickname}
                      />
                    )}
                    content={(
                      <p>{item.answerValue}</p>
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
            {<Comment
              avatar={(
                <Avatar
                  src={avatar}
                  alt={nickname}
                />
              )}
              content={(
                <Editor
                  onChange={handleChange}
                  onSubmit={() => handleSubmit(questionId, textAraVal)}
                  submitting={submit}
                  value={textAraVal}
                />
              )}
            />}
          </MesWrapper>
        </Card>
      </QuesBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questionShow: state.getIn(['showQuestion', 'questionShow']).toJS(),
    imageList: state.getIn(['showQuestion', 'imageList']).toJS(),
    previewVisible: state.getIn(['showQuestion', 'previewVisible']),
    previewImage: state.getIn(['showQuestion', 'previewImage']),
    textAraVal: state.getIn(['showQuestion', 'textAraVal']),
    answers: state.getIn(['showQuestion', 'answers']).toJS(),
    submit: state.getIn(['showQuestion', 'submit']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePreview (file) {
      dispatch(actionCreator.handlePreview(file));
    },
    handleCancel () {
      dispatch(actionCreator.handleCancel());
    },
    initQuestionShow (questionId) {
      dispatch(actionCreator.initQuestionShow(questionId));
      dispatch(actionCreator.initQuestionAnswer(questionId));
    },
    handleChange (e) {
      dispatch(actionCreator.handleChange(e.target.value));
    },
    handleSubmit (questionId, uploadTextValue) {
      dispatch(actionCreator.handleSubmit(questionId, uploadTextValue));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionShow);
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Nav from './nav';
import PaperItem from './paperItem';
import Question from './questionItem';
import Upload from './uploadItem';
import Board from './board';
import Header from '../../../common/header';
import { Switch, Route, Redirect} from 'react-router-dom';
import {
  BodyWrapper,
  MainWrapper,
  LeftWrapper,
  PaperWrapper,
  RightWrapper
} from './style';

class Body extends PureComponent {
  render () {
    const { paperList, current } = this.props;
    return (
      <React.Fragment>
        <Header />
        <BodyWrapper>
          <MainWrapper>
            <LeftWrapper>
              <Nav />
              <PaperWrapper>
                <Switch>
                    <Route path='/home' exact render={()=><Redirect to={`/home/${current}`}/>}/>
                    <Route path='/home/article' render={()=><PaperItem paperList={paperList}/>}/>
                    <Route path='/home/question' render={()=><Question paperList={paperList}/>}/>
                    <Route path='/home/upload' render={()=><Upload paperList={paperList}/>}/>
                </Switch>
              </PaperWrapper>
            </LeftWrapper>
            <RightWrapper>
              <Board />
            </RightWrapper>
          </MainWrapper>
        </BodyWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.getIn(['body', 'menuCurrent']),
    paperList: state.getIn(['body', 'paperList']).toJS(),
  }
}
export default connect(mapStateToProps, null)(Body);

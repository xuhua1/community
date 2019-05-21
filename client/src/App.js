import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Globalstyle } from './style.js';
import { GlobalIconfont } from './static/iconfont/iconfont';
import 'whatwg-fetch';
import Lockr from 'lockr';
import store from './store';


import Body from './main/show/body';
import Write from './main/write/article';
import Markdown from './main/write/markdown';
import Article from './main/show/article';
import UserInfo from './main/login/userInfo';
import showUpload from './main/show/upload';
import showQuestion from './main/show/question';
import Question from './main/write/question';
import Upload from './main/write/upload';
import Login from './main/login';
import Register from './main/login/register';
import Setting from './main/login/setting';
import Pick from './main/login/avatarPick';
import Imes from './main/write/imes';
const toLogin = ()=>(<Redirect to="/login" />);
class App extends PureComponent {
  makeId (component1, component2) {
    return ({ match }) => {
      return (
        <div>
          <Route path={`${match.path}/:id`} component={component1} />
          <Route
            exact
            path={match.path}
            component={Lockr.get('userId')?component2:toLogin}
          />
        </div>
      )
    }
  }
  render () {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Globalstyle />
          <GlobalIconfont />
          <BrowserRouter>
            <React.Fragment>
              <Route path="/" exact render={()=><Redirect to="/home"/>}></Route>
              <Route path="/pick" component={Pick}></Route>
              <Route path="/imes" component={Lockr.get('userId')?Imes:toLogin}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/setting" component={Setting}></Route>
              <Route path="/home" component={Body}></Route>
              <Route path="/write" component={Lockr.get('userId')?Write:toLogin}></Route>
              <Route path="/markdown" component={Lockr.get('userId')?Markdown:toLogin}></Route>
              <Route path="/question" component={this.makeId(showQuestion, Question)}></Route>
              <Route path="/upload" component={this.makeId(showUpload, Upload)}></Route>
              <Route path="/article" component={this.makeId(Article, Write)} />
              <Route path="/user" component={this.makeId(UserInfo, Login)} />
            </React.Fragment>
          </BrowserRouter>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;

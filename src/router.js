import React from 'react';
import {Router, Route, Switch, Redirect} from 'dva/router';
import {connect} from 'dva';
import AuthPage from './routes/auth-page';
import CommentPage from './routes/comment-page';
import ReviewPage from './routes/review-page';
import AdminPage from './routes/admin-page';

const PrivateRoute = connect((state) => ({
  logged_in: state.auth.logged_in
}))(({component: Component, logged_in, ...rest}) => (
  <Route {...rest}
         render={props => logged_in ? (<Component {...props} />) : (<Redirect to={{pathname: "/"}}/>)}
  />
));


export default function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={AuthPage}/>
        <PrivateRoute path="/comment" exact component={CommentPage}/>
        <PrivateRoute path="/review" exact component={ReviewPage}/>
        <PrivateRoute path="/admin" exact component={AdminPage}/>
        <Route component={AuthPage}/>
      </Switch>
    </Router>
  );
};

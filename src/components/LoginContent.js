import React from 'react';
import LoginForm from './Forms/LoginForm';
// import { Switch, Route, Redirect } from 'react-router-dom';

class LoginContent extends React.Component {

  render() {

    // setting mode to borrower (default) or investor
    let signupPath = this.props.location.pathname;
    let signupMode = "borrower";
    if (signupPath.indexOf("investor") >= 0) signupMode = "investor"

    console.log(signupPath, signupMode, this.props);
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">הרשמה</h1>
        {/* <LoginForm mode={signupMode}  /> */}
        <LoginForm mode={this.props.match.params.mode} />
      </div>
    )
  }
};

export default LoginContent;
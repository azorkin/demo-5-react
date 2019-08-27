import React from 'react';
import InvestorSignupForm from './Forms/InvestorSignupForm';
// import { Switch, Route, Redirect } from 'react-router-dom';

class SignupContent extends React.Component {

  render() {

    // setting mode to borrower (default) or investor
    let signupPath = this.props.location.pathname;
    let signupMode = "investor";
    if (signupPath.indexOf("borrower") >= 0) signupMode = "borrower"

    console.log(signupPath, signupMode, this.props);
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">הרשמה</h1>
        <InvestorSignupForm mode={signupMode}  />
        {/* <InvestorSignupForm mode={this.props.match.params.mode} /> */}
      </div>
    )
  }
};

export default SignupContent;
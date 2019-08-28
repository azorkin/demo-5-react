import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignupContent from "./SignupContent";
import PasswordContent from "./PasswordContent";
import ResetPasswordContent from "./ResetPasswordContent";
import ThanksContent from "./ThanksContent";
import LoginContent from "./LoginContent";
import ErrorContent from "./ErrorContent";
import VerifyPhoneContent from "./VerifyPhone";
import ChooseAccountContent from "./ChooseAccountContent";
import ForgotPasswordComponent from "./ForgotPasswordComponent";


class SigninMain extends React.Component {
  render() {
    return (
      <main className="login-main">
        <div className="container-fluid login-main__container">
          <div className="row">
            <div className="col-lg-6 col-content">
              <Switch>
                <Route path="/signup" component={SignupContent} />
                <Route exact path="/password" component={PasswordContent} />
                <Route exact path="/thanks" component={ThanksContent} />
                <Route path="/error" component={ErrorContent} />
                <Route path="/email/_confirm" component={PasswordContent} />
                <Route path="/password/_reset" component={ResetPasswordContent} />
                <Route exact path="/login" component={LoginContent} />
                <Route exact path="/verify-phone" component={VerifyPhoneContent} />
                <Route exact path="/choose-account" component={ChooseAccountContent} />
                <Route exact path="/forgot-password" component={ForgotPasswordComponent} />
                <Redirect to="/signup" />
                {/* <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignupContent} />
                <Route exact path={`${process.env.PUBLIC_URL}/password`} component={PasswordContent} />
                <Route exact path={`${process.env.PUBLIC_URL}/thanks`} component={ThanksContent} />
                <Route path="/error" component={ErrorContent} />
                <Route path={`${process.env.PUBLIC_URL}/email/_confirm`} component={PasswordContent} />
                <Route exact path={`${process.env.PUBLIC_URL}/login`} component={LoginContent} />
                <Redirect to={`${process.env.PUBLIC_URL}/`} /> */}
                {/* <Route exact path={`${process.env.PUBLIC_URL}/forgot`} component={ForgotPasswordContent} /> */}
                {/* <Route exact path={`${process.env.PUBLIC_URL}/verify-phone`} component={VerifyPhoneContent} /> */}

              </Switch>
            </div>
            <div className="col-lg-6 col-img-login"></div>
          </div>
        </div>
      </main>
    )
  }
}

export default SigninMain;
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupContent from "./SignupContent";
import PasswordContent from "./PasswordContent";
import ThanksContent from "./ThanksContent";
import LoginContent from "./LoginContent";
import ErrorContent from "./ErrorContent";

class SigninMain extends React.Component {
  render() {
    return (
      <main className="login-main">
        <div className="container-fluid login-main__container">
          <div className="row">
            <div className="col-lg-6 col-content">
              <Switch>
                <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignupContent} />
                {/* <Route exact path={`${process.env.PUBLIC_URL}/signup/:mode`} component={SignupContent} /> */}
                <Route exact path={`${process.env.PUBLIC_URL}/password`} component={PasswordContent} />
                <Route exact path={`${process.env.PUBLIC_URL}/thanks`} component={ThanksContent} />
                < Route path={`${process.env.PUBLIC_URL}/error`} component={ErrorContent} />
                < Route path={`${process.env.PUBLIC_URL}/email/_confirm`} component={PasswordContent} />
                {/* <Route exact path={`${process.env.PUBLIC_URL}/forgot`} component={ForgotPasswordContent} /> */}
                <Route exact path={`${process.env.PUBLIC_URL}/login`} component={LoginContent} />
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
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupContent from "./SignupContent";
import PasswordContent from "./PasswordContent";
import ThanksContent from "./ThanksContent";
import LoginContent from "./LoginContent";

class SigninMain extends React.Component {
  render() {
    return (
      <main className="login-main">
        <div className="container-fluid login-main__container">
          <div className="row">
            <div className="col-lg-6 col-content">
              <Switch>
                <Route path="/signup" component={SignupContent} />
                {/* <Route exact path="/signup/:mode" component={SignupContent} /> */}
                <Route exact path="/password" component={PasswordContent} />
                <Route exact path="/thanks" component={ThanksContent} />
                <Route path="/email/_confirm" component={PasswordContent} />
                {/* <Route exact path="/forgot" component={ForgotPasswordContent} /> */}
                <Route exact path="/login" component={LoginContent} />
                {/* <Route exact path="/login/:mode" component={LoginContent} /> */}
                {/* <Route exact path="/verify-phone" component={VerifyPhoneContent} /> */}
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
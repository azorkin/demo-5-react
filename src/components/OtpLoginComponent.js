import React from 'react';
import LoginFormID from './Forms/LoginFormID';
import VerifyPhoneForm from './Forms/VerifyPhoneForm';
// import { Button, Label, FormGroup, Form, Input } from 'reactstrap';
// import { Control, LocalForm, Errors, Fieldset } from 'react-redux-form';
// import { Link, withRouter } from "react-router-dom";

// API URLs
const loginRequestURL = 'https://10.7.7.134/api/Token/otp/request';



class OtpLogin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      CaptchaKey: 'dummystring',
      TZ: '',
      DateOfBirth: '',
      Code: '',

      loginStage: 1
    };

    this.handleStep1 = this.handleStep1.bind(this);
  }

  handleStep1(submittedTZ, submittedDateOfBirth) {
    this.setState({
      TZ: submittedTZ,
      DateOfBirth: submittedDateOfBirth,
      loginStage: this.state.loginStage + 1
    });
    console.log("OTP login state:", this.state);
  }

  render() {

    const {loginStage: step} = this.state;

    switch(step) {
      case 1:
        return <LoginFormID handleSuccessfulSubmit={this.handleStep1} />;
      case 2:
        return <VerifyPhoneForm handleSuccessfulSubmit={this.handleStep2} currentTZ={this.state.TZ} currentDoB={this.state.DateOfBirth} reason="login" />;
      case 3:
        return <h1>form sent - enter code - stage 3 </h1>;
      default:
        // do nothing
    }
  }
}

export default OtpLogin;
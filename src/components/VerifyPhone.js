import React from 'react';
import VerifyPhoneForm from "./Forms/VerifyPhoneForm";

class VerifyPhoneContent extends React.Component {

  render() {
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">אימות מספר טלפון</h1>
        <p className="login-content__lead">נכנסים לאזור האישי עם הקוד ששלחנו ב-sms למספר <a href="tel:0548097654">054-8097654</a></p>

        <VerifyPhoneForm />
      </div>
    )
  }
};

export default VerifyPhoneContent;
import React from 'react';
import ForgotPasswordForm from "./Forms/ForgotPasswordForm";

class ForgotPasswordComponent extends React.Component {

  render() {
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">איפוס סיסמה</h1>
        <p className="login-content__lead">
          נא הזן את כתובת המייל שסיפקת בעת ההרשמה. <br/>
          אם אינך זוכר את כתובת המייל אותה סיפקת בעבר, יש באפשרותך ליצור קשר עם שירות הלקוחות בטלפון <a href="tel:0733745000">073-374-5000</a>
        </p>

        <ForgotPasswordForm />

      </div>
    )
  }
};

export default ForgotPasswordComponent;
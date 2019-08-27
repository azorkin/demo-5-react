import React from 'react';
import VerifyPhoneForm from "./Forms/VerifyPhoneForm";

class VerifyPhoneContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formServerOK: true,
      formServerError: ""
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return sessionStorage.getItem('homei_token');
  }

  componentDidMount() {

    const verifyPhoneRequestURL = "https://10.7.7.134/api/Account/phone/verify/request"
    let currentToken = this.getToken();

    if (true) {
      fetch(verifyPhoneRequestURL, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + currentToken
        }
      })
        .then(response => {
          if (!response.ok) {
            console.log(response)
            this.setState({ formServerOK: false });
            if (response.status === 401) {
              this.setState({ formServerError: "Invalid JWT. Please login again" });
            }
            if (response.status === 400) {
              this.setState({ formServerError: "Bad request" });
            }
            throw Error(response.statusText);
          }
          this.setState({
            formServerOK: true,
            formServerError: ""
          });
          return response.json()
        })
        .then(respJson => {
          console.log('Success: ', respJson);
        })
        .catch(error => {
          console.error('Error: ', error);
          setTimeout(() => {
            this.props.history.push('/login');
          }, 3000);
        })
    }
  }

  render() {
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">אימות מספר טלפון</h1>
        <p className="login-content__lead">נכנסים לאזור האישי עם הקוד ששלחנו ב-sms למספר <a href="tel:0548097654">054-8097654</a></p>

        <VerifyPhoneForm reason="signup" />

        {!this.state.formServerOK && <label className="error error--form-level">{this.state.formServerError}</label>}
      </div>
    )
  }
};

export default VerifyPhoneContent;
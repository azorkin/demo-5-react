import React from 'react';
import VerifyPhoneForm from "./Forms/VerifyPhoneSignupForm";
import HomeiAPI from "../shared/HomeiAPI";

const { verifyPhoneRequestURL } = HomeiAPI;

class VerifyPhoneContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formServerOK: true,
      formServerError: "",
      userPhone: "XXX-XXXXXXX"
    }
    this.requestVerification = this.requestVerification.bind(this);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return sessionStorage.getItem('homei_token');
  }

  requestVerification() {
    let currentToken = sessionStorage.getItem('homei_token');

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
            formServerError: "",
            // userPhone: response
          });
          console.log(response)
          return response.text()
        })
        .then(respText => {
          this.setState({
            userPhone: respText
          })
          console.log('Success: ', respText);
        })
        .catch(error => {
          console.error('Error: ', error);
          // setTimeout(() => {
          //   this.props.history.push('/login');
          // }, 3000);
        })
    }
  }

  componentDidMount() {
    this.requestVerification()
  }

  render() {
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">אימות מספר טלפון</h1>
        <p className="login-content__lead">
          על מנת לאפשר התחברות מהירה בעתיד, אנא הקלד את קוד האימות ששלחנו לך למספר {this.state.userPhone}
        </p>

        <VerifyPhoneForm resendCode={this.requestVerification} />

        {!this.state.formServerOK && <label className="error error--form-level">{this.state.formServerError}</label>}
      </div>
    )
  }
};

export default VerifyPhoneContent;
import React from 'react';
import { withRouter } from 'react-router-dom';

class ChooseAccountContent extends React.Component {
  constructor(props) {
    super(props);
    this.thanksRef=null;

    this.state = {
      userRoles: [],
      activeRole: "",

      formServerOK: true,
      formServerError: ""
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return sessionStorage.getItem('homei_token');
  }

  componentDidMount() {
    this.scrollToThanksRef();

    const checkRoleURL = "https://10.7.7.134/api/Account/user/roles"
    let currentToken = this.getToken();

    if (true) {
      fetch(checkRoleURL, {
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
          this.setState({
            userRoles: respJson
          });
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

    const { userRoles } = this.state;

    const CurrentAccount = () => {

      if (userRoles.length > 1) {
        return (
          <div className="choose-account">
            <h1 className="choose-account__heading">תודה :-)</h1>
            <p className="choose-account__lead">הפרטים שלך התקבלו במערכת.</p>
            <div className="choose-account__select-row">
              <a href="#1" className="choose-account__button choose-account__button--borrower">
                <span>לחשבון</span>
                הלוואות
              </a>
              <a href="#1" className="choose-account__button choose-account__button--investor">
                <span>לחשבון</span>
                השקעות
              </a>
            </div>
          </div>
        )
      } else if (userRoles[0] === 'Investor') {
        return (
          <h2>Investor content</h2>
        )
      } else if (userRoles[0] === 'Borrower') {
        return (
          <h2>Borrower content</h2>
        )
      } else if (userRoles.length === 0) {
        return (
          <p>waiting for response...</p>
        )
      }
    }

    return (
      <div className="content login-content" ref={(ref) => this.thanksRef = ref}>
        <CurrentAccount />
        {/* <h1>hello</h1> */}
        {!this.state.formServerOK && <label className="error error--form-level">{this.state.formServerError}</label>}
      </div>
    )
  }

  scrollToThanksRef = () => window.scrollTo(0, this.thanksRef.offsetTop);
};

export default withRouter(ChooseAccountContent);
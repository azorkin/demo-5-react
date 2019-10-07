import React from 'react';
import { Button, Label, FormGroup, Form, Input, UncontrolledTooltip } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { isRequired, isValidPassword, isConfirmedPassword, hasNumber, hasLetter, hasCapital } from '../shared/Validation';
import HomeiAPI from "../shared/HomeiAPI";
import Spinner from "./Spinner";

// API URLs
const { emailConfirmationURL, setPasswordURL } = HomeiAPI;

// Parsing query string
/* function getQueryStringParams(query) {
  // query = query.substring(1);
  if (typeof query !== "string") return null;
  var vars = query.slice(1).split("&");
  var paramsObj = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    paramsObj[pair[0]] = decodeURIComponent(pair[1]);
  }
  return paramsObj;
} */

const ValidationIndicator = (props) => {
  // console.log(props);
  return (
    <div className="validation-indicator">
      <label className="validation-indicator__label">הסיסמה צריכה לכלול לפחות:</label>
      <ul className="validation-indicator__list">
        <li>
          <div className="validation-checkbox">
            <input id="letterIndicator" type="checkbox" disabled checked={props.hasLetter} />
            <label htmlFor="letterIndicator">אותיות</label>
          </div>
        </li>
        <li>
          <div className="validation-checkbox">
            <input id="numberIndicator" type="checkbox" disabled checked={props.hasNumeral} />
            <label htmlFor="numberIndicator">מספרים</label>
          </div>
        </li>
        <li>
          <div className="validation-checkbox">
            <input id="charIndicator" type="checkbox" disabled checked={props.hasSpecialChar} />
            <label htmlFor="charIndicator">אותיות גדולות</label>
          </div>
        </li>
      </ul>
    </div>
  )
}

class PasswordContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      data: {
        userId: '',
        code: '',
        Password: '',
        ConfirmPassword: ''
      },

      touched: {
        Password: false,
        ConfirmPassword: false
      },

      validity: {
        Password: false,
        ConfirmPassword: false
      },

      errors: {
        Password: '',
        ConfirmPassword: ''
      },

      formIsValid: false,
      formServerOK: true,
      formServerError: "",

      contactingServer: false

      // tooltipOpen: false
    }

    // this.toggleTooltip = this.toggleTooltip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleTextInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ data: { ...this.state.data, [name]: value } },
      () => { this.validateUserInput(name, value) });
  }

  validateUserInput(fieldName, value) {
    let fieldValidationErrors = this.state.errors;
    let fieldValidity = this.state.validity;

    switch (fieldName) {
      case "Password":
        if (!isRequired(value)) {
          fieldValidity.Password = false;
          fieldValidationErrors.Password = "שדה חובה"
        } else if (!isValidPassword(value)) {
          fieldValidity.Password = false;
          fieldValidationErrors.Password = 'עלייך לבחור סיסמא בת 8-12 תווים כולל אותיות וספרות';
        } else {
          fieldValidity.Password = true;
          fieldValidationErrors.Password = "";
        }
        break
      case "ConfirmPassword":
        if (!isRequired(value)) {
          fieldValidity.ConfirmPassword = false;
          fieldValidationErrors.ConfirmPassword = "שדה חובה"
        } else if (!isConfirmedPassword(value, this.state.data.Password)) {
          fieldValidity.ConfirmPassword = false;
          fieldValidationErrors.ConfirmPassword = 'אין התאמה בין 2 הסיסמאות';
        } else {
          fieldValidity.ConfirmPassword = true;
          fieldValidationErrors.ConfirmPassword = "";
        }
        break
      default:
        break;
    }
    this.setState({
      validity: fieldValidity,
      errors: fieldValidationErrors
    }, this.validateForm);
  }

  validateForm() {
    let currentFormIsValid = true;
    for (let status of Object.values(this.state.validity)) {
      console.log(status);
      currentFormIsValid = status && currentFormIsValid;
      if (!currentFormIsValid) break
    }
    this.setState({ formIsValid: currentFormIsValid });
    console.log(this.state.validity, this.state.errors)
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      contactingServer: true
    });

    let currentSignupURL = setPasswordURL;

    let data = JSON.stringify(this.state.data);
    console.log("current form data is: " + data);
    // console.log(this.props);
    // this.props.history.push('/thanks');

    fetch(currentSignupURL, {
      method: 'POST',
      body: data,
      // mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          console.log(response)
          this.setState({ formServerOK: false });
          if (response.status === 401) {
            this.setState({ formServerError: "אסימון לא חוקי או שפג תוקפו" });
          }
          if (response.status === 400) {
            this.setState({ formServerError: "Bad request" });
          }
          throw Error(response.statusText);
        }
        this.setState({
          formServerOK: true,
          formServerError: "",
          contactingServer: false
        });
        return response.json()
      })
      .then(respJson => {
        this.setToken(respJson);
        console.log('Success: ', respJson);
        this.props.history.push('/verify-phone');
      })
      .catch(errorStatus => {
        console.error(errorStatus);
        console.log(errorStatus);
        this.setState({
          formServerOK: false,
          contactingServer: false
        });
      });
  }

  setToken(idToken) {
    // Saves user token to localStorage
    sessionStorage.setItem('homei_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return sessionStorage.getItem('homei_token');
  }

  logout() {
    // Clear user token and profile data from localStorage
    sessionStorage.removeItem('homei_token');
  }

  handleBlur(event) {
    const name = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });
    this.validateUserInput(name, event.target.value);
    console.log(this.state.touched);
  }

  componentDidMount() {
    // let confirmationParams = getQueryStringParams(this.props.location.search);
    let getURL = emailConfirmationURL + this.props.location.search;
    console.log("mounted", getURL);
    // this.setState({data: { ...this.state.data,
    //   userId: confirmationParams.userId,
    //   code: confirmationParams.code
    // }});
    // console.log("mounted data: ", this.state.data);

    fetch(getURL, {
      method: 'GET'
    })
    .then(response => {
      if (!response.ok) {
        console.log(response)
        this.setState({ formServerOK: false });
        if (response.status === 401) {
          this.setState({ formServerError: "אסימון לא חוקי או שפג תוקפו" });
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
        data: {
          ...this.state.data,
          userId: respJson.UID,
          code: respJson.CODE
        }
      });
    })
    .catch(error => {
      console.error('Error: ', error);
      setTimeout(() => {
        this.props.history.push('/signup');
      }, 3000);
    })
  }

  componentDidUpdate() {
    console.log("updated");
  }

  render() {
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">בחירת סיסמה</h1>

        <Form id="verifyForm" className="login-form login-form--narrow" onSubmit={this.handleSubmit} noValidate>
          <FormGroup>
            <Input 
              id="Password" 
              type="password" 
              name="Password" 
              autoComplete="new-password" 
              required 
              className="form-control placehlder-label" 
              value={this.state.data.Password}
              onChange={this.handleTextInput}
              onBlur={this.handleBlur} 
            />
            <Label htmlFor="Password" className="login-form__label">*בחירת סיסמה</Label>
            <button id="formTooltipToggle" type="button" className="login-form__tooltip-btn">?</button>
            <UncontrolledTooltip placement="left" target="formTooltipToggle"  container=".form-group">
              הסיסמה צריכה לכלול 8 עד 12 תווים בלועזית, אות גדולה וספרה אחת לפחות
            </UncontrolledTooltip>
            {!this.state.validity.Password && this.state.touched.Password && <label className="error">{this.state.errors.Password}</label>}
          </FormGroup>

          <ValidationIndicator hasLetter={hasLetter(this.state.data.Password)} hasNumeral={hasNumber(this.state.data.Password)} hasSpecialChar={hasCapital(this.state.data.Password)} />

          <FormGroup>
            <Input 
              id="ConfirmPassword" 
              type="password" 
              name="ConfirmPassword" 
              autoComplete="new-password" 
              required 
              className="form-control placehlder-label" 
              value={this.state.data.ConfirmPassword}
              onChange={this.handleTextInput}
              onBlur={this.handleBlur} 
            />
            <Label htmlFor="ConfirmPassword" className="login-form__label">*הקלד סיסמה בשנית</Label>
            {!this.state.validity.ConfirmPassword && this.state.touched.ConfirmPassword && <label className="error">{this.state.errors.ConfirmPassword}</label>}
          </FormGroup>

          <div className="login-form__footer">
            {!this.state.formServerOK && <label className="error error--form-level">{this.state.formServerError}</label>}
            <Button type="submit" disabled={!this.state.formIsValid || this.state.contactingServer} className="login-form__submit">
              {this.state.contactingServer && <Spinner className="login-form__spinner-elem" />}
              שמירה והמשך
            </Button>
          </div>
        </Form>
      </div>
    )
  }
};

export default withRouter(PasswordContent);
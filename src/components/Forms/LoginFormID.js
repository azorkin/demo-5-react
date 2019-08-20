import React from 'react';
import { Button, Label, FormGroup, Form, Input } from 'reactstrap';
// import { Control, LocalForm, Errors, Fieldset } from 'react-redux-form';
import { Link, withRouter } from "react-router-dom";

// API URLs
const loginRequestURL = 'https://10.7.7.134/api/Token/otp/request';

// Validation rules
const isRequired = (val) => !!(val && val.length);
const isValidEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val);
const isValidPassword = (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{6,12}$/.test(val);
const isValidDate = (val) => /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/.test(val)
const isValidId = (val) => {
  var IDnum = String(val);

  // Validate correct input
  if ((IDnum.length > 9) || (IDnum.length < 5))
    return false;
  if (isNaN(IDnum))
    return false;

  // The number is too short - add leading 0000
  if (IDnum.length < 9) {
    while (IDnum.length < 9) {
      IDnum = '0' + IDnum;
    }
  }

  // CHECK THE ID NUMBER
  var mone = 0, incNum;
  for (var i = 0; i < 9; i++) {
    incNum = Number(IDnum.charAt(i));
    incNum *= (i % 2) + 1;
    if (incNum > 9)
      incNum -= 9;
    mone += incNum;
  }
  if (mone % 10 == 0)
    return true;
  else
    return false;
}


class LoginFormID extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      data: {
        CaptchaKey: 'dummystring',
        TZ: '',
        DateOfBirth: ''
      },

      touched: {
        TZ: false,
        DateOfBirth: false
      },

      validity: {
        TZ: false,
        DateOfBirth: false
      },

      errors: {
        TZ: '',
        DateOfBirth: ''
      },

      formIsValid: false,
      formServerOK: true,
      formServerError: ""
    };

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
      case "TZ":
        if (!isRequired(value)) {
          fieldValidity.TZ = false;
          fieldValidationErrors.TZ = "שדה חובה"
        } else if (!isValidId(value)) {
          fieldValidity.TZ = false;
          fieldValidationErrors.TZ = 'נא למלא תעודת זהות/ דרכון'
        } else {
          fieldValidity.TZ = true;
          fieldValidationErrors.TZ = "";
        }
        break
      case "DateOfBirth":
        if (!isRequired(value)) {
          fieldValidity.DateOfBirth = false;
          fieldValidationErrors.DateOfBirth = "נא למלא תאריך לידה"
        } else if (!isValidDate(value)) {
          fieldValidity.DateOfBirth = false;
          fieldValidationErrors.DateOfBirth = 'פרטי המשתמש שגויים';
        } else {
          fieldValidity.DateOfBirth = true;
          fieldValidationErrors.DateOfBirth = "";
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

    let currentSignupURL = loginRequestURL;
    
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
        this.setState({formServerOK: false});
        if (response.status === 401) {
          this.setState({ formServerError: "שם משתמש או סיסמה שגויים"});
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
      this.props.history.push('/thanks');
    })
    .catch(error => console.error('Error: ', error))
  }

  handleBlur(event) {
    const name = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });
    this.validateUserInput(name, event.target.value);
    console.log(this.state.touched);
  }

  render() {

    return (
      <Form id="loginFormID" className="login-form" onSubmit={this.handleSubmit} noValidate>
        <input type="hidden" name="captchaKey" value={this.state.data.captchaKey} />
        <FormGroup>
          <Input 
            type="text" 
            id="TZ" 
            name="TZ" 
            className="placehlder-label" 
            value={this.state.data.TZ} 
            onChange={this.handleTextInput}
            onBlur={this.handleBlur} 
            required 
          />
          <Label htmlFor="TZ" className="login-form__label">*תעודת זהות</Label>
          {!this.state.validity.TZ && this.state.touched.TZ && <label className="error">{this.state.errors.TZ}</label>}
        </FormGroup>
        <FormGroup>
          <Input 
            type="text" 
            id="DateOfBirth" 
            name="DateOfBirth" 
            className="form-control placehlder-label" 
            value={this.state.data.DateOfBirth}
            onChange={this.handleTextInput}
            onBlur={this.handleBlur} 
            required 
          />
          <Label htmlFor="DateOfBirth" className="login-form__label">*תאריך לידה</Label>
          {!this.state.validity.DateOfBirth && this.state.touched.DateOfBirth && <label className="error">{this.state.errors.DateOfBirth}</label>}
        </FormGroup>

        <div className="login-form__footer">
          {!this.state.formServerOK && <label className="error">{this.state.formServerError}</label>}
          <Button type="submit" className="login-form__submit" disabled={!this.state.formIsValid}>
            כניסה
          </Button>
          <p className="login-form__footer-text">
            אין לכם חשבון?{" "}
            <Link to="/signup">הירשמו עכשיו</Link>
          </p>
        </div>
      </Form>
    )
  }
}

export default withRouter(LoginFormID);
import React from 'react';
import { Button, Label, FormGroup, Form, Input } from 'reactstrap';
// import { Control, LocalForm, Errors, Fieldset } from 'react-redux-form';
import { Link, withRouter } from "react-router-dom";

// API URLs
const loginRequestURL = 'https://10.7.7.134/api/token';

// Validation rules
const isRequired = (val) => !!(val && val.length);
const isValidEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val);
const isValidPassword = (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{8,12}$/.test(val);


class LoginFormUser extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      data: {
        CaptchaKey: 'dummystring',
        Username: '',
        Password: ''
      },

      touched: {
        Username: false,
        Password: false
      },

      validity: {
        Username: false,
        Password: false
      },

      errors: {
        Username: '',
        Password: ''
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
      case "Username":
        if (!isRequired(value)) {
          fieldValidity.Username = false;
          fieldValidationErrors.Username = "שדה חובה"
        } else if (!isValidEmail(value)) {
          fieldValidity.Username = false;
          fieldValidationErrors.Username = 'נא למלא אימייל'
        } else {
          fieldValidity.Username = true;
          fieldValidationErrors.Username = "";
        }
        break
      case "Password":
        if (!isRequired(value)) {
          fieldValidity.Password = false;
          fieldValidationErrors.Password = "נא להקיש את סיסמתך"
        } else if (!isValidPassword(value)) {
          fieldValidity.Password = false;
          fieldValidationErrors.Password = 'עלייך לבחור סיסמא בת 8-12 תווים כולל אותיות וספרות';
        } else {
          fieldValidity.Password = true;
          fieldValidationErrors.Password = "";
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
    // console.log(this.state.touched);
  }

  render() {

    return (
      <Form id="loginFormUser" className="login-form" onSubmit={this.handleSubmit} noValidate>
        <input type="hidden" name="captchaKey" value={this.state.data.captchaKey} />
        <FormGroup>
          <Input 
            type="email" 
            id="Username" 
            name="Username" 
            className="placehlder-label" 
            value={this.state.data.Username} 
            onChange={this.handleTextInput}
            onBlur={this.handleBlur} 
            required 
          />
          <Label htmlFor="Username" className="login-form__label">*דואר אלקטרוני</Label>
          {!this.state.validity.Username && this.state.touched.Username && <label className="error">{this.state.errors.Username}</label>}
        </FormGroup>
        <FormGroup>
          <Input 
            type="password" 
            id="Password" 
            name="Password" 
            className="form-control placehlder-label" 
            value={this.state.data.Password}
            onChange={this.handleTextInput}
            onBlur={this.handleBlur} 
            required 
          />
          <Label htmlFor="Password" className="login-form__label">*סיסמה</Label>
          {!this.state.validity.Password && this.state.touched.Password && <label className="error">{this.state.errors.Password}</label>}
          <div className="text-left">
            <a href="#forgottenPassword">שכחתי סיסמה</a>
          </div>
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

export default withRouter(LoginFormUser);
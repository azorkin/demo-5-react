import React from 'react';
import { Button, Label, Row, Col, FormGroup, Form, Input } from 'reactstrap';
// import { Control, LocalForm, Errors, Fieldset } from 'react-redux-form';
import { Link, withRouter } from "react-router-dom";

// API URLs
const loginRequestURL = 'https://10.7.7.134/api/token';

// Validation rules
const isRequired = (val) => !!(val && val.length);
const hasLetterA = (val) => val.indexOf("A") > 0;
const isValidEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(val);
const isValidPhone = (val) => /^\+?(972|0)(-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/i.test(val);

const validateTextInput = (value, validators) => {
  let isValid = true;
  for (let index = 0; index < validators.length; index++) {
    isValid = isValid && validators[index](value)
  }
  return isValid
}


// Custom error label component
const ErrorLabel = (props) => {
  console.log(props);
  return (
    <label htmlFor={props.forId} className="error">
      {props.children}
    </label>
  )
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loginMode: this.props.mode || '',

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

      formIsValid: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
  }

  setFormValidityState() {
    for (var status in this.state.validity ) {
      if (status === false) return false
    }
    return true
  }

  handleModeChange(event) {
    // console.log(event.target.value);
    this.setState({
      loginMode: event.target.value
    });
    this.props.history.push('/signup/' + event.target.value);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      // [name]: value
      data: {...this.state.data, [name]: value}
    });

    // console.log(validateTextInput(value, [isRequired, hasLetterA]));
    console.log(event.target, this.props);

    this.setState({
      validity: { ...this.state.validity, [name]: validateTextInput(value, [isRequired, hasLetterA])}
    });

    this.setState({formIsValid: this.setFormValidityState()});

    console.log("form is valid?" + this.state.formIsValid);
  }

  handleSubmit(event) {
    event.preventDefault();
    
    let data = JSON.stringify(this.state.data);
    console.log("current form data is: " + data);
    // console.log(this.props);
    // this.props.history.push('/thanks');

    fetch(loginRequestURL, {
      method: 'POST',
      body: data,
      // mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json()
    })
    .then(response => console.log('Success: ', response))
    .catch(error => console.error('Error: ', error))
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  }

  componentDidUpdate() {
    console.log("component updated");
  }

  componentDidMount() {
    console.log("component mounted");
  }
  
  static getDerivedStateFromProps(props, state) {
    if (state.loginMode !== props.mode ) {
      return { loginMode: props.mode }
    }
    return null
  }

  render() {

    console.log("state: ", this.state.loginMode, "props: ", this.props.mode);
    return (
      <Form id="loginForm" className="login-form" onSubmit={this.handleSubmit} noValidate>
        <Input type="hidden" name="captchaKey" value={this.state.data.captchaKey} />
        <div className="login-form__switch" aria-label="choose login mode">
          <div className="login-form__switch-item homei-switch">
            <input 
              type="radio" 
              id="investor-mode" 
              name="login-mode" 
              value="investor" 
              checked={this.state.loginMode === "investor"}
              onChange={this.handleModeChange}
            />
            <Label htmlFor="investor-mode">אני רוצה להשקיע</Label>
          </div>
          <div className="login-form__switch-item homei-switch">
            <input 
              type="radio" 
              id="borrower-mode" 
              name="login-mode" 
              value="borrower" 
              checked={this.state.loginMode === "borrower"}
              onChange={this.handleModeChange}
            />
            <Label htmlFor="borrower-mode">אני רוצה <span className='desktop-inline'>לבקש </span>הלוואה</Label>
          </div>
        </div>
        <FormGroup>
          <Input 
            type="email" 
            id="Username" 
            name="Username" 
            className="form-control placehlder-label" 
            value={this.state.data.Username} 
            onChange={this.handleInputChange}
            validators={[isRequired]} 
            required 
          />
          <Label htmlFor="Username" className="login-form__label">*דואר אלקטרוני</Label>
        </FormGroup>
        <FormGroup>
          <Input 
            type="password" 
            id="Password" 
            name="Password" 
            className="form-control placehlder-label" 
            value={this.state.data.Password}
            onChange={this.handleInputChange}
            required 
            autoComplete="current-password"
          />
          <Label htmlFor="Password" className="login-form__label">*שם משפחה</Label>
        </FormGroup>

        <div className="login-form__footer">
          <Button type="submit" className="login-form__submit" disabled={!this.state.formIsValid}>
            הרשמה
          </Button>
          <p className="login-form__footer-text">
            נרשמתם כבר?{" "}
            <Link to="/login">היכנסו מכאן</Link>
          </p>
        </div>
      </Form>
    )
  }
}

export default withRouter(LoginForm);
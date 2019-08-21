import React from 'react';
import { Button, Label, FormGroup, Form, Input, Row, Col } from 'reactstrap';
// import { Switch, Route, Redirect } from 'react-router-dom';

// API URLs
const verifyPhoneURL = "https://10.7.7.134/api/Token/otp";

// Validation rules
const isRequired = (val) => !!(val && val.length);
const isValidNumber = (val) => /^\d{4}$/.test(val);

class VerifyPhoneContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      data: {
        CaptchaKey: 'dummystring',
        TZ: '',
        DateOfBirth: '',
        Code: ''
      },

      touched: {
        Code: false
      },

      validity: {
        Code: false
      },

      errors: {
        Code: ''
      },

      formIsValid: false,
      formServerOK: true,
      formServerError: ""
    }

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
      case "Code":
        if (!isRequired(value)) {
          fieldValidity.Code = false;
          fieldValidationErrors.Code = "נא למלא את הקוד שקיבלת בSMS";
        } else if (!isValidNumber(value)) {
          fieldValidity.Code = false;
          fieldValidationErrors.Code = 'קוד לא תקין, נסה שנית או לחץ לשליחה מחדש';
        } else {
          fieldValidity.Code = true;
          fieldValidationErrors.Code = "";
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

    let currentSignupURL = verifyPhoneURL;

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
          formServerError: ""
        });
        return response.json()
      })
      .then(respJson => {
        console.log('Success: ', respJson);
        this.props.history.push('/thanks');
      })
      .catch(error => {
        console.error('Error: ', error);
        this.props.history.push('/error');
      })
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
    // console.log("mounted");
    // let confirmationParams = getQueryStringParams(this.props.location.search);
    // this.setState({data: { ...this.state.data,
    //   TZ: confirmationParams.userId,
    //   DateOfBirth: confirmationParams.code
    // }});
    // console.log("mounted data: ", this.state.data);
  }

  render() {
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">אימות מספר טלפון</h1>
        <p class="login-content__lead">נכנסים לאזור האישי עם הקוד ששלחנו ב-sms למספר <a href="tel:0548097654">054-8097654</a></p>

        <Form id="verifyPhoneForm" className="login-form" onSubmit={this.handleSubmit} noValidate>
          <Row className="login-form__row">
            <Col md="6" className="login-form__col">
              <FormGroup className="form-group--no-padding">
                <Input 
                  id="Code" 
                  type="text" 
                  name="Code" 
                  required 
                  className="form-control placehlder-label" 
                  value={this.state.data.Code}
                  onChange={this.handleTextInput}
                  onBlur={this.handleBlur} 
                />
                <Label htmlFor="Code" className="login-form__label">*בחירת סיסמה</Label>
                {!this.state.validity.Code && this.state.touched.Code && <label className="error">{this.state.errors.Code}</label>}
              </FormGroup>
              <p class="login-form__text">לא קיבלתי קוד, <a href="#">שלחו לי שוב</a></p>
            </Col>
          </Row>

          <div className="login-form__footer">
            {!this.state.formServerOK && <label className="error">{this.state.formServerError}</label>}
            <Button type="submit" disabled={!this.state.formIsValid} className="login-form__submit">המשך להגשת בקשה</Button>
            <p class="login-form__footer-text"><a href="#">דלג להגשת הבקשה</a></p>
          </div>
        </Form>
      </div>
    )
  }
};

export default VerifyPhoneContent;
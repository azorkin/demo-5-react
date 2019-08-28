import React from 'react';
import { Button, Label, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { isRequired, isValidEmail } from "../../shared/Validation";


// API URLs
const resetPasswordURL = "https://10.7.7.134/api/Account/password/reset/request";

class ForgotPasswordForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      data: {
        CaptchaKey: 'dummystring',
        Email: ''
      },

      touched: {
        Email: false
      },

      validity: {
        Email: false
      },

      errors: {
        Email: ''
      },

      formIsValid: false,
      formServerOK: true,
      formServerError: "",
      formSubmittedSuccess: false
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
      case "Email":
        if (!isRequired(value)) {
          fieldValidity.Email = false;
          fieldValidationErrors.Email = "שדה חובה"
        } else if (!isValidEmail(value)) {
          fieldValidity.Email = false;
          fieldValidationErrors.Email = 'נא למלא אימייל'
        } else {
          fieldValidity.Email = true;
          fieldValidationErrors.Email = "";
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

    let data = JSON.stringify(this.state.data);
    console.log("current form data is: " + data);

    let fetchURL = resetPasswordURL;
    
    fetch(fetchURL, {
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
            this.setState({ formServerError: "פרטי המשתמש שגויים. להרשמה לחץ כאן" });
          } else if (response.status === 403) {
            this.setState({ formServerError: 'חשבון משתמש נעול נא ליצור קשר עם שירות הלקוחות'});
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
          formSubmittedSuccess: true
        });
        // this.props.history.push('/thanks');
      })
      .catch(error => {
        console.error('Error: ', error);
        // this.props.history.push('/error');
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

  render() {

    if (this.state.formSubmittedSuccess) {

      return (
        <p>קישור לאיפוס סיסמה נשלח לכתובת הדוא"ל: {this.state.data.Email}.</p>
      )

    } else {

      return (
        <Form id="verifyPhoneForm" className="login-form" onSubmit={this.handleSubmit} noValidate>
          <Row className="login-form__row">
            <Col md="6" className="login-form__col">

              <FormGroup className="form-group--no-padding">
                <Input 
                  id="Email" 
                  type="text" 
                  name="Email" 
                  required 
                  className="form-control placehlder-label" 
                  value={this.state.data.Email}
                  onChange={this.handleTextInput}
                  onBlur={this.handleBlur} 
                />
                <Label htmlFor="Email" className="login-form__label">*דואר אלקטרוני</Label>
                {!this.state.validity.Email && this.state.touched.Email && <label className="error">{this.state.errors.Email}</label>}
              </FormGroup>
              {/* <p className="login-form__text">לא קיבלתי קוד, <a href="#1">שלחו לי שוב</a></p> */}

              <div className="login-form__footer">
                {!this.state.formServerOK && <label className="error">{this.state.formServerError}</label>}

                <Button type="submit" disabled={!this.state.formIsValid} className="login-form__submit">אפס סיסמה</Button>

              </div>

            </Col>
          </Row>
        </Form>
      )
    }
  }
};

export default withRouter(ForgotPasswordForm);
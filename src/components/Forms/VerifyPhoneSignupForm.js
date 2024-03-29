import React from 'react';
import { Button, Label, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { isRequired, isValidCode } from "../../shared/Validation";
import HomeiAPI from "../../shared/HomeiAPI";
import Spinner from "../Spinner";


// API URLs
const {verifyPhoneURLSignup} = HomeiAPI;

class VerifyPhoneForm extends React.Component {

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
      formServerError: "",

      contactingServer: false
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
        } else if (!isValidCode(value)) {
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

  getToken() {
    // Retrieves the user token from localStorage
    return sessionStorage.getItem('homei_token');
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      contactingServer: true
    });

    let data = JSON.stringify(this.state.data);
    console.log("current form data is: " + data);

    let currentSignupURL = verifyPhoneURLSignup + this.state.data.Code;
    let currentToken = this.getToken();

    fetch(currentSignupURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + currentToken
      }
    })
      .then(response => {
        if (!response.ok) {
          console.log(response)
          this.setState({ 
            formServerOK: false,
            contactingServer: false
          });
          if (response.status === 401) {
            this.setState({ formServerError: "קוד לא תקין, נסה שנית או לחץ לשליחה מחדש" });
          }
          if (response.status === 403) {
            this.setState({ formServerError: "פג תוקפו של הקוד. לחץ לשליחה מחדש" });
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
        console.log('Success: ', respJson);
        this.props.history.push('/choose-account');
      })
      .catch(error => {
        console.error('Error: ', error);
        this.setState({
          formServerOK: false,
          // formServerError: error,
          contactingServer: false
        });
        setTimeout(() => {
          this.props.history.push('/login');
        }, 3000);
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
    // const currentData = this.state.data;
    // currentData.TZ = this.props.currentTZ;
    // currentData.DateOfBirth = this.props.currentDoB;
    // this.setState({
    //   data: currentData
    // });
  }

  render() {
    return (
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
              <Label htmlFor="Code" className="login-form__label">*קוד אימות</Label>
              {!this.state.validity.Code && this.state.touched.Code && <label className="error">{this.state.errors.Code}</label>}
            </FormGroup>
            <p className="login-form__text">לא קיבלתי קוד, <a href="#1" onClick={this.props.resendCode}>שלחו לי שוב</a></p>

            <div className="login-form__footer">
              {!this.state.formServerOK && <label className="error">{this.state.formServerError}</label>}

              <Button type="submit" disabled={!this.state.formIsValid || this.state.contactingServer} className="login-form__submit">
                {this.state.contactingServer && <Spinner className="login-form__spinner-elem" />}
                המשך להגשת בקשה
              </Button>

              <p className="login-form__footer-text"><Link to="/choose-account">דלג להגשת הבקשה</Link></p>
            </div>

          </Col>
        </Row>
      </Form>
    )
  }
};

export default withRouter(VerifyPhoneForm);
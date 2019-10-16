import React from 'react';
import { Button, Label, FormGroup, Form, Input, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Reaptcha from "reaptcha";
import { isRequired, isValidCode } from "../../shared/Validation";
import HomeiAPI from "../../shared/HomeiAPI";
import Spinner from "../Spinner";


// API URLs
const {verifyPhoneURLLogin, requestVerifyPhoneURL} = HomeiAPI;

class VerifyPhoneLoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.captcha = null;

    this.state = {

      data: {
        captchaKey: '',
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

      contactingServer: false,
      hiddenCaptchaVerified: false,
      isRequestingVerification: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.requestVerification = this.requestVerification.bind(this);

    this.onCaptchaVerify = this.onCaptchaVerify.bind(this);
    this.onCaptchaExpire = this.onCaptchaExpire.bind(this);
    this.captchaReset = this.captchaReset.bind(this);
  }

  requestVerification(event) {
    if (event) {
      event.preventDefault();
    }

    this.setState({
      isRequestingVerification: true,
      data: {...this.state.data, Code: ''},
      validity: { Code: false },
      formIsValid: false
    });

    if (this.state.data.captchaKey === "") {
      this.captcha.execute();
      return
    }

    const fetchURL = requestVerifyPhoneURL;

    let data = JSON.stringify(this.state.data);
    // this.captcha.execute();
    console.log(data);

    if (true) {
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
            this.setState({ formServerError: 'אחד או יותר מהנתונים שהזנת לא תקינים' });
          }
          throw Error(response.statusText);
        }
        this.setState({
          isRequestingVerification: false,
          formServerOK: true,
          formServerError: ""
        });
        return response.text();
      })
      .then(respText => {
        console.log('Success: ', respText);
      })
      .catch(error => {
        console.error('Error: ', error);
        this.setState({
          isRequestingVerification: false
        });
        this.captchaReset();
        // this.props.history.push('/error');
      });
    }
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
    // console.log(this.state.validity, this.state.errors)
  }

  onCaptchaVerify(token) {
    console.log(token);
    this.setState({
      hiddenCaptchaVerified: true,
      data: { ...this.state.data, captchaKey: token }
    }, () => {
      if (this.state.contactingServer) {
        this.handleSubmit();
      };
      if (this.state.isRequestingVerification) {
        this.requestVerification();
      };
    });
  }

  onCaptchaExpire() {
    console.log("captcha expired");
    this.captchaReset();
  }

  captchaReset() {
    this.captcha.reset();
    console.log("captcha is reset");
    this.setState({
      hiddenCaptchaVerified: false,
      data: { ...this.state.data, captchaKey: '' }
    });
  }

  setToken(idToken) {
    // Saves user token to sessionStorage
    sessionStorage.setItem('homei_token', idToken);
  }

  getToken() {
    // Retrieves the user token from sessionStorage
    return sessionStorage.getItem('homei_token');
  }

  logout() {
    // Clear user token and profile data from sessionStorage
    sessionStorage.removeItem('homei_token');
  }

  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      contactingServer: true,
      // data: {...this.state.data, captchaKey: recaptchaValue}
    });

    if (this.state.data.captchaKey === "") {
      this.captcha.execute();
      return
    }
    console.log(this.captcha, this.state.data.captchaKey);

    let currentSignupURL = verifyPhoneURLLogin;
    
    let data = JSON.stringify(this.state.data);
    console.log("current form data is: " + data);

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
        console.log(response.status)
        throw response.status;
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
      this.props.history.push('/choose-account');
    })
    .catch(errorStatus => {
      console.error(errorStatus);
      this.setState({
        formServerOK: false,
        contactingServer: false
      });
      if (errorStatus === 401) {
        this.setState({ formServerError: "קוד לא תקין, נסה שנית או לחץ לשליחה מחדש" });
      }
      else if (errorStatus === 403) {
        this.setState({ formServerError: "פג תוקפו של הקוד. לחץ לשליחה מחדש" });
      }
      this.captchaReset();
      /* this.setState({
        formServerOK: false,
        // formServerError: error,
        contactingServer: false
      }); */
      // this.captchaReset();
      // this.props.history.push('/error');
    });

  }

  handleBlur(event) {
    const name = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });
    this.validateUserInput(name, event.target.value);
    // console.log(this.state.touched);
  }

  componentDidMount() {
    const currentData = this.state.data;
    currentData.TZ = this.props.currentTZ;
    currentData.DateOfBirth = this.props.currentDoB;
    this.setState({
      data: currentData
    });
  }

  render() {
    return (
      <Form id="verifyPhoneForm" className="login-form" onSubmit={this.handleSubmit} noValidate>
        <Row className="login-form__row justify-content-center">
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
            <p className="login-form__text">לא קיבלתי קוד, <a href="#1" onClick={this.requestVerification}>שלחו לי שוב</a></p>

            <div className="login-form__footer">
              <Reaptcha
                ref={e => (this.captcha = e)}
                id="verify-phone-captcha"
                size="invisible"
                isolated="true"
                sitekey={HomeiAPI.recaptchaUserKey}
                onVerify={this.onCaptchaVerify}
                onExpire={this.onCaptchaExpire} 
                hl="iw"
              />

              {!this.state.formServerOK && <label className="error">{this.state.formServerError}</label>}

              <Button type="submit" disabled={!this.state.formIsValid || this.state.contactingServer} className="login-form__submit">
                {this.state.contactingServer && <Spinner className="login-form__spinner-elem" />}
                המשך להגשת בקשה
                </Button>

            </div>

          </Col>
        </Row>
      </Form>
    )
  }
};

export default withRouter(VerifyPhoneLoginForm);
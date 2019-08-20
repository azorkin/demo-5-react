import React from 'react';
import { Button, Label, Row, Col, FormGroup, Form, Input } from 'reactstrap';
// import { Control, LocalForm, Errors, Fieldset } from 'react-redux-form';
import { Link, withRouter } from "react-router-dom";

// API URLs
const investorSignupRequestURL = 'https://10.7.7.134/api/Investor/_signup';
const borrowerSignupRequestURL = 'https://10.7.7.134/api/Borrower/_signup';


// Validation rules
const isRequired = (val) => !!(val && val.length);
const isValidEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val);
const isValidPhone = (val) => /^\+?(972|0)(-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(val);


class InvestorSignupForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loginMode: this.props.mode || '',

      data: {
        captchaKey: 'dummystring',
        firstName: '',
        lastName: '',
        Email: '',
        mobilePhone: '',
        isConfirmTermsAccountType: false,
        isConfirmLoanAgreementProject: false,
        isConfirmTransactionPermit: false,
        isConfirm4: false
      },

      touched: {
        firstName: false,
        lastName: false,
        Email: false,
        mobilePhone: false,
        isConfirmTermsAccountType: false,
        isConfirmLoanAgreementProject: false,
        isConfirmTransactionPermit: false,
        isConfirm4: false
      },

      validity: {
        firstName: false,
        lastName: false,
        Email: false,
        mobilePhone: false,
        isConfirmTermsAccountType: false,
        isConfirmLoanAgreementProject: false,
        isConfirmTransactionPermit: false,
        isConfirm4: false
      },

      errors: {
        firstName: '',
        lastName: '',
        Email: '',
        mobilePhone: '',
        isConfirmTermsAccountType: '',
        isConfirmLoanAgreementProject: '',
        isConfirmTransactionPermit: '',
        isConfirm4: ''
      },

      formIsValid: false

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleBlurCheckbox = this.handleBlurCheckbox.bind(this);
  }

  handleModeChange(event) {
    console.log(event.target.value);
    this.setState({
      loginMode: event.target.value
    });
    this.props.history.push('/signup/' + event.target.value);
  }

  handleCheckbox(event) {
    const name = event.target.name;
    const checkedState = event.target.checked;
    this.setState({ data: { ...this.state.data, [name]: checkedState } },
      () => { this.validateCheckboxes(name, checkedState) });
  }

  validateCheckboxes(checkboxName, checkedState) {
    let fieldValidationErrors = this.state.errors;
    let fieldValidity = this.state.validity;

    if (checkedState === false) {
      fieldValidity[checkboxName] = false;
      fieldValidationErrors[checkboxName] = "שדה חובה";
    } else {
      fieldValidity[checkboxName] = true;
      fieldValidationErrors[checkboxName] = "";
    }
    this.setState({
      validity: fieldValidity,
      errors: fieldValidationErrors
    }, this.validateForm);
  }

  handleBlurCheckbox(event) {
    const name = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });
    this.validateCheckboxes(name, event.target.checked);
    console.log(this.state.touched);
  }

  handleTextInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ data: { ...this.state.data, [name]: value }},
                  () => { this.validateUserInput(name, value) });
  }

  validateUserInput(fieldName, value) {
    let fieldValidationErrors = this.state.errors;
    let fieldValidity = this.state.validity;

    switch(fieldName) {
      case "firstName":
        if (!isRequired(value)) {
          fieldValidity.firstName = false;
          fieldValidationErrors.firstName = "שדה חובה"
        } else {
          fieldValidity.firstName = true;
          fieldValidationErrors.firstName = "";
        }
        break
      case "lastName":
        if ( !isRequired(value) ) {
          fieldValidity.lastName = false;
          fieldValidationErrors.lastName = "שדה חובה"
        } else {
          fieldValidity.lastName = true;
          fieldValidationErrors.lastName = "";
        }
        break
      case "Email":
        if (!isRequired(value)) {
          fieldValidity.Email = false;
          fieldValidationErrors.Email = "שדה חובה"
        } else if (!isValidEmail(value)) {
          fieldValidity.Email = false;
          fieldValidationErrors.Email = 'דוא"ל לא תקין'
        } else {
          fieldValidity.Email = true;
          fieldValidationErrors.Email = "";
        }
        break
      case "mobilePhone":
        if (!isRequired(value)) {
          fieldValidity.mobilePhone = false;
          fieldValidationErrors.mobilePhone = "שדה חובה"
        } else if (!isValidPhone(value)) {
          fieldValidity.mobilePhone = false;
          fieldValidationErrors.mobilePhone = 'מספר לא תקין';
        } else {
          fieldValidity.mobilePhone = true;
          fieldValidationErrors.mobilePhone = "";
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
    console.log(this.state.validity , this.state.errors)
  }

  handleSubmit(event) {
    event.preventDefault();

    let currentSignupURL = investorSignupRequestURL;
    if (this.state.loginMode === 'borrower') {
      currentSignupURL = borrowerSignupRequestURL;
    }
    
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
        console.log(response.json())
        throw Error(response.statusText);
      }
      return response.json()
    })
    .then(respJson => {
      console.log('Success: ', respJson);
      // this.props.history.push('/thanks');
    })
    .catch(error => {
      console.error('Error: ', error)
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

  componentDidUpdate() {
    console.log("component updated");
  }

  componentDidMount() {
    console.log("component mounted");
  }
  
  // static getDerivedStateFromProps(props, state) {
  //   if (state.loginMode !== props.mode ) {
  //     return { loginMode: props.mode }
  //   }
  //   return null
  // }

  render() {
    // console.log("state: ", this.state.loginMode, "props: ", this.props.mode);
    let allCheckboxesChecked = this.state.validity.isConfirmTermsAccountType && this.state.validity.isConfirmLoanAgreementProject && this.state.validity.isConfirmTransactionPermit && this.state.validity.isConfirm4;

    let allCheckboxesTouched = this.state.touched.isConfirmTermsAccountType && this.state.touched.isConfirmLoanAgreementProject && this.state.touched.isConfirmTransactionPermit && this.state.touched.isConfirm4;

    let combinedCheckboxError = "יש לקרוא ולאשר את 4 ההצרות";

    return (
      <Form id="signupForm" className="login-form" onSubmit={this.handleSubmit} noValidate>
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
        <Row className="login-form__row">
          <Col md="6" className="login-form__col">
            <FormGroup>
              <Input 
                type="text" 
                id="firstName" 
                name="firstName" 
                className="form-control placehlder-label" 
                value={this.state.data.firstName} 
                onChange={this.handleTextInput}
                onBlur={this.handleBlur}
                required 
              />
              <Label htmlFor="firstName" className="login-form__label">*שם פרטי</Label>
              {!this.state.validity.firstName && this.state.touched.firstName && <label className="error">{this.state.errors.firstName}</label> }
              {/* {true && true && <label>error</label>} */}
            </FormGroup>
          </Col>
          <Col md="6" className="login-form__col">
            <FormGroup>
              <Input 
                type="text" 
                id="lastName" 
                name="lastName" 
                className="form-control placehlder-label" 
                value={this.state.data.lastName}
                onChange={this.handleTextInput}
                onBlur={this.handleBlur}
                required 
              />
              <Label htmlFor="lastName" className="login-form__label">*שם משפחה</Label>
              {!this.state.validity.lastName && this.state.touched.lastName && <label className="error">{this.state.errors.lastName}</label>}
            </FormGroup>
          </Col>
          <Col md="6" className="login-form__col">
            <FormGroup>
              <Input 
                type="email" 
                id="Email" 
                name="Email" 
                className="form-control placehlder-label" 
                value={this.state.data.Email}
                onChange={this.handleTextInput}
                onBlur={this.handleBlur}
                required 
              />
              <Label htmlFor="Email" className="login-form__label">*דואר אלקטרוני</Label>
              {!this.state.validity.Email && this.state.touched.Email && <label className="error">{this.state.errors.Email}</label>}
            </FormGroup>
          </Col>
          <Col md="6" className="login-form__col">
            <FormGroup>
              <Input 
                type="tel" 
                id="mobilePhone" 
                name="mobilePhone" 
                className="form-control placehlder-label" 
                value={this.state.data.mobilePhone}
                onChange={this.handleTextInput}
                onBlur={this.handleBlur}
                required 
              />
              <Label htmlFor="mobilePhone" className="login-form__label">*מספר נייד</Label>
              {!this.state.validity.mobilePhone && this.state.touched.mobilePhone && <label className="error">{this.state.errors.mobilePhone}</label>}
            </FormGroup>
          </Col>
        </Row>

        <div className="login-form__checkbox-group">
          <FormGroup className="homei-checkbox">
            <Input 
              type="checkbox" 
              id="cb1" 
              name="isConfirmTermsAccountType" 
              className="homei-checkbox__input" 
              value={this.state.data.isConfirmTermsAccountType}
              onChange={this.handleCheckbox}
              onBlur={this.handleBlurCheckbox} 
              required 
            />
            {this.state.loginMode === "borrower" && <label htmlFor="cb1" className="homei-checkbox__label">אני מאשר את <a href="https://www.home-invest.co.il/images/doc/%D7%94%D7%A1%D7%9B%D7%9D_%D7%94%D7%A6%D7%98%D7%A8%D7%A4%D7%95%D7%AA_%D7%9C%D7%95%D7%95%D7%94.pdf" target="_blank" rel="noopener noreferrer">תנאי הסכם הצטרפות לווה</a></label>}
            {this.state.loginMode === "investor" && <label htmlFor="cb1" className="homei-checkbox__label">אני מאשר את <a href="https://www.home-invest.co.il/images/doc/%D7%94%D7%A1%D7%9B%D7%9D_%D7%94%D7%A6%D7%98%D7%A8%D7%A4%D7%95%D7%AA_%D7%9E%D7%9C%D7%95%D7%95%D7%94.pdf" target="_blank" rel="noopener noreferrer">תנאי הסכם הצטרפות משקיע</a></label>}
          </FormGroup>
          <FormGroup className="homei-checkbox">
            <Input
              type="checkbox"
              id="cb2"
              name="isConfirmLoanAgreementProject"
              className="homei-checkbox__input"
              value={this.state.data.isConfirmLoanAgreementProject}
              onChange={this.handleCheckbox}
              onBlur={this.handleBlurCheckbox} 
              required
            />
            <label htmlFor="cb2" className="homei-checkbox__label">אני מאשר את <a href="https://www.home-invest.co.il/images/doc/%D7%94%D7%A1%D7%9B%D7%9D_%D7%94%D7%9C%D7%95%D7%95%D7%90%D7%94_%D7%91%D7%9E%D7%99%D7%96%D7%9D.pdf" target="_blank" rel="noopener noreferrer">תנאי הסכם הלואה במיזם</a></label>
          </FormGroup>
          <FormGroup className="homei-checkbox">
            <Input
              type="checkbox"
              id="cb3"
              name="isConfirmTransactionPermit"
              className="homei-checkbox__input"
              value={this.state.data.isConfirmTransactionPermit}
              onChange={this.handleCheckbox}
              onBlur={this.handleBlurCheckbox} 
              required
            />
            <label htmlFor="cb3" className="homei-checkbox__label">אני מאשר את <a href="https://www.home-invest.co.il/images/doc/%D7%94%D7%99%D7%AA%D7%A8_%D7%A2%D7%A1%D7%A7%D7%94.pdf" target="_blank" rel="noopener noreferrer">תנאי השימוש</a></label>
          </FormGroup>
          <FormGroup className="homei-checkbox">
            <Input
              type="checkbox"
              id="cb4"
              name="isConfirm4"
              className="homei-checkbox__input"
              value={this.state.data.isConfirm4}
              onChange={this.handleCheckbox}
              onBlur={this.handleBlurCheckbox} 
              required
            />
            <label htmlFor="cb4" className="homei-checkbox__label">אני מאשר את <a href="https://www.home-invest.co.il/%D7%AA%D7%A0%D7%90%D7%99-%D7%A9%D7%99%D7%9E%D7%95%D7%A9/" target="_blank" rel="noopener noreferrer">שטר היתר העסקה</a></label>
          </FormGroup>
          {!allCheckboxesChecked && allCheckboxesTouched && <label className="error">{combinedCheckboxError}</label>}
        </div>

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

export default withRouter(InvestorSignupForm);
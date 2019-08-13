import React from 'react';
import { Button, Label, Row, Col, FormGroup, Form, Input } from 'reactstrap';
// import { Control, LocalForm, Errors, Fieldset } from 'react-redux-form';
import { Link } from "react-router-dom";

// Validation rules
const isRequired = (val) => val && val.length;
const isValidEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(val);
const isValidPhone = (val) => /^\+?(972|0)(-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/i.test(val);


// Custom error label component

const ErrorLabel = (props) => {
  console.log(props);
  return (
    <label htmlFor={props.forId} className="error">
      {props.children}
    </label>
  )
}

class InvestorSignupForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loginMode: this.props.mode,

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
        email: false,
        mobilePhone: false,
        isConfirmTermsAccountType: false,
        isConfirmLoanAgreementProject: false,
        isConfirmTransactionPermit: false,
        isConfirm4: false
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      // [name]: value
      data: {...this.state.data, [name]: value}
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("current form data is: " + JSON.stringify(this.state.data));
    // const data = new FormData(event.target);

    // fetch('/api/form-submit-url', {
    //   method: 'POST',
    //   body: data,
    // });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  }
  

  render() {

    console.log("state: ", this.state.loginMode, "props: ", this.props.mode);
    return (
      <Form id="signupForm" className="login-form" onSubmit={this.handleSubmit} noValidate>
        <Input type="hidden" name="captchaKey" value={this.state.data.captchaKey} />
        <Row className="login-form__row">
          <Col md="6" className="login-form__col">
            <FormGroup>
              <Input 
                type="text" 
                id="firstName" 
                name="firstName" 
                className="form-control placehlder-label" 
                value={this.state.data.firstName} 
                onChange={this.handleInputChange}
                required 
              />
              <Label htmlFor="firstName" className="login-form__label">*שם פרטי</Label>
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
                onChange={this.handleInputChange}
                required 
              />
              <Label htmlFor="lastName" className="login-form__label">*שם משפחה</Label>
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
                onChange={this.handleInputChange}
                required 
              />
              <Label htmlFor="Email" className="login-form__label">*דואר אלקטרוני</Label>
            </FormGroup>
          </Col>
          <Col md="6" className="login-form__col">
            <FormGroup>
              <Input 
                type="tel" 
                id="phoneNum" 
                name="phoneNum" 
                className="form-control placehlder-label" 
                value={this.state.data.phoneNum}
                onChange={this.handleInputChange}
                required 
              />
              <Label htmlFor="phoneNum" className="login-form__label">*מספר נייד</Label>
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
              onChange={this.handleInputChange}
              required 
            />
            <label htmlFor="cb1" className="homei-checkbox__label">אני מאשר את תנאי הסכם הצטרפות מלווה</label>
          </FormGroup>
          <FormGroup className="homei-checkbox">
            <Input
              type="checkbox"
              id="cb2"
              name="isConfirmLoanAgreementProject"
              className="homei-checkbox__input"
              value={this.state.data.isConfirmLoanAgreementProject}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="cb2" className="homei-checkbox__label">אני מאשר את תנאי הסכם הלואה במיזם</label>
          </FormGroup>
          <FormGroup className="homei-checkbox">
            <Input
              type="checkbox"
              id="cb3"
              name="isConfirmTransactionPermit"
              className="homei-checkbox__input"
              value={this.state.data.isConfirmTransactionPermit}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="cb3" className="homei-checkbox__label">אני מאשר את תנאי השימוש</label>
          </FormGroup>
          <FormGroup className="homei-checkbox">
            <Input
              type="checkbox"
              id="cb4"
              name="isConfirm4"
              className="homei-checkbox__input"
              value={this.state.data.isConfirm4}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="cb4" className="homei-checkbox__label">אני מאשר את שטר היתר העסקה</label>
          </FormGroup>
        </div>

        <div className="login-form__footer">
          <Button type="submit" className="login-form__submit">
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

export default InvestorSignupForm;
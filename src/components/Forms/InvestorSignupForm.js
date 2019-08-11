import React from 'react';
import { Button, Label, Row, Col, FormGroup } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from "react-router-dom";

// Validation rules
const isRequired = (val) => val && val.length;

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
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log(values);
  }
  

  render() {
    console.log(this.state.loginMode);
    return (
      <LocalForm id="signupForm" className="login-form" onSubmit={this.handleSubmit}>
        <Row className="login-form__row">
          <Col md="6" className="login-form__col">
            <FormGroup>
              <Control.text id="firstName" model=".firstName" name="firstName" className="form-control placehlder-label" validators={{isRequired}} />
              <Label htmlFor="firstName" className="login-form__label">*שם פרטי</Label>
              <Errors 
                forId="firstName"
                model=".firstName" 
                show="touched" 
                // wrapper={(props) => <ErrorLabel forId="firstName">{props.children}</ErrorLabel>} 
                wrapper={ErrorLabel} 
                messages={{
                  isRequired: "שדה חובה"
                }}
              />
            </FormGroup>
          </Col>
          <Col md="6" className="login-form__col">
            <FormGroup>
              <Control.text id="lastName" model=".lastName" name="lastName" className="form-control placehlder-label" />
              <Label htmlFor="lastName" className="login-form__label">*שם משפחה</Label>
            </FormGroup>
          </Col>
          <Col md="6" className="login-form__col">
            <FormGroup>
              <Control.text id="Email" type="email" model=".Email" name="Email" className="form-control placehlder-label" />
              <Label htmlFor="Email" className="login-form__label">*דואר אלקטרוני</Label>
            </FormGroup>
          </Col>
          <Col md="6" className="login-form__col">
            <FormGroup>
              <Control.text id="phoneNum" type="tel" model=".phoneNum" name="phoneNum" className="form-control placehlder-label"  />
              <Label htmlFor="phoneNum" className="login-form__label">*מספר נייד</Label>
            </FormGroup>
          </Col>
        </Row>

        <div className="login-form__checkbox-group">
          <FormGroup className="homei-checkbox">
            <Control.checkbox id="cb1" name="cb1" className="homei-checkbox__input" model=".cb1" />
            <label htmlFor="cb1" className="homei-checkbox__label">אני מאשר את תנאי הסכם הצטרפות מלווה</label>
          </FormGroup>
          <FormGroup className="homei-checkbox">
            <Control.checkbox id="cb2" name="cb2" className="homei-checkbox__input" model=".cb2" />
            <label htmlFor="cb2" className="homei-checkbox__label">אני מאשר את תנאי הסכם הלואה במיזם</label>
          </FormGroup>
          <FormGroup className="homei-checkbox">
            <Control.checkbox id="cb3" name="cb3" className="homei-checkbox__input" model=".cb3" />
            <label htmlFor="cb3" className="homei-checkbox__label">אני מאשר את תנאי השימוש</label>
          </FormGroup>
          <FormGroup className="homei-checkbox">
            <Control.checkbox id="cb4" name="cb4" className="homei-checkbox__input" model=".cb4" />
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
      </LocalForm>
    )
  }
}

export default InvestorSignupForm;
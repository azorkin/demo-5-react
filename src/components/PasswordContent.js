import React from 'react';
import { Button, Label, FormGroup, Form, Input, UncontrolledTooltip } from 'reactstrap';
// import { Switch, Route, Redirect } from 'react-router-dom';

// API URLs
const setPasswordURL = "https://10.7.7.134/api/Account/password/_set";

// Validation rules
const isRequired = (val) => !!(val && val.length);
const isValidPassword = (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{6,12}$/.test(val);
const isConfirmedPassword = (val, confirmedVal) => (val === confirmedVal);
const hasNumber = (val) => /\d/.test(val);
const hasLetter = (val) => /[a-z]/i.test(val);


// Parsing query string
function getQueryStringParams(query) {
  // query = query.substring(1);
  if (typeof query !== "string") return null;
  var vars = query.slice(1).split("&");
  var paramsObj = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    paramsObj[pair[0]] = decodeURIComponent(pair[1]);
  }
  return paramsObj;
}

const ValidationIndicator = (props) => {
  console.log(props);
  return (
    <div className="validation-indicator">
      <label className="validation-indicator__label">הסיסמה צריכה לכלול לפחות:</label>
      <ul className="validation-indicator__list">
        <li>
          <div className="validation-checkbox">
            <input id="letterIndicator" type="checkbox" disabled checked={props.hasLetter} />
            <label htmlFor="letterIndicator">אותיות</label>
          </div>
        </li>
        <li>
          <div className="validation-checkbox">
            <input id="numberIndicator" type="checkbox" disabled checked={props.hasNumeral} />
            <label htmlFor="numberIndicator">מספרים</label>
          </div>
        </li>
        {/* <li>
          <div className="validation-checkbox">
            <input id="charIndicator" type="checkbox" disabled checked={props.hasSpecialChar} />
            <label htmlFor="charIndicator">סימנים מיוחדים</label>
          </div>
        </li> */}
      </ul>
    </div>
  )
}

class PasswordContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      code: '',
      Password: '',
      ConfirmPassword: ''

      // tooltipOpen: false
    }

    // this.toggleTooltip = this.toggleTooltip.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

  }

  // toggleTooltip() {
  //   this.setState({
  //     tooltipOpen: !this.state.tooltipOpen
  //   })
  // }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
      // data: { ...this.state.data, [name]: value }
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    let data = JSON.stringify(this.state.data);
    console.log("current form data is: " + data);
    // console.log(this.props);
    this.props.history.push('/thanks');

    fetch("", {
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

  componentDidMount() {
    console.log("mounted");
    let confirmationParams = getQueryStringParams(this.props.location.search);
    this.setState({
      userId: confirmationParams.userId,
      code: confirmationParams.code
    })
  }

  componentDidUpdate() {
    console.log("updated");
  }

  render() {
    console.log(this.state.userId, this.state.code, this.props);
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">בחירת סיסמה</h1>

        <Form id="verifyForm" className="login-form login-form--narrow" onSubmit={this.handleSubmit} noValidate>
          <FormGroup>
            <Input 
              id="Password" 
              type="password" 
              name="Password" 
              autoComplete="new-password" 
              required 
              className="form-control placehlder-label" 
              value={this.state.Password} 
              onChange={this.handleInputChange}
            />
            <Label htmlFor="Password" className="login-form__label">*בחירת סיסמה</Label>
            <button id="formTooltipToggle" type="button" className="login-form__tooltip-btn">?</button>
            <UncontrolledTooltip placement="left" target="formTooltipToggle"  container=".form-group">
              הסיסמה צריכה לכלול 8 עד 12 תווים, כולל ספרות ואותיות
            </UncontrolledTooltip>
          </FormGroup>

          <ValidationIndicator hasLetter={false} hasNumeral={false} hasSpecialChar={false} />

          <FormGroup>
            <Input 
              id="ConfirmPassword" 
              type="password" 
              name="ConfirmPassword" 
              autoComplete="new-password" 
              required 
              className="form-control placehlder-label" 
              value={this.state.ConfirmPassword}
              onChange={this.handleInputChange}
            />
            <Label htmlFor="ConfirmPassword" className="login-form__label">*הקלד סיסמה בשנית</Label>
          </FormGroup>

          <div className="login-form__footer">
            <Button type="submit" disabled={false} className="login-form__submit">שמירה והמשך</Button>
          </div>
        </Form>
      </div>
    )
  }
};

export default PasswordContent;
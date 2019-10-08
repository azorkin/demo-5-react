import React from 'react';
import { Button, Label, FormGroup, Form, Input } from 'reactstrap';
// import DayPicker from 'react-day-picker';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import 'react-day-picker/lib/style.css'; 
import { Link, withRouter } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";
import Reaptcha from "reaptcha";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import he from 'date-fns/locale/he';

import { isRequired, isValidDate, isValidId } from "../../shared/Validation";
import HomeiAPI from "../../shared/HomeiAPI";
import Spinner from "../Spinner";

// API URLs
const { loginOtpRequestURL } = HomeiAPI;

// Registering locale for React DatePicker
registerLocale('he', he);

const formatDate = (date) => {
  if (date instanceof Date) {
    let dd = date.getDate().toString();
    if (dd.length === 1) {dd = "0" + dd};
    let mm = (date.getMonth() + 1).toString();
    if (mm.length === 1) {mm = "0" + mm};
    let yyyy = date.getFullYear().toString();
    return dd + "/" + mm + "/" + yyyy
  }
  return ""
}

class LoginFormID extends React.Component {

  constructor(props) {
    super(props);

    // this.recaptchaRef = React.createRef();
    this.captcha = null;
    this.dateInputRef = React.createRef();

    this.state = {

      data: {
        captchaKey: '',
        TZ: '',
        DateOfBirth: ''
      },

      touched: {
        TZ: false,
        DateOfBirth: false
      },

      validity: {
        TZ: false,
        DateOfBirth: false
      },

      errors: {
        TZ: '',
        DateOfBirth: ''
      },

      datePickerDate: '',

      formIsValid: false,
      formServerOK: true,
      formServerError: "",

      contactingServer: false,
      hiddenCaptchaVerified: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.handleDateInput = this.handleDateInput.bind(this);

    this.onCaptchaVerify = this.onCaptchaVerify.bind(this);
    this.onCaptchaExpire = this.onCaptchaExpire.bind(this);
    this.captchaReset = this.captchaReset.bind(this);
  }

  handleDateInput = (date) => {
    // date variable gets its value from the datepicker
    let formatedDate = formatDate(date);
    console.log(date, formatedDate );
    // let selectedDate = this.dateInputRef.current.input.value;
    this.setState({ 
      data: { ...this.state.data, "DateOfBirth": formatedDate },
      datePickerDate: date
    },
      () => { this.validateUserInput("DateOfBirth", formatedDate) });
  }

  handleTextInput(event) {
    console.log("handleText");
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ data: { ...this.state.data, [name]: value } },
      () => { this.validateUserInput(name, value) });
  }

  validateUserInput(fieldName, value) {
    let fieldValidationErrors = this.state.errors;
    let fieldValidity = this.state.validity;

    switch (fieldName) {
      case "TZ":
        if (!isRequired(value)) {
          fieldValidity.TZ = false;
          fieldValidationErrors.TZ = "שדה חובה"
        } else if (!isValidId(value)) {
          fieldValidity.TZ = false;
          fieldValidationErrors.TZ = 'נא למלא תעודת זהות/ דרכון'
        } else {
          fieldValidity.TZ = true;
          fieldValidationErrors.TZ = "";
        }
        break
      case "DateOfBirth":
        if (!isRequired(value)) {
          fieldValidity.DateOfBirth = false;
          fieldValidationErrors.DateOfBirth = "נא למלא תאריך לידה"
        } else if (!isValidDate(value)) {
          fieldValidity.DateOfBirth = false;
          fieldValidationErrors.DateOfBirth = 'פרטי המשתמש שגויים';
        } else {
          fieldValidity.DateOfBirth = true;
          fieldValidationErrors.DateOfBirth = "";
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
    // if (currentFormIsValid && !this.state.hiddenCaptchaExecuted) {
    //   this.setState({
    //     hiddenCaptchaExecuted: true
    //   });
    //   this.recaptchaRef.current.execute();
    //   console.log(this.recaptchaRef.current, "executed");
    // };
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
      }
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

    let currentSignupURL = loginOtpRequestURL;
    
    let data = JSON.stringify(this.state.data);
    // let preData = {...this.state.data};
    // let formatedDate = formatDate(preData.DateOfBirth);
    // preData.DateOfBirth = formatedDate;
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
        console.log(response)
        this.setState({
          formServerOK: false,
          contactingServer: false
        });
        if (response.status === 401) {
          this.setState({ formServerError: 'אחד או יותר מהנתונים שהזנת לא תקינים'});
        }
        this.captchaReset();
        // throw Error(response.statusText);
      }
      this.setState({
        formServerOK: true,
        formServerError: "",
        contactingServer: false
      });
      return response.json();
    })
    .then(respJson => {
      console.log('Success: ', respJson);
      // this.props.history.push('/thanks');
      this.props.handleSuccessfulSubmit(this.state.data.captchaKey, this.state.data.TZ, this.state.data.DateOfBirth);
    })
    .catch(error => {
      console.error('Error: ', error);
      this.setState({
        formServerOK: false,
        // formServerError: error,
        contactingServer: false
      });
      this.captchaReset();
      this.props.history.push('/error');
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

  // componentDidMount() {
  //   this.recaptchaRef.current.render();
  // }

  render() {

    /* const CustomDateInput = (props) => {
      console.log(props, props.value)
      return (
        <Input
          onClick={props.onClick}
          type="text"
          id="DateOfBirth"
          name="DateOfBirth"
          value={props.value}
          // value={this.state.data.DateOfBirth}
          className={!!this.state.data.DateOfBirth ? "move-top" : ""}
          // onChange={this.handleTextInput}
          // onBlur={this.handleBlur}
          required
          autoComplete="off"
        />
      )
    }
 */
    return (
      <Form id="loginFormID" className="login-form" onSubmit={this.handleSubmit} noValidate>
        {/* <input type="hidden" name="captchaKey" value={this.state.data.captchaKey} /> */}
        <FormGroup>
          <Input 
            type="text" 
            id="TZ" 
            name="TZ" 
            value={this.state.data.TZ} 
            className={!!this.state.data.TZ ? "move-top" : ""}
            onChange={this.handleTextInput}
            onBlur={this.handleBlur} 
            required 
            autoComplete="off"
          />
          <Label htmlFor="TZ" className="login-form__label">*תעודת זהות</Label>
          {!this.state.validity.TZ && this.state.touched.TZ && <label className="error">{this.state.errors.TZ}</label>}
        </FormGroup>
        {/* <FormGroup>
          <Input 
            type="text" 
            id="DateOfBirth" 
            name="DateOfBirth" 
            value={this.state.data.DateOfBirth}
            className={!!this.state.data.DateOfBirth ? "move-top" : ""}
            onChange={this.handleTextInput}
            onBlur={this.handleBlur} 
            required 
            autoComplete="off"
          />
          <Label htmlFor="DateOfBirth" className="login-form__label">*תאריך לידה</Label>
          {!this.state.validity.DateOfBirth && this.state.touched.DateOfBirth && <label className="error">{this.state.errors.DateOfBirth}</label>}
        </FormGroup> */}
        {/* <FormGroup>
          <DayPickerInput
            // component={props => <Input {...props} />}
            onDayChange={day => console.log(day)}
            placeholder=""
            formatDate="DD/MM/YYYY"
            inputProps={{
              // type="text",
              id: "DateOfBirth",
              name: "DateOfBirth",
              value: this.state.data.DateOfBirth,
              className: "form-control" + (!!this.state.data.DateOfBirth ? " move-top" : ""),
              onChange: this.handleTextInput,
              onBlur: this.handleBlur,
              required: true,
              autoComplete: "off"
            }}
          />
          <Label htmlFor="DateOfBirth" className="login-form__label">*תאריך לידה</Label>
          {!this.state.validity.DateOfBirth && this.state.touched.DateOfBirth && <label className="error">{this.state.errors.DateOfBirth}</label>}
        </FormGroup> */}
        <FormGroup className={(!!this.state.data.DateOfBirth ? " label-on-top" : "")}>
          <DatePicker 
            ref={this.dateInputRef}
            id="DateOfBirth"
            name="DateOfBirth" 
            className={"form-control" + (!!this.state.data.DateOfBirth ? " move-top" : "")}
            // selected={this.state.data.DateOfBirth}
            selected={this.state.datePickerDate}
            // value={this.state.data.DateOfBirth}
            locale="he" 
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            // strictParsing 
            dropdownMode="select"
            onChange={this.handleDateInput}
            // onChange={this.handleTextInput}
            // onChangeRaw={this.handleTextInput}
            onBlur={this.handleBlur}
            required
            autoComplete="off"
            // customInput={<CustomDateInput />}
          />
          <Label htmlFor="DateOfBirth" className="login-form__label">*תאריך לידה</Label>
          {!this.state.validity.DateOfBirth && this.state.touched.DateOfBirth && <label className="error">{this.state.errors.DateOfBirth}</label>}
        </FormGroup>

        <div className="login-form__footer">

          {/* <ReCAPTCHA
            ref={this.recaptchaRef}
            size="invisible"
            sitekey={HomeiAPI.recaptchaUserKey}
            onExpired={() => console.log("captcha expired")}
          /> */}
          <Reaptcha
            ref={e => (this.captcha = e)}
            id="login-id-captcha"
            size="invisible"
            isolated="true"
            sitekey={HomeiAPI.recaptchaUserKey}
            onVerify={this.onCaptchaVerify}
            onExpire={this.onCaptchaExpire}
            hl="iw"
          />

          {!this.state.formServerOK && <label className="error error--form-level">{this.state.formServerError}</label>}

          <Button type="submit" className="login-form__submit" disabled={!this.state.formIsValid || this.state.contactingServer}>
            {this.state.contactingServer && <Spinner className="login-form__spinner-elem" />}
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

export default withRouter(LoginFormID);
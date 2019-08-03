import React from 'react';

const validEmailRegex = RegExp(/d{2-256}$/i);

class InvestorSignupForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fName: null,
      lName: null,
      myEmail: null,
      password: null,
      errors: {
        fName: "",
        lName: "",
        myEmail: "",
        password: ""
      }
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = { event };
    let errors = this.state.errors;

    switch (name) {
      case "fName":
        errors.fName =
          value.length < 5
            ? "First name must be longer than 4 letters"
            : "";
        break;
      case "myEmail":
        errors.myEmail =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });

  }
  

  

  

  render() {
    return (
      <form id="verifyInvest" action="/" verify-form="" className="login-form" noValidate>
        <div className="row login-form__row">
          <div className="col-md-6 login-form__col">
            <div className="form-group">
              <input id="fName" type="text" name="fName" onChange={this.handleChange} defaultValue="עינת" required className="form-control placehlder-label" noValidate />
              <label htmlFor="fName" className="login-form__label">*שם פרטי</label>
            </div>
          </div>
          <div className="col-md-6 login-form__col">
            <div className="form-group">
              <input id="lName" type="text" name="lName" onChange={this.handleChange} required className="form-control placehlder-label" noValidate />
              <label htmlFor="lName" className="login-form__label">*שם משפחה</label>
            </div>
          </div>
          <div className="col-md-6 login-form__col">
            <div className="form-group">
              <input id="myEmail" type="email" name="myEmail" onChange={this.handleChange} required className="form-control placehlder-label" noValidate />
              <label htmlFor="myEmail" className="login-form__label">*דואר אלקטרוני</label>
            </div>
          </div>
          <div className="col-md-6 login-form__col">
            <div className="form-group">
              <input id="phoneNum" type="text" name="phoneNum" onChange={this.handleChange} required className="form-control placehlder-label" noValidate />
              <label htmlFor="phoneNum" className="login-form__label">*מספר נייד</label>
            </div>
          </div>
        </div>

        <div className="login-form__checkbox-group">
          <div className="form-group homei-checkbox">
            <input id="cb1" type="checkbox" name="cb1" required className="homei-checkbox__input" />
            <label htmlFor="cb1" className="homei-checkbox__label">אני מאשר את תנאי הסכם הצטרפות מלווה</label>
          </div>
          <div className="form-group homei-checkbox"><input id="cb2" type="checkbox" name="cb2" required className="homei-checkbox__input" /><label htmlFor="cb2" className="homei-checkbox__label">אני מאשר את תנאי הסכם הלואה במיזם</label></div>
          <div className="form-group homei-checkbox"><input id="cb3" type="checkbox" name="cb3" required className="homei-checkbox__input" /><label htmlFor="cb3" className="homei-checkbox__label">אני מאשר את תנאי השימוש</label></div>
          <div className="form-group homei-checkbox"><input id="cb4" type="checkbox" name="cb4" required className="homei-checkbox__input" /><label htmlFor="cb4" className="homei-checkbox__label">אני מאשר את שטר היתר העסקה</label></div>
        </div>

        <div className="login-form__footer">
          <button type="submit" disabled className="login-form__submit">הרשמה</button>
          <p className="login-form__footer-text">נרשמתם כבר? <a href="#0">היכנסו מכאן</a></p>
        </div>
      </form>
    )
  }
}

export default InvestorSignupForm;
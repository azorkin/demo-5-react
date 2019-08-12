import React from 'react';
import InvestorSignupForm from './Forms/InvestorSignupForm';
// import { Switch, Route, Redirect } from 'react-router-dom';

class SignupContent extends React.Component {

  

  render() {

    // setting mode to borrower (default) or investor
    let signupPath = this.props.location.pathname;
    let signupMode = "borrower";
    if (signupPath.indexOf("investor") >= 0) signupMode = "investor"

    console.log(signupPath, signupMode);
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">הרשמה</h1>
        <ul role="tablist" className="nav login-content__nav-tabs tab-2">
          <li className="nav-item"><a id="passLoginTab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true" className="nav-link active">אני רוצה להשקיע</a></li>
          <li className="nav-item"><a id="phoneLoginTab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false" className="nav-link">אני רוצה <span className='desktop-inline'>לבקש </span>הלוואה</a></li>
        </ul>
        <div id="myTabContent" className="tab-content login-content__tab-content">
          <div id="tab1" role="tabpanel" aria-labelledby="passLoginTab" className="tab-pane fade show active">
            <InvestorSignupForm mode={signupMode}  />
          </div>
          <div id="tab2" role="tabpanel" aria-labelledby="phoneLoginTab" className="tab-pane fade">
            <form id="verifyLoan" action="/" verify-form="" className="login-form">
              <div className="row login-form__row">
                <div className="col-md-6 login-form__col">
                  <div className="form-group"><input id="fName2" type="text" name="fName2" required className="form-control placehlder-label" /><label htmlFor="fName2" className="login-form__label">*שם פרטי</label></div>
                </div>
                <div className="col-md-6 login-form__col">
                  <div className="form-group"><input id="lName2" type="text" name="lName2" required className="form-control placehlder-label" /><label htmlFor="lName2" className="login-form__label">*שם משפחה</label></div>
                </div>
                <div className="col-md-6 login-form__col">
                  <div className="form-group"><input id="myEmail2" type="email" name="myEmail2" required className="form-control placehlder-label" /><label htmlFor="myEmail2" className="login-form__label">*דואר אלקטרוני</label></div>
                </div>
                <div className="col-md-6 login-form__col">
                  <div className="form-group"><input id="phoneNum2" type="text" name="phoneNum2" required className="form-control placehlder-label" /><label htmlFor="phoneNum2" className="login-form__label">*מספר נייד</label></div>
                </div>
              </div>
              <div className="login-form__checkbox-group">
                <div className="form-group homei-checkbox"><input id="cb2_1" type="checkbox" name="cb2_1" required className="homei-checkbox__input" /><label htmlFor="cb2_1" className="homei-checkbox__label">אני מאשר את תנאי הסכם הצטרפות מלווה</label></div>
                <div className="form-group homei-checkbox"><input id="cb2_2" type="checkbox" name="cb2_2" required className="homei-checkbox__input" /><label htmlFor="cb2_2" className="homei-checkbox__label">אני מאשר את תנאי הסכם הלואה במיזם</label></div>
                <div className="form-group homei-checkbox"><input id="cb2_3" type="checkbox" name="cb2_3" required className="homei-checkbox__input" /><label htmlFor="cb2_3" className="homei-checkbox__label">אני מאשר את תנאי השימוש</label></div>
                <div className="form-group homei-checkbox"><input id="cb2_4" type="checkbox" name="cb2_4" required className="homei-checkbox__input" /><label htmlFor="cb2_4" className="homei-checkbox__label">אני מאשר את שטר היתר העסקה</label></div>
              </div>
              <div className="login-form__footer">
                <button type="submit" disabled className="login-form__submit">הרשמה</button>
                <p className="login-form__lost-password">נרשמתם כבר? <a href="#0">היכנסו מכאן</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

export default SignupContent;
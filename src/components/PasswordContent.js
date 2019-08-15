import React from 'react';
import { Button, Label, Row, Col, FormGroup, Form, Input } from 'reactstrap';
// import { Switch, Route, Redirect } from 'react-router-dom';

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

class PasswordContent extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      userId: '',
      code: ''
    }

  }

  componentDidMount() {
    let confirmationParams = getQueryStringParams(this.props.location.search);
    this.setState({
      userId: confirmationParams.userId,
      code: confirmationParams.code
    })
  }

  render() {
    console.log(this.state.userId, this.state.code);
    return (
      <div className="content login-content">
        <h1 className="login-content__heading">בחירת סיסמה</h1>

        <Form id="verifyForm" className="login-form login-form--narrow" onSubmit={this.handleSubmit} noValidate>
          <FormGroup>
            <input id="passVal" type="password" name="passVal" autoComplete="new-password" required className="form-control placehlder-label" />
            <label htmlFor="passVal" className="login-form__label">*בחירת סיסמה</label>
            <button type="button" data-toggle="tooltip" data-placement="left" title="הסיסמה צריכה לכלול 8 עד 12 תווים, כולל ספרות ואותיות" className="login-form__tooltip-btn">?</button>
          </FormGroup>

          <div className="validation-indicator">
            <label className="validation-indicator__label">הסיסמה צריכה לכלול לפחות:</label>
            <ul className="validation-indicator__list">
              <li>
                <div className="validation-checkbox">
                  <input id="letterIndicator" type="checkbox" disabled />
                  <label htmlFor="letterIndicator">אותיות</label>
                </div>
              </li>
              <li>
                <div className="validation-checkbox">
                  <input id="numberIndicator" type="checkbox" disabled />
                  <label htmlFor="numberIndicator">מספרים</label>
                </div>
              </li>
              <li>
                <div className="validation-checkbox">
                  <input id="charIndicator" type="checkbox" disabled />
                  <label htmlFor="charIndicator">סימנים מיוחדים</label>
                </div>
              </li>
            </ul>
          </div>

          <FormGroup>
            <Input 
              id="verifypassVal" 
              type="password" 
              name="verifypassVal" 
              autoComplete="new-password" 
              required 
              className="form-control placehlder-label" 
            />
            <Label htmlFor="verifypassVal" className="login-form__label">*הקלד סיסמה בשנית</Label>
          </FormGroup>

          <div className="login-form__footer">
            <Button type="submit" disabled className="login-form__submit">שמירה והמשך</Button>
          </div>
        </Form>
      </div>
    )
  }
};

export default PasswordContent;
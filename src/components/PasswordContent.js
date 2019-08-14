import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';

class PasswordContent extends React.Component {
  render() {
    return (
      <div class="content login-content">
        <h1 class="login-content__heading">בחירת סיסמה</h1>
        <form id="verifyForm" action="/" verify-form="" class="login-form login-form--narrow">
          <div class="form-group">
            <input id="passVal" type="password" name="passVal" autocomplete="new-password" required class="form-control placehlder-label" />
            <label for="passVal" class="login-form__label">*בחירת סיסמה</label>
            <button type="button" data-toggle="tooltip" data-placement="left" title="הסיסמה צריכה לכלול 8 עד 12 תווים, כולל ספרות ואותיות" class="login-form__tooltip-btn">?</button>
          </div>
          <div class="validation-indicator"><label class="validation-indicator__label">הסיסמה צריכה לכלול לפחות:</label>
            <ul class="validation-indicator__list">
              <li>
                <div class="validation-checkbox">
                  <input id="letterIndicator" type="checkbox" disabled />
                  <label for="letterIndicator">אותיות</label>
                </div>
              </li>
              <li>
                <div class="validation-checkbox">
                  <input id="numberIndicator" type="checkbox" disabled />
                  <label for="numberIndicator">מספרים</label>
                </div>
              </li>
              <li>
                <div class="validation-checkbox">
                  <input id="charIndicator" type="checkbox" disabled />
                  <label for="charIndicator">סימנים מיוחדים</label>
                </div>
              </li>
            </ul>
          </div>
          <div class="form-group">
            <input id="verifypassVal" type="password" name="verifypassVal" autocomplete="new-password" required class="form-control placehlder-label" />
            <label for="verifypassVal" class="login-form__label">*הקלד סיסמה בשנית</label>
          </div>
          <div class="login-form__footer">
            <button type="submit" disabled class="login-form__submit">שמירה והמשך</button>
          </div>
        </form>
      </div>
    )
  }
};

export default PasswordContent;
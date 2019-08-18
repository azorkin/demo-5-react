import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';

class ThanksContent extends React.Component {
  constructor(props) {
    super(props);
    this.thanksRef=null;
  }

  componentDidMount() {
    this.scrollToThanksRef();
  }

  render() {
    return (
      <div className="content login-content" ref={(ref) => this.thanksRef = ref}>
        <div className="login-thanks">
          <h1 className="login-thanks__heading">תודה :-)</h1>
          <p className="login-thanks__lead">הפרטים שלך התקבלו במערכת.</p>
          <p>שלחנו לך מייל לכתובת הדואל שציינת, <br/> יש להיכנס עם הקישור במייל על מנת לסיים את הרישום.</p>
        </div>
      </div>
    )
  }

  scrollToThanksRef = () => window.scrollTo(0, this.thanksRef.offsetTop);
};

export default ThanksContent;
import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';

class ErrorContent extends React.Component {
  constructor(props) {
    super(props);
    this.errorRef=null;
  }

  componentDidMount() {
    this.scrollToerrorRef();
  }

  render() {
    return (
      <div className="content login-content" ref={(ref) => this.errorRef = ref}>
        <div className="login-thanks">
          <h1 className="login-thanks__heading">מצטערים, :-(</h1>
          <p className="login-thanks__lead">משהו השתבש והתגובה לא נשלחה. נשמח אם תנסו שוב בעוד כמה רגעים או או פנו לשירות הלקוחות בטלפון: <a href="tel:07337450000">073-374-50000</a>.</p>
        </div>
      </div>
    )
  }

  scrollToerrorRef = () => window.scrollTo(0, this.errorRef.offsetTop);
};

export default ErrorContent;
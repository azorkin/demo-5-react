import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';

class ChooseAccountContent extends React.Component {
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
        <div className="choose-account">
          <h1 className="choose-account__heading">תודה :-)</h1>
          <p className="choose-account__lead">הפרטים שלך התקבלו במערכת.</p>
          <div className="choose-account__select-row">
            <a href="#1" className="choose-account__button choose-account__button--borrower">
              <span>לחשבון</span>
              הלוואות
            </a>
            <a href="#1" className="choose-account__button choose-account__button--investor">
              <span>לחשבון</span>
              השקעות
            </a>
          </div>
        </div>
      </div>
    )
  }

  scrollToThanksRef = () => window.scrollTo(0, this.thanksRef.offsetTop);
};

export default ChooseAccountContent;
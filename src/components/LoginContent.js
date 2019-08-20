import React from 'react';
import LoginFormUser from './Forms/LoginFormUser';
import LoginFormID from './Forms/LoginFormID';
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
// import classnames from 'classnames';


class LoginContent extends React.Component {

  constructor(props) {
    super(props);

    this.toggleTabs = this.toggleTabs.bind(this);
    this.state = {
      activeTab: "1"
    }
  }

  toggleTabs(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {

    return (
      <div className="content login-content">
        <h1 className="login-content__heading">כניסה ללקוחות רשומים</h1>
        
        <Nav tabs className="login-content__nav-tabs" role="tablist">
          <NavItem>
            <NavLink
              id="passLoginTab"
              role="tab"
              href="#passLogin"
              aria-controls="passLogin"
              aria-selected={this.state.activeTab === "1"}
              className={ this.state.activeTab === "1" ? "active" : ""}
              onClick={() => {this.toggleTabs("1"); }}
            >
              כניסה עם סיסמה
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              id="phoneLoginTab"
              role="tab"
              href="#phoneLogin"
              aria-controls="phoneLogin"
              aria-selected={this.state.activeTab === "2"}
              className={this.state.activeTab === "2" ? "active" : ""}
              onClick={() => { this.toggleTabs("2"); }}
            >
              כניסה עם מספר טלפון
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <LoginFormUser />
          </TabPane>
          <TabPane tabId="2">
            <LoginFormID />
          </TabPane>
        </TabContent>
        
      </div>
    )
  }
};

export default LoginContent;
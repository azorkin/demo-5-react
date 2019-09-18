import React from 'react';
import LoginFormUser from './Forms/LoginFormUser';
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import OtpLogin from './OtpLoginComponent';
// import classnames from 'classnames';


class LoginContent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: "2"
    }

    this.tabPanelRef = React.createRef();

    this.toggleTabs = this.toggleTabs.bind(this);
    this.handleArrowKeys = this.handleArrowKeys.bind(this);
  }

  toggleTabs(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleArrowKeys(e) {
    let tabCount = e.target.parentNode.parentNode.childNodes.length;
    let currentTab = +this.state.activeTab;
    if (e.keyCode === 39 || e.keyCode === 37) {
      console.log("arrow pressed", e.target);
      // Move right
      if (e.keyCode === 39) {
        currentTab++;
        if (currentTab > tabCount) {
          currentTab = 1;
        }
        // Move left
      } else if (e.keyCode === 37) {
        currentTab--;
        if (currentTab <= 0) {
          currentTab = tabCount
        }
      }
      this.setState({
        activeTab: currentTab.toString()
      });
    }
    console.log(e.target.parentNode.parentNode.childNodes[currentTab - 1]);
    e.target.parentNode.parentNode.childNodes[currentTab-1].firstChild.focus();
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="content login-content">
        <h1 className="login-content__heading">כניסה ללקוחות רשומים</h1>
        
        <Nav tabs className="login-content__nav-tabs" role="tablist" onKeyDown={this.handleArrowKeys}>
          <NavItem>
            <NavLink
              id="passLoginTab"
              role="tab"
              href="#passLogin"
              aria-controls="passLogin"
              aria-selected={this.state.activeTab === "1"}
              className={ this.state.activeTab === "1" ? "active" : ""}
              onClick={() => {this.toggleTabs("1"); }}
              tabIndex={this.state.activeTab === "1" ? "0" : "-1"}
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
              tabIndex={this.state.activeTab === "2" ? "0" : "-1"}
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
            <OtpLogin />
          </TabPane>
        </TabContent>
        
      </div>
    )
  }
};

export default LoginContent;
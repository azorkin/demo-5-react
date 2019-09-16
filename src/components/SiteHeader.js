import React from 'react';
import logo from '../img/logo.png';
import { homeURL, navMenuData} from '../shared/Data';
import { Collapse, Navbar, NavbarToggler, NavbarBrand} from 'reactstrap';
// import ReadabilityComponent from "./ReadabilityComponent/ReadabilityComponent";
import { Link } from 'react-router-dom'

class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuItem: 0,
      navbarIsOpen: false
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.closeNavbar = this.closeNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({
      navbarIsOpen: !this.state.navbarIsOpen
    });
  }

  closeNavbar() {
    this.setState({
      navbarIsOpen: false
    });
  }

  render() {

    const navMenu = navMenuData.map((item, index) => {

      let navItemClass = "nav-item";

      if (index === this.state.activeMenuItem) {
        navItemClass += " active";
      };
      
      return (
        <li className={navItemClass} key={index}>
          <a href={item.link} className="nav-link">{item.title}</a>
        </li>
      )

    });

    return (
      <header className="site-header">
        <Navbar expand="xl" className="homei-navbar">
          <NavbarToggler onClick={this.toggleNavbar} data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded={this.state.navbarIsOpen} aria-label="Toggle navigation" className="homei-navbar__toggle">
            <span className="navbar-toggler-icon"></span>
          </NavbarToggler>
          <NavbarBrand href={homeURL} aria-label="HOMEI home" className="homei-navbar__brand">
            <img src={logo} alt="Home Investment" className="homei-logo" />
          </NavbarBrand>
          <a href="tel:073-3745000" aria-label="ליעוץ חינם התקשרו בטלפון" className="homei-navbar__call-mobile">
            <svg width="30" height="30">
              <use xlinkHref="#icon-phone"></use>
            </svg>
          </a>
          <Collapse navbar isOpen={this.state.navbarIsOpen} id="mainNavbar" className="homei-navbar__collapse">
            <ul className="navbar-nav homei-navbar__nav">
              {navMenu}
            </ul>
            <div className="homei-navbar__controls">
              <a href="tel:073-3745000" className="navbar-control navbar-control--call">
                <span className="navbar-control__caption">
                  <span className="navbar-control__text">ליעוץ חינם התקשרו </span>
                  <span className="navbar-control__text-tel">073-3745000</span>
                </span>
                <svg width="30" height="30">
                  <use xlinkHref="#icon-phone"></use>
                </svg>
              </a>
              <Link to="/login" className="navbar-control navbar-control--borrower" onClick={this.closeNavbar}>
                <svg width="37" height="37" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
                <span className="navbar-control__caption">כניסת לווים</span>
              </Link>
              <Link to="/login" className="navbar-control navbar-control--investor" onClick={this.closeNavbar}>
                <svg width="37" height="37" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
                <span className="navbar-control__caption">כניסת משקיעים</span>
              </Link>
              {/* <button type="button" aria-label="toggle accessibility" className="navbar-control navbar-control--accessibility">
                <svg width="24" height="29" aria-hidden="true">
                  <use xlinkHref="#icon-accessibility"></use>
                </svg>
              </button> */}
            </div>
          </Collapse>
        </Navbar>
      </header>
    )
  }
}

export default SiteHeader;
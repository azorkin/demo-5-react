import React from 'react';
import logo from '../img/logo.png';
import { homeURL, navMenuData} from '../shared/Data';
// import ReadabilityComponent from "./ReadabilityComponent/ReadabilityComponent";
import { Link } from 'react-router-dom'

class SiteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuItem: 0
    }
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
        <nav className="navbar navbar-expand-xl homei-navbar">
          <button type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler homei-navbar__toggle">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a href={homeURL} aria-label="HOMEI home" className="navbar-brand homei-navbar__brand">
            <img src={logo} alt="Home Investment" className="homei-logo" />
          </a>
          <a href="tel:073-3745000" aria-label="ליעוץ חינם התקשרו בטלפון" className="homei-navbar__call-mobile">
            <svg width="30" height="30">
              <use xlinkHref="#icon-phone"></use>
            </svg>
          </a>
          <div id="mainNavbar" className="collapse navbar-collapse homei-navbar__collapse">
            <ul className="navbar-nav homei-navbar__nav">
              {/* <li className="nav-item active"><a href="#" className="nav-link">בית</a></li>
              <li className="nav-item"><a href="#" className="nav-link">אודות</a></li>
              <li className="nav-item"><a href="#" className="nav-link">איך זה עובד</a></li>
              <li className="nav-item"><a href="#" className="nav-link">בתקשורת</a></li>
              <li className="nav-item"><a href="#" className="nav-link">צור קשר</a></li>
              <li className="nav-item"><a href="#" className="nav-link">מדיניות פרטיות</a></li>
              <li className="nav-item"><a href="#" className="nav-link">הרשמה</a></li> */}
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
              <Link to="/signup/borrower" className="navbar-control navbar-control--borrower">
                <svg width="37" height="37" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
                <span className="navbar-control__caption">כניסת לווים</span>
              </Link>
              <Link to="/signup/investor" className="navbar-control navbar-control--investor">
                <svg width="37" height="37" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
                <span className="navbar-control__caption">כניסת משקיעים</span>
              </Link>
              <button type="button" aria-label="toggle accessibility" className="navbar-control navbar-control--accessibility">
                <svg width="24" height="29" aria-hidden="true">
                  <use xlinkHref="#icon-accessibility"></use>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default SiteHeader;
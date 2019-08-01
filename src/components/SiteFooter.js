import React from 'react';
import {footerColMenu1, footerColMenu2} from '../shared/Data'
import FooterLinks from "./FooterLinks";

const SiteFooter = () => {

  
  
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="container-fluid site-footer__container">
          <div className="row site-footer__row">
            <div className="col-auto site-footer__col site-footer__col--desktop-only">
              <FooterLinks title={footerColMenu1.title} menu={footerColMenu1.menuData} />
            </div>
            <div className="col-auto site-footer__col site-footer__col--desktop-only">
              <FooterLinks title={footerColMenu2.title} menu={footerColMenu2.menuData} />
            </div>
            <div className="col-auto site-footer__col">
              <h5 className="site-footer__title">יצירת קשר</h5>
              <p className="site-footer__company-info"><b>Homei - משכנתאות בין חברים</b><br/>הרוקמים 26, בניין 3 פארק העסקים<br/>עזריאלי חולןן<br/>טלפון: <a href="tel:073-3745000">073-3745000</a><br/><span>אזורי פעילות - כל הארץ</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container-fluid site-footer__container">
          <p className="site-footer__copyright">כל הזכויות שמורות ל- <a href="#0">HOMEI</a> בע”מ © 2017 </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
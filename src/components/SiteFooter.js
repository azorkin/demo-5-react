import React from 'react';

const SiteFooter = () => {
  
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="container-fluid site-footer__container">
          <div className="row site-footer__row">
            <div className="col-auto site-footer__col site-footer__col--desktop-only">
              <h5 className="site-footer__title">מפת אתר</h5>
              <ul className="site-footer__list">
                <li><a href="#0">בית</a></li>
                <li><a href="#0">אודות</a></li>
                <li><a href="#0">הצוות</a></li>
                <li><a href="#0">שאלות נפוצות</a></li>
                <li><a href="#0">צור קשר</a></li>
                <li><a href="#0">מפת אתר</a></li>
                <li><a href="#0">בתקשורת</a></li>
              </ul>
            </div>
            <div className="col-auto site-footer__col site-footer__col--desktop-only">
              <h5 className="site-footer__title">קישורים נוספים</h5>
              <ul className="site-footer__list">
                <li><a href="#0">מדיניות פרטיות</a></li>
                <li><a href="#0">תנאי שימוש</a></li>
                <li><a href="#0">הסכם הלוואה במיזם</a></li>
                <li><a href="#0">הסכם הצטרפות לווה</a></li>
                <li><a href="#0">תעריפון לווה</a></li>
                <li><a href="#0">תעריפון מלווה</a></li>
                <li><a href="#0">מדיניות איסור הלבנת הון</a></li>
                <li><a href="#0">שטר היתר עסקה</a></li>
              </ul>
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
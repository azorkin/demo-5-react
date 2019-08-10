import React from 'react';

const FooterLinks = (props) => {
  
  const footerLinkItems = props.menu.map((item, index) => {
    return (
      <li key={index}>
        <a href={item.link}>{item.title}</a>
      </li>
    )
  });
  
  return (
    <>
      <h5 className="site-footer__title">{props.title}</h5>
      <ul className="site-footer__list">
        {footerLinkItems}
      </ul>
    </>
  )
}

export default FooterLinks;
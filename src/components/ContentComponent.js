import React from 'react';
import SvgSprite from './SvgSprite';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import SigninMain from './SigninMain';
// import { Switch, Route, Redirect } from 'react-router-dom';

class ContentComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeMode: "sign-in"
    };
  }

  render() {

    /* const DefaultMain = () => {
      return (
        <main>
          <div className="container-fluid login-main__container">
            <h1>Hello!</h1>
          </div>
        </main>
      )
    } */

    return (
      <>
        <SvgSprite />
        {/* {defaultMain} */}
        <SiteHeader />
        <SigninMain />
        {/* <Switch>
          <Route path="/home" component={DefaultMain} />
          <Route exact path="/sign-in" component={SigninMain} />
          <Redirect to="/home" />
        </Switch> */}

        <SiteFooter />
      </>
    );
  }
}

export default ContentComponent;
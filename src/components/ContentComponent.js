import React from 'react';
// import Home from "./HomeComponent";
// import Menu from "./MenuComponent";
// import DishDetail from './DishdetailComponent';
import SvgSprite from './SvgSprite';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import SigninMain from './SigninMain';
import { Switch, Route, Redirect } from 'react-router-dom';

class ContentComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeMode: "sign-in"
    };
  }

  render() {

    // const HomePage = () => {
    //   return (
    //     <Home />
    //   )
    // }

    const defaultMain = (
      <main>
        <div class="container-fluid login-main__container">
          <h1>Hello!</h1>
        </div>
      </main>
    )

    return (
      <>
        <SvgSprite />
        {/* {defaultMain} */}
        <SigninMain />
        <SiteHeader />
        {/* <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Redirect to="/home" />
        </Switch> */}

        <SiteFooter />
      </>
    );
  }
}

export default ContentComponent;
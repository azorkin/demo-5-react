import React from 'react';
import ContentComponent from './components/ContentComponent';
import { BrowserRouter } from 'react-router-dom';
import './sass/app.sass';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ContentComponent />
      </BrowserRouter>
    )
  }
}

export default App;

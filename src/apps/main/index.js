import React from 'react';
import App from '../../components/App';
import routes from './routes';
import URL from '../../config/URL';

class MainApp extends React.Component {
  static getInitialProps () {

  }

  render() {
    return <App routes={routes}/>;
  }
}

export default MainApp;
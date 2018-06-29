import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import './App.css';

import { withRouter } from 'react-router';

class App extends Component {
  render() {
    const { routes, store } = this.props;
    return (
      <div>
        <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={({ match, location, ...rest }) => {
                  if (match) {
                    return React.createElement(route.component, {
                      ...rest,
                      match,
                      location,
                      loadData: () => {
                        if (!route.loadData) {
                          return console.warn(
                            `Route ${
                              route.path
                            }: please add loadData function to routes.js`
                          );
                        }

                        return route.loadData(match, location)(store);
                      },
                    });
                  }
                }}
              />
            );
          })}
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

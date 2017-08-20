import React, { Component } from 'react';
import config from 'config';

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { AppBar, Tabs, Tab } from 'material-ui'

import api from 'services/apiService';
import lodash from 'lodash';

import 'App.css';

injectTapEventPlugin()

export default class App extends Component {
  changeRoute = (route) => {
    this.props.router.push(route);
  }

  render() {

    const { props } = this;
    const { children } = props;

    const ChildrenWrapper = ({ children }) => (
      <div>
        {React.Children.map(children, child => (
          React.cloneElement(child, {
            apiServie: api,
            lodash: lodash,
            config: config
          })
        ))}
      </div>
    )

    const tabs = (
      <Tabs>
        <Tab label="Dashboard" onClick={(e) => { this.changeRoute("/") }} className="app-bar-tab"/>
        <Tab label="Contacts" onClick={(e) => { this.changeRoute("contacts") }} className="app-bar-tab"/>
      </Tabs>
    )

    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title={config.AppName}
            titleStyle={{'textAlign':'left', 'flex':'none'}}
            iconElementRight={ tabs }
            iconStyleRight={{'marginLeft':'30px'}}
          >
          </AppBar>
          <ChildrenWrapper>
            { children }
          </ChildrenWrapper>
        </div>
      </MuiThemeProvider>
    );
  }
}
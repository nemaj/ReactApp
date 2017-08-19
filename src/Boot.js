import React, { Component } from 'react';
import { browserHistory, Route, Router, IndexRoute } from 'react-router';

// import components
import App from 'components/App';
import Dashboard from 'components/pages/Dashboard';
import Contacts from 'components/pages/Contacts';

// App will act as boot component
const Boot = () => {
  return (
    <Router history={ browserHistory }>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard}></IndexRoute>
        <Route path="/contacts" component={Contacts}></Route>
      </Route>
    </Router>
  );
}

export default Boot;
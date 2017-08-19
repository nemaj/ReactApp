import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import Boot from 'Boot';
import registerServiceWorker from 'registerServiceWorker';

ReactDOM.render(<Boot />, document.getElementById('root'));
registerServiceWorker();

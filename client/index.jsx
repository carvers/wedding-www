import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux'

import store from './store'
import routes from './routes.js';

// Only render in the browser
if (typeof document !== 'undefined') {
  render(
		<Provider store={store}>
			<Router routes={routes} history={browserHistory} />
		</Provider>,
    document.getElementById('root')
  );
}

// Export the routes here so that ReactStaticPlugin can access them and build
// the static files.
export * from './routes.js';

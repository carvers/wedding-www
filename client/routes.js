import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import NotFound from './components/NotFound'
import Home from './components/Home'
import About from './components/About'
import Travel from './components/Travel'
import Registry from './components/Registry'
import RSVP from './containers/RSVP'
import RSVPAdmin from './containers/RSVPAdmin'
import RSVPConfirmation from './components/RSVPConfirmation'

export const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='about' component={About} />
    <Route path='travel' component={Travel} />
    <Route path='registry' component={Registry} />
    <Route path='rsvp'>
			<IndexRoute component={RSVP} />
			<Route path='admin' component={RSVPAdmin} />
			<Route path='confirm' component={RSVPConfirmation} />
		</Route>
    <Route path='*' component={NotFound} />
  </Route>
);

export default routes;

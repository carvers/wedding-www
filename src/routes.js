import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import NotFound from './components/NotFound'
import Home from './components/Home'
import About from './components/About'
import Travel from './components/Travel'
import Party from './components/Party'
import Registry from './components/Registry'
import RSVP from './components/RSVP'
import RSVPAdmin from './components/RSVPAdmin'

export const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='about' component={About} />
    <Route path='travel' component={Travel} />
    <Route path='party' component={Party} />
    <Route path='registry' component={Registry} />
    <Route path='rsvp'>
			<IndexRoute component={RSVP} />
			<Route path='admin' component={RSVPAdmin} />
		</Route>
    <Route path='*' component={NotFound} />
  </Route>
);

export default routes;

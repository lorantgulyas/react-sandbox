import React from 'react';
import { renderRoutes } from 'react-router-config';

import Header from './components/Header';
import { fetchCurrentUser } from './actions';

// 'route' contains all the matched components nested inside the app route
// that needs to be rendered along with the App component
const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};

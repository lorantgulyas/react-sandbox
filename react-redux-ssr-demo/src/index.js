import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import Routes from './client/Routes';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore();

  // Initialize store logic and data based on what components need  to be rendered
  // Let's see what to render based on path
  // call all of these loadData function, each of them should return a promise representing the pending api request
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });

  // Convert all the pending promises to a single one
  // when it's resolved => render the app on the server with all the preloaded data
  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

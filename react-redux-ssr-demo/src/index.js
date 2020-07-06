import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import Routes from './client/Routes';

const app = express();

// Forward all matching request
app.use('/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    // next line is necessary for this api server only
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  })
);
app.use(express.static('public'));
// app.get('*', (req, res) => {
//   const store = createStore(req);

//   // Initialize store logic and data based on what components need  to be rendered
//   // Let's see what to render based on path
//   // call all of these loadData function, each of them should return a promise representing the pending api request
//   const promises = matchRoutes(Routes, req.path).map(({ route }) => {
//     return route.loadData ? route.loadData(store) : null;
//   });

//   // Convert all the pending promises to a single one
//   // when it's resolved => render the app on the server with all the preloaded data
//   Promise.all(promises).then(() => {
//     const context = {};
//     const content = renderer(req, store, context);
//     if (context.notFound) {
//       res.status(404);
//     }
//     res.send(content);
//   });

// });
app.get('*', (req, res) => {
  const store = createStore(req);

  // ADVANCED error handling below:
  // if any loadData() promise fails -> Promise.all fails immediately => catch branch will be executed immediately
  // some loadData() might still be pending and the rendered page will not be as complete as it might be 
  // (if all promises are waited to be finished, no matter if they fail or succeed) 
  // Solution -> Wrap each promise with another promise 
  // If inner fails/succeds outer promise will be resolved, if inner promise pending outer promise pending too
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  }).map(promise => {
    if (promise) { // if previous mapping resulted in null do nothing
      return new Promise((resolve, reject) => { // the outer promise
        promise.then(resolve).catch(resolve) // resolve it instantly whenever the inner promise succeeds or fails
      });
    }
  });

  // Convert all the pending promises to a single one
  // when inner promise finished -> outer promise succeds -> always .then branch will run
  // -> render the app on the server with all the preloaded data
  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  });

});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

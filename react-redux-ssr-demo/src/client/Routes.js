import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import App from './App';

export default [
  // No path to App component means it'll always be rendered
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...UsersListPage,
        path: "/users",
      }
    ]
  }
];

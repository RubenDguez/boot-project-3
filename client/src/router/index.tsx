import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Authentication, Landing, NotFound } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <NotFound />,
  },
  {
    path: '/signup',
    element: <Authentication.SignUp />,
  },
  {
    path: '/login',
    element: <Authentication.Login />,
  },

  {
    path: '/app',
    element: <App />,
    errorElement: <NotFound />,
    children: [],
  },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Authentication, Landing, Main, NotFound } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Landing />,
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
        element: <Main />,
      },
    ],
  },
]);

export default router;

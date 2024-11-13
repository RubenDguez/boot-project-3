import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Authentication, Landing, Main, NotFound, Calendar } from '../pages';

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
      {
        path: '/calendar',
        element: <Calendar />,
      }
    ],
  },
]);

export default router;

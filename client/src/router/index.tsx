import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Authentication, CharitySearch, HelpBoard, Landing, Main, NotFound, ServiceCalendar } from '../pages';

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
        children: [
          {
            path: '/app/charity-search',
            element: <CharitySearch />,
          },
          {
            path: '/app/service-calendar',
            element: <ServiceCalendar />,
          },
          {
            path: '/app/help-board',
            element: <HelpBoard />,
          },
        ],
      },
    ],
  },
]);

export default router;

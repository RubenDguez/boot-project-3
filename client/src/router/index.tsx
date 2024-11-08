import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { NotFound } from "../pages";

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
      ]
    },
    {
      path: '/app',
      element: <App />,
      errorElement: <NotFound />,
      children: [
      ]
    },
  ])

export default router;

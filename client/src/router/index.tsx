import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <h1 className='display-2'>Wrong page!</h1>,
      children: [
      ]
    }
  ])

export default router;

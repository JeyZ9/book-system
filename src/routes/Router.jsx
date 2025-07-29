import { createBrowserRouter } from "react-router";
import Add from "../pages/Add";
import Home from "../pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <Add />,
  },
]);
export default router;

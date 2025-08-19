import { createBrowserRouter } from "react-router";
import Home from "../Page/Home";
import Update from "../Page/Update";
import Form from "../Page/Form";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
        {
        path: "/add",
        element: <Form />,
    },
    {
        path: "/update/:id",
        element: <Update />,
    }
]);
export default router;
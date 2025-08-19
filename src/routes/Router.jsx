import { createBrowserRouter } from "react-router";
import Home from "../Page/Home";
import Form from "../Page/Form";
import Update from "../Page/Update";
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
        element: <Update />
    }
]);

export default router;

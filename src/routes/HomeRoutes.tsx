import { createBrowserRouter } from "react-router-dom";
import { Menu } from "../components/headers/Menu";
import { HomeLayout } from "../layouts/HomeLayout";

const HomeRoute = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
    },
]);




export { HomeRoute } 
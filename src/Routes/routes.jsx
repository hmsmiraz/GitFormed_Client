import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Home/Login/Login";
import Register from "../Pages/Home/Register/Register";
import CreateRepo from "../Pages/Home/CreateRepo/CreateRepo";
import Repositories from "../Pages/Home/Repositories/Repositories";
import WatchList from "../Pages/Home/Watchlist/WatchList";
import PullReqList from "../Pages/Home/PullReqList/PullReqList";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/createRepo",
        element: (
          <PrivateRoutes>
            <CreateRepo></CreateRepo>
          </PrivateRoutes>
        ),
      },
      {
        path: "/repositories",
        element: (
          <PrivateRoutes>
            <Repositories></Repositories>
          </PrivateRoutes>
        ),
      },
      {
        path: "/watchList",
        element: (
          <PrivateRoutes>
            <WatchList></WatchList>
          </PrivateRoutes>
        ),
      },
      {
        path: "/pullReqList",
        element: (
          <PrivateRoutes>
            <PullReqList></PullReqList>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

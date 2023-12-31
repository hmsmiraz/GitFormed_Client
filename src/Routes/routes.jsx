import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Home/Login/Login";
import Register from "../Pages/Home/Register/Register";
import CreateRepo from "../Pages/Home/CreateRepo/CreateRepo";
import Repositories from "../Pages/Home/Repositories/Repositories";
import WatchList from "../Pages/Home/Watchlist/WatchList";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/createRepo',
            element: <CreateRepo></CreateRepo>
        },
        {
            path: '/repositories',
            element: <Repositories></Repositories>
        },
        {
            path: '/watchList',
            element: <WatchList></WatchList>
        },
      ]
    },
  ]);
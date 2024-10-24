import { useState } from 'react';
import Login from "./components/login";
import Register from "./components/register";
import Header from "./components/header";
import Home from "./components/home";
import Readlist from "./components/readlist";
import { AuthProvider } from "./auth_context";
import { useRoutes } from "react-router-dom";
import './App.css';



function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/readlist",
      element: <Readlist />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
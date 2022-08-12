import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appRoutes } from "./routes/appRoutes";
import { setNavigate } from './utils/utils'

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>

        {appRoutes.map((route) => {
          return (

            <Route key={route.key} {...route} element={<route.component />} />
          );
        })}
      </Routes>
    </>

  );
}

export default App;

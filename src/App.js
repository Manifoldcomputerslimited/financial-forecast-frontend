import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";
import { setNavigate } from './utils/utils'

function App() {

  return (
    <Routes>
      {appRoutes.map((route) => {
        return (
          <Route key={route.key} {...route} element={<route.component />} />
        );
      })}
    </Routes>
  );
}

export default App;

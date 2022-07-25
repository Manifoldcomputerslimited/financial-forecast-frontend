import React from "react";
import { Route, Routes } from "react-router-dom";
// import { Login } from "./pages/Login";
import { appRoutes } from "./routes/appRoutes";

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

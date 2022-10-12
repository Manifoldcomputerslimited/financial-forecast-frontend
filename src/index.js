import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { store } from './redux/store'
import { Axios } from './api/instances'

import "./index.css";
import { config } from "@fortawesome/fontawesome-svg-core";


const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient()

root.render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import "./pokemon.css";
import "./normalize.css";
import App from "./main/App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import dotenv from "dotenv";

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3020";
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { LoaderProvider } from "./services/Loader/LoaderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();

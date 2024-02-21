import React from "react";
import MainRoutes from "./layout/routing/Routes";
import ToastMessages from "./services/ToastMessages";
function App() {
  return (
    <div className="App">
      <ToastMessages />
      <MainRoutes />
    </div>
  );
}

export default App;

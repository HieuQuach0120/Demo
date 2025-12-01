import React from "react";
import { createContext, useState } from "react";
import "./App.css";
import "../src/acess/css/layout.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme CSS (choose a theme)
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css";

import Login from "./components/login";
import Register from "./components/register";
import { ProgressSpinner } from "primereact/progressspinner";
import { privateRoutes } from "./route/index";
import LayoutComponent from "./components/layout";
export const AppContext = createContext<any>(null);

function App() {
  const [spinner, setSpinner] = useState(false);
  //
  const progressspinner = () => {
    return (
      <div className="progress-spinner">
        <ProgressSpinner strokeWidth="3" />
      </div>
    );
  };
  return (
    <div className="App">
      {spinner && progressspinner()}
      <AppContext.Provider value={{ spinner, setSpinner }}>
        <Router>
          <Routes>
            {<Route path="/login" element={<Login />} />}
            {<Route path="/register" element={<Register />} />}
            <Route path="/" element={<LayoutComponent />}>
              {privateRoutes.map((route, index) => {
                return <React.Fragment key={index}>{route}</React.Fragment>;
              })}
            </Route>
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;

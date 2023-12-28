import React from 'react';
import { createContext, useState } from "react";
import './App.css';
import '../src/acess/css/layout.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/login';
import {privateRoutes} from './route/index';
export const AppContext = createContext<any>(null);

function App() {
  const [spinner, setSpinner] = useState(false);
 //
  return (
    <div className="App">
      <AppContext.Provider value={{ spinner, setSpinner }}>
        <Router>
          <Routes>
          {<Route path="/" element={<Login />} />}
            {privateRoutes.map((route, index) => {
              return (
                <>
                </>
              )
            })}
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;

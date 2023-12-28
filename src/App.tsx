import React from 'react';
import './App.css';
import '../src/acess/css/layout.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/login';
import {privateRoutes} from './route/index';

function App() {
 //
  return (
    <div className="App">
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
    </div>
  );
}

export default App;

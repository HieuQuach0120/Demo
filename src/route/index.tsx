import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/home-page/index";
import DetailComponent from "../components/detail";
import MemberComponent from "../components/member";
<<<<<<< HEAD
=======
import Forgot from "../components/forgot/forgot";

>>>>>>> forgot-password

const privateRoutes = [
  <Route path="/" element={<HomePage />}></Route>,
  <Route path="/detail" element={<DetailComponent />}></Route>,
  <Route path="/member" element={<MemberComponent />}></Route>,
];

export { privateRoutes };

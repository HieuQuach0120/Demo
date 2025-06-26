import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/home-page/index";
import DetailComponent from "../components/detail";
import MemberComponent from "../components/member";
import LoginComponent from "../components/login";
import RegisterComponent from "../components/register";

const privateRoutes = [
  <Route path="/" element={<HomePage />}></Route>,
  <Route path="/detail" element={<DetailComponent />}></Route>,
  <Route path="/member" element={<MemberComponent />}></Route>,
  <Route path="/login"  element={<LoginComponent />}></Route>,
  <Route path="/register" element={<RegisterComponent />}></Route>,

];

export { privateRoutes };

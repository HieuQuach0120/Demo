import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/home-page/index";
import DetailComponent from "../components/detail";
import MemberComponent from "../components/member";
import Forgot from "../components/forgot/forgot";
import WeatherComponent from "../components/weather";
import UserComponent from "../components/profile/index";


const privateRoutes = [
  <Route path="/" element={<HomePage />}></Route>,
  <Route path="/detail" element={<DetailComponent />}></Route>,
  <Route path="/member" element={<MemberComponent />}></Route>,
  <Route path="/weather" element={<WeatherComponent />}></Route>,
  <Route path="/profile" element={<UserComponent />}></Route>,
];

export { privateRoutes };

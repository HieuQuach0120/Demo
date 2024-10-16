import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../components/home-page/index";
import DetailComponent from "../components/detail";

const privateRoutes = [
  <Route path="/" element={<HomePage />}></Route>,
  <Route path="/detail" element={<DetailComponent />}></Route>,
];

export { privateRoutes };

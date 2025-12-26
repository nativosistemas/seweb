import React from 'react';
import { HashRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from './pages/Dashboard';
import Estrellas from './pages/Estrellas';
import Ajustes from './pages/Ajustes';
import Config from './pages/Config';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="stars" element={
            <PrivateRoute>
              <Estrellas />|
            </PrivateRoute>
          } />
          <Route path="config" element={
            <PrivateRoute>
              <Config />
            </PrivateRoute>
          } />
          <Route path="ajustes" element={
            <PrivateRoute>
              <Ajustes />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;

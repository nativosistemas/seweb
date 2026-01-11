import React from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Login from "./components/Login";
import Estrellas from './pages/Estrellas';
import Ajustes from './pages/Ajustes';
import Config from './pages/Config';
import Logs from './pages/Logs';
import AstroTracking from './pages/AstroTracking';
import Calibracion from './pages/Calibracion';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/seweb">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={
            <PrivateRoute>
              <Estrellas />
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

          <Route path="logs" element={
            <PrivateRoute>
              <Logs />
            </PrivateRoute>
          } />
          <Route path="astrotracking" element={
            <PrivateRoute>
              <AstroTracking />
            </PrivateRoute>
          } />
          <Route path="calibracion" element={
            <PrivateRoute>
              <Calibracion />
            </PrivateRoute>
          } />
        </Route>
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404</h1>
            <p>Ups! Esta ruta no existe.</p>
            <Link to="/">Volver al inicio</Link>
          </div>
        } />
      </Routes>
    </BrowserRouter >
  );
}


export default App;

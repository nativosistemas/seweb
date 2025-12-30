import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Para el botón volver
import { getUrl, getToken } from '../components/utils';
import { ModalAlert } from '../components/ModalAlert';

const Config = () => {
  const navigate = useNavigate();


  // 1. Estado para todos los campos del formulario
  const [config, setConfig] = useState({
    latitude: 0.0,
    longitude: 0.0,
    h_min: 0.0,
    h_max: 0.0,
    v_min: 0.0,
    v_max: 0.0,
    h_calibrate: 0.0,
    v_calibrate: 0.0,
    device_name: '',
    v_sentido: false,
    h_sentido: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Manejador genérico para inputs
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    // Quitamos el prefijo "txt_" para que coincida con las llaves del estado
    const fieldName = id.replace('txt_', '');

    setConfig({
      ...config,
      [fieldName]: type === 'checkbox' ? checked : value
    });
  };

  const onClickGrabarConfig = () => {
    console.log("Grabando configuración:", config);
    alert("Configuración enviada");
  };
  const fetchConfig = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(getUrl() + "/logs", { // Ajusta el endpoint "/logs"
        method: "GET", // O POST dependiendo de tu API
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + getToken()
        }
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`);
      }

      const data = await response.json();
      //setLogs(data); // Guardamos el JSON en el estado

    } catch (err) {
      console.error("Error al obtener logs:", err);
      setError("No se pudieron cargar los logs: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);
  
  if (isLoading) return  <ModalAlert isLoading={isLoading}></ModalAlert>;
  if (error) return <div className="alert alert-danger m-4">{error} <button onClick={fetchConfig} className="btn btn-sm btn-outline-danger ms-3">Reintentar</button></div>;

  return (
    <div className="container mt-4">
      {isLoading && <div className="loading">Loading…</div>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Configuración</h2>
        {/*   <button onClick={fetchLogs} className="btn btn-primary btn-sm">Actualizar</button>*/}
      </div>

      <div className="row row-cols-1 row-cols-md-2">
        <div className="col">
          {/* Inputs Numéricos */}
          {[
            { id: 'txt_latitude', label: 'Latitud' },
            { id: 'txt_longitude', label: 'Longitud' },
            { id: 'txt_h_min', label: 'Horizontal Grados Min' },
            { id: 'txt_h_max', label: 'Horizontal Grados Max' },
            { id: 'txt_v_min', label: 'Vertical Grados Min' },
            { id: 'txt_v_max', label: 'Vertical Grados Max' },
            { id: 'txt_h_calibrate', label: 'Horizontal Calibrate' },
            { id: 'txt_v_calibrate', label: 'Vertical Calibrate' },
          ].map((field) => (
            <div className="mb-3" key={field.id}>
              <label htmlFor={field.id} className="form-label">{field.label}</label>
              <input
                type="number"
                className="form-control"
                id={field.id}
                onChange={handleChange}
                placeholder="0.0"
              />
            </div>
          ))}

          <div className="mb-3">
            <label htmlFor="txt_device_name" className="form-label">Device Name</label>
            <input type="text" className="form-control" id="txt_device_name" onChange={handleChange} />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="txt_v_sentido" onChange={handleChange} />
            <label className="form-check-label" htmlFor="txt_v_sentido">Vertical Sentido</label>
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="txt_h_sentido" onChange={handleChange} />
            <label className="form-check-label" htmlFor="txt_h_sentido">Horizontal Sentido</label>
          </div>

          <button type="button" className="btn btn-primary w-100" onClick={onClickGrabarConfig}>Grabar Configuración</button>
        </div>

        <div className="col mt-4 mt-md-0">
          <div id="divMsg" className="p-3 border bg-light rounded">
            {/* Aquí puedes mostrar mensajes de estado */}
            <small className="text-muted">Estado del sistema listo.</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Config;
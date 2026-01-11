import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { getUrl, getToken } from '../components/utils';
import { ModalAlert } from '../components/ModalAlert';
import { Card } from "react-bootstrap";



const Config = () => {
  const navigate = useNavigate();

  // 1. Estado alineado EXACTAMENTE con la clase ConfigAnt de .NET
  const [config, setConfig] = useState({
    latitude: 0.0,
    longitude: 0.0,
    altitude: 0.0,
    horizontal_grados_min: 0.0,
    horizontal_grados_max: 0.0,
    vertical_grados_min: 0.0,
    vertical_grados_max: 0.0,
    horizontal_grados_calibrate: 0.0,
    vertical_grados_calibrate: 0.0,
    device_name: '',
    vertical_sentido: 1, // Usamos 1 o -1 según el double de C#
    horizontal_sentido: 1
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorDetalle, setErrorDetalle] = useState(null);

  async function sendConfig(config, pWithIsLoading = true) {
    var result = null;
    const json = {
      latitude: config.latitude,
      longitude: config.longitude,
      horizontal_grados_min: config.horizontal_grados_min,
      horizontal_grados_max: config.horizontal_grados_max,
      vertical_grados_min: config.vertical_grados_min,
      vertical_grados_max: config.vertical_grados_max,
      horizontal_grados_calibrate: config.horizontal_grados_calibrate,
      vertical_grados_calibrate: config.vertical_grados_calibrate,
      device_name: config.device_name,
      vertical_sentido: config.vertical_sentido,
      horizontal_sentido: config.horizontal_sentido
    };
    if (pWithIsLoading) {
      setIsLoading(true);
    }
    //setErrorDetalle(null);
    setError(null);
    try {
      const response = await fetch(getUrl() + "/setConfig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + getToken() // Asegúrate de que el token esté en el formato correcto
        },
        body: JSON.stringify(json)
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      if (response.ok) {
        const data = await response.json();// await response.json(); // <--- ESTO es lo que te falta
        result = data;
        if (data != null && data.typeStatusApi !== undefined && data.typeStatusApi === "error") {
          setConfig(data.configAnt);
        }
        //  console.log("Respuesta del servidor:", data);
      }
    } catch (err) {
      //fetchConfig();// buscar valor servidor
      //setErrorDetalle(err.message);
      setError(err.message);
    } finally {
      if (pWithIsLoading) {
        setIsLoading(false);
      }
    }
    return result;
  }
  const irLogs = () => {
    navigate("/logs");
  };
  const irAstroTracking = () => {
    navigate("/astrotracking");
  };
  const llamarApiResetToZero = async () => {
    var result = null;
    setIsLoading(true);
    setErrorDetalle(null);
    try {
      const response = await fetch(getUrl() + "/antResetZero", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + getToken() // Asegúrate de que el token esté en el formato correcto
        }
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      if (response.ok) {
        const data = await response.text();// await response.json(); // <--- ESTO es lo que te falta
        result = data;

      }
    } catch (err) {
      setErrorDetalle(err.message);
    } finally {
      setIsLoading(false);
    }
    return result;
  }

  const llamarApiResetear = async () => {

    var result = null;

    setIsLoading(true);

    setErrorDetalle(null);
    //setError(null);
    try {
      const response = await fetch(getUrl() + "/resetear_baseDatos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + getToken() // Asegúrate de que el token esté en el formato correcto
        }
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      if (response.ok) {
        const data = await response.text();// await response.json(); // <--- ESTO es lo que te falta
        result = data;
      }
      fetchConfig();
    } catch (err) {
      //fetchConfig();// buscar valor servidor
      setErrorDetalle(err.message);
      //setError(err.message);
    } finally {
      setIsLoading(false);
    }
    return result;
  }
  const fetchConfig = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(getUrl() + "/getConfig", {
        headers: {
          "Authorization": "Bearer " + getToken()
        }
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setConfig(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchConfig(); }, [fetchConfig]);

  const handleChange = async (e) => {
    const { id, value, type, checked } = e.target;
    const fieldName = id.replace('txt_', '');

    let finalValue = value;

    // Manejo especial para que el checkbox mande 1 o -1 al double de C#
    if (type === 'checkbox') {
      finalValue = checked ? 1 : -1;
    } else if (type === 'number') {
      finalValue = parseFloat(value);
    }
    // Crear el nuevo objeto actualizado
    const newConfig = {
      ...config,
      [fieldName]: finalValue,
    };



    setConfig(newConfig);
    //prev => ({ ...prev, [fieldName]: finalValue }));
    // Ejemplo de uso

     await sendConfig(newConfig, false);
    //console.log("Respuesta del servidor:", result);
  };

  const onClickGrabarConfig = async () => {
     await sendConfig(config);
  };

  if (isLoading) return <ModalAlert isLoading={isLoading} />;
  if (error) return <div className="alert alert-danger m-4">{error} <button onClick={fetchConfig} className="btn btn-sm btn-outline-danger ms-3">Reintentar</button></div>;

  return (
    <div className="container mt-4">
      <h2>Configuración del Sistema</h2>
      {errorDetalle && (
        <div
          className="alert alert-danger alert-dismissible fade show w-100 m-4"
          role="alert"
          style={{
            borderRadius: 0, // Esquinas rectas para que parezca parte de la barra
            borderLeft: 0,
            borderRight: 0,
            fontSize: '0.9rem',
            padding: '10px 20px'
          }}
        >
          {errorDetalle}
          <button
            type="button"
            className="btn-close" // En Bootstrap 5 se usa btn-close
            onClick={() => setErrorDetalle(null)}
            aria-label="Close"
            style={{ float: 'right', background: 'none', border: 'none', fontWeight: 'bold' }}
          >
            &times;
          </button>
        </div>
      )/*<div className="alert alert-danger m-4">{errorDetalle}</div>*/}
      <div className="row">
        <div className="col-md-6">
          {/* Mapeo dinámico con los nombres de la clase C# */}
          {[
            { id: 'latitude', label: 'Latitud' },
            { id: 'longitude', label: 'Longitud' },
            { id: 'altitude', label: 'Altitud' },
            { id: 'horizontal_grados_min', label: 'H-Grados Min' },
            { id: 'horizontal_grados_max', label: 'H-Grados Max' },
            { id: 'vertical_grados_min', label: 'V-Grados Min' },
            { id: 'vertical_grados_max', label: 'V-Grados Max' },
            { id: 'horizontal_grados_calibrate', label: 'H-Calibración' },
            { id: 'vertical_grados_calibrate', label: 'V-Calibración' },
          ].map((f) => (
            <div className="mb-3" key={f.id}>
              <label className="form-label">{f.label}</label>
              <input
                type="number"
                className="form-control"
                id={`txt_${f.id}`}
                value={config[f.id] || 0}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Nombre del Dispositivo</label>
            <input
              type="text"
              className="form-control"
              id="txt_device_name"
              value={config.device_name || ''}
              onChange={handleChange}
            />
          </div>

          {/* Checkboxes manejados como sentido (1 o -1) */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="txt_horizontal_sentido"
              checked={config.horizontal_sentido === 1}
              onChange={handleChange}
            />
            <label className="form-check-label">Invertir Sentido Horizontal</label>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="txt_vertical_sentido"
              checked={config.vertical_sentido === 1}
              onChange={handleChange}
            />
            <label className="form-check-label">Invertir Sentido Vertical</label>
          </div>

          <button className="btn btn-primary w-100" onClick={onClickGrabarConfig}>
            Grabar en Servidor
          </button>
        </div>
        <div className="col-md-6">


          <Card className="m-3">
            <Card.Header>
              <h5>Opciones</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-info d-flex align-items-center" onClick={irAstroTracking}><i className="bi bi-list-columns-reverse me-2"></i>
                  Ver Astro Tracking</button>
                <button className="btn btn-outline-info d-flex align-items-center" onClick={irLogs}><i className="bi bi-list-columns-reverse me-2"></i>
                  Ver Logs</button>
                <button className="btn btn-outline-warning" onClick={llamarApiResetToZero}>Poner en cero</button>
                <button className="btn btn-danger" onClick={llamarApiResetear}>Resetear</button>
              </div>
            </Card.Body>
          </Card>




          {/* <div className="d-flex gap-2">
          <button className="btn btn-danger" onClick={llamarApiClean}>Resetear</button>
          <button className="btn btn-outline-info d-flex align-items-center" onClick={irLogs}><i className="bi bi-list-columns-reverse me-2"></i>
            Ver Logs</button>

          <button className="btn btn-secondary" onClick={llamarApiRestore}>Restore</button>
        </div> */}

        </div>
      </div>
    </div >
  );
};

export default Config;
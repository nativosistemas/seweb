import React, { useState, useEffect, useCallback } from 'react';
import { getUrl, getToken } from '../components/utils';
import { ModalAlert } from '../components/ModalAlert';

const Config = () => {
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

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const fieldName = id.replace('txt_', '');

    let finalValue = value;
    
    // Manejo especial para que el checkbox mande 1 o -1 al double de C#
    if (type === 'checkbox') {
      finalValue = checked ? 1 : -1;
    } else if (type === 'number') {
      finalValue = parseFloat(value);
    }

    setConfig(prev => ({ ...prev, [fieldName]: finalValue }));
  };

  const onClickGrabarConfig = async () => {
    // Aquí deberías hacer el fetch POST a tu API
    console.log("Enviando a .NET:", config);
    alert("Configuración enviada correctamente");
  };

  if (isLoading) return <ModalAlert isLoading={isLoading} />;
  if (error) return <div className="alert alert-danger m-4">{error} <button onClick={fetchConfig} className="btn btn-sm btn-outline-danger ms-3">Reintentar</button></div>;

  return (
    <div className="container mt-4">
      <h2>Configuración del Sistema</h2>
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
      </div>
    </div>
  );
};

export default Config;
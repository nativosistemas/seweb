import React, { useState, useEffect, useCallback } from 'react';
import { getUrl, getToken } from '../components/utils';
import { ModalAlert } from '../components/ModalAlert';


export default function AstroTracking() {
  const [astroTracking, setAstroTracking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAstroTracking = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(getUrl() + "/astrotracking", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + getToken()
        }
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`);
      }

      const data = await response.json();
      setAstroTracking(data); // Guardamos el JSON en el estado

    } catch (err) {
      //console.error("Error al obtener logs:", err);
      setError("No se pudieron cargar los registros: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 3. Ejecutamos el fetch al montar el componente
  useEffect(() => {
    fetchAstroTracking();
  }, [fetchAstroTracking]);

  // 4. Renderizado condicional
  if (isLoading) return <ModalAlert isLoading={isLoading}></ModalAlert>;
  if (error) return <div className="alert alert-danger m-4">{error} <button onClick={fetchAstroTracking} className="btn btn-sm btn-outline-danger ms-3">Reintentar</button></div>;

  if (!astroTracking || astroTracking.length === 0) {
     return <p className="text-muted">No hay registros disponibles.</p>;
   }
 
 // if (astroTracking && astroTracking.length > 0) {
    let columnas = Object.keys(astroTracking[0]);

    //mover la columna "status" a la posición 3
    const idx = columnas.indexOf("status");
    if (idx > -1) {
      columnas.splice(idx, 1);              // lo sacamos de donde esté
      columnas.splice(2, 0, "status");      // lo insertamos en la posición 3
    }

  //}



  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Astro Tracking</h2>
        <button onClick={fetchAstroTracking} className="btn btn-primary btn-sm">Actualizar</button>
      </div>


      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              {columnas.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(!astroTracking || astroTracking.length === 0) ? (
              <tr>
                <td colSpan={columnas.length} className="text-center">
                  No hay registros disponibles
                </td>
              </tr>
            ) : (
              astroTracking.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {columnas.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        maxWidth: "500px",       // límite de ancho por celda
                        whiteSpace: "nowrap",    // evita salto de línea
                        overflow: "hidden",      // oculta exceso
                        textOverflow: "ellipsis" // agrega "..."
                      }}
                      title={item[col] !== null && item[col] !== undefined ? item[col].toString() : "-"} // tooltip con valor completo
                    >
                      {item[col] !== null && item[col] !== undefined
                        ? item[col].toString()
                        : "-"}
                    </td>
                  ))}
                </tr>
              )))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};





// Ejemplo de uso
const registrosEjemplo = [
  {
    publicID: "4e8fc582-b903-4b3e-a097-588e5dc8f098",
    type: "star",
    date: "2026-01-04T01:30:24.4489134",
    ra: 131.32202815495253,
    dec: -54.786603893774846,
    altitude: null,
    azimuth: null,
    h: null,
    v: null,
    info: null,
    tracking: false,
    status: "noResponseEsp32",
    statusUpdateDate: "2026-01-04T01:31:08.8283437",
    sessionDevice_publicID: "00000000-0000-0000-0000-000000000000",
    sessionApp_publicID: "e5c0494e-6477-42b3-8be5-6d062a02ea54",
    isLaser: 0,
    _h_calibrate: null,
    _v_calibrate: null,
    device_name: "esp32_stepper_laser"
  }
];



/*export default function AstroTracking() {
  return <RegistroTable registros={registrosEjemplo} />;
}*/
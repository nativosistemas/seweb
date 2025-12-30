import React, { useState, useEffect, useCallback } from 'react';
import { getUrl, getToken } from '../components/utils';
import { ModalAlert } from '../components/ModalAlert';

const ListaLogs = () => {
    // 1. Definimos el estado para los logs y el estado de carga
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Creamos la función fetch envuelta en useCallback
    const fetchLogs = useCallback(async () => {
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
            setLogs(data); // Guardamos el JSON en el estado

        } catch (err) {
            console.error("Error al obtener logs:", err);
            setError("No se pudieron cargar los logs: " + err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 3. Ejecutamos el fetch al montar el componente
    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    // 4. Renderizado condicional
    if (isLoading) return <ModalAlert isLoading={isLoading}></ModalAlert>;
    if (error) return <div className="alert alert-danger m-4">{error} <button onClick={fetchLogs} className="btn btn-sm btn-outline-danger ms-3">Reintentar</button></div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Registros del Sistema</h2>
                <button onClick={fetchLogs} className="btn btn-primary btn-sm">Actualizar</button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered shadow-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Mensaje</th>
                            <th>Stack Trace</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 ? (
                            logs.map((log) => (
                                <tr key={log.id}>
                                    <td>{log.id}</td>
                                    <td>{new Date(log.fecha).toLocaleString()}</td>
                                    <td>
                                        <span className="fw-bold">{log.message}</span>
                                        <br />
                                        <small className="text-muted">{log.app}</small>
                                    </td>
                                    <td>
                                        <details>
                                            <summary className="text-primary" style={{ cursor: 'pointer' }}>Detalle</summary>
                                            <pre className="mt-2 p-2 bg-light border rounded" style={{ fontSize: '0.75rem' }}>
                                                {log.stackTrace}
                                            </pre>
                                        </details>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="text-center">No hay registros disponibles.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListaLogs;
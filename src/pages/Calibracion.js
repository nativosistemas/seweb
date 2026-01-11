import React, { useState, useEffect, useCallback ,useRef } from 'react';
//import { useNavigate } from "react-router-dom";
import { getUrl, getToken } from '../components/utils';
import { ModalAlert } from '../components/ModalAlert';
import { Card } from "react-bootstrap";
import { ComponenteEstrellas } from '../components/ComponenteEstrellas';

const Calibracion = () => {
    //const navigate = useNavigate();


   // const [itemSeleccionado_hip, setItemSeleccionado_hip] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorDetalle, setErrorDetalle] = useState(null);

    const [horizontal_grados_calibrate, setHorizontal_grados_calibrate] = useState(null);
    const [vertical_grados_calibrate, setVertical_grados_calibrate] = useState(null);

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

      const hijoRef = useRef(null);

  const llamar_funcionRecargarAstro = () => {
    // Usás la referencia para invocar la función del hijo
    hijoRef.current?.funcionRecargarAstro();
  };



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
            setHorizontal_grados_calibrate(data.horizontal_grados_calibrate); 
            setVertical_grados_calibrate(data.vertical_grados_calibrate); 
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchConfig(); }, [fetchConfig]);

    const handleAccionCalibracion = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(getUrl() + "/setConfig_calibrate?horizontal_grados_calibrate=" + horizontal_grados_calibrate + "&vertical_grados_calibrate=" + vertical_grados_calibrate, {
                headers: {
                    "Authorization": "Bearer " + getToken()
                }
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            //const data = await response.json();
            //setConfig(data);
            llamar_funcionRecargarAstro();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => { fetchConfig(); }, [fetchConfig]);



    //if (isLoading) return <ModalAlert isLoading={isLoading} />;
    if (error) return <div className="alert alert-danger m-4">{error} <button onClick={fetchConfig} className="btn btn-sm btn-outline-danger ms-3">Reintentar</button></div>;

    return (
        <div className="container mt-4">
            <h2>Calibración</h2>
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
                    <ComponenteEstrellas  ref={hijoRef}   />
                </div>
                <div className="col-md-6">


                    <Card className="m-3">
                        <Card.Header>
                            <h5>Opciones</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <label htmlFor="miInput_horizontal" className="form-label">
                                    Horizontal
                                </label>
                                <input
                                    type="number"
                                    id="miInput_horizontal"
                                    className="form-control"
                                    value={horizontal_grados_calibrate}
                                    onChange={(e) => setHorizontal_grados_calibrate(e.target.value)}
                                    placeholder=""
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="miInput_vertical" className="form-label">
                                    Vertical
                                </label>
                                <input
                                    type="number"
                                    id="miInput_vertical"
                                    className="form-control"
                                    value={vertical_grados_calibrate}
                                    onChange={(e) => setVertical_grados_calibrate(e.target.value)}
                                    placeholder=""
                                />
                            </div>
                            <button className="btn btn-primary" onClick={handleAccionCalibracion}>
                                Ejecutar Acción
                            </button>

                        </Card.Body>
                    </Card>






                </div>
            </div>
        <ModalAlert isLoading={isLoading}></ModalAlert>
        </div >
    );
};

export default Calibracion;
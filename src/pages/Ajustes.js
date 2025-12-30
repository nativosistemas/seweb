import React, { useState, useEffect, useCallback } from 'react';
//import { Form, Button, Row, Col } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
import { RangeValue } from '../components/RangeValue';
import { ModalAlert } from '../components/ModalAlert';
import { CardData } from '../components/CardData';
import { getUrl, getToken } from '../components/utils';

export default function Ajustes() {
  // Inicializa los dos ángulos de 0 a 180
  const [anguloH, setAnguloH] = useState(0);
  const [anguloV, setAnguloV] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModo, setIsModo] = useState(true);
  const [titulo, setTitulo] = useState(null);
  const [mensajeCardClick, setMensajeCardClick] = useState(null);




  const fetchAjustes = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(getUrl() + "/lastvalueservo", {
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
      //setEstrellas(data); // Guardamos el JSON en el estado
      if (data !== null && data !== undefined) {
        if (data.h_now != null) {
          setAnguloH(data.h_now);
        }
        if (data.v_now != null) {
          setAnguloV(data.v_now);
        }
      }

    } catch (err) {
      console.error("Error al obtener astros:", err);
      //setError("No se pudieron cargar los astros: " + err.message);
      setError("Ups, algo falló. Prueba más tarde. Log: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAjustes();
  }, [fetchAjustes]);

  // 4. Renderizado condicional
  if (isLoading) return    <>  <ModalAlert isLoading={isLoading}></ModalAlert></>;
  if (error) return <div className="alert alert-danger m-4">{error} <button onClick={fetchAjustes} className="btn btn-sm btn-outline-danger ms-3">Reintentar</button></div>;

  const actualizarValorH = (nuevoValor) => {
    setAnguloH(nuevoValor);
    enviarInfoAnt(nuevoValor, anguloV);
  };

  const actualizarValorV = (nuevoValor) => {
    setAnguloV(nuevoValor);
    enviarInfoAnt(anguloH, nuevoValor);
  };


  const enviarInfoAnt = (h, v) => {
    // e.preventDefault();
    if (!isLoading) {
      setTitulo('Cargando...');
      setMensajeCardClick(null);
      setIsLoading(true);

      var data = {};
      //data.hip = e.hip;
      data.type = 'servoAngle';
      data.ra_h = h;
      data.dec_v = v;
      var json = JSON.stringify(data);

      fetch(getUrl() + "/actionAnt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + getToken() // Asegúrate de que el token esté en el formato correcto
        },
        body: json
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.msg === "Ok") {
            setTitulo("Listo"); setMensajeCardClick("Ángulos actualizados");
          } else {
            setTitulo("Resultado"); setMensajeCardClick(data.msg);
          }
          if (data.h_now !== null && data.h_now !== anguloH) { setAnguloH(data.h_now); }
          if (data.v_now !== null && data.v_now !== anguloV) { setAnguloV(data.v_now); }
        })
        .catch((err) => { console.error("Error:", err); setTitulo(null); })
        .finally(() => { setIsLoading(false); });
    }
  }

  // 3. Define el controlador de eventos (Handler)
  const handleCheckboxChange = (event) => {
    // a. Obtén el nuevo valor booleano (true/false)
    const nuevoEstado = event.target.checked;

    // b. Actualiza el estado del componente
    setIsModo(nuevoEstado);


  };


  return (
    <div className="container">
      <h3>Control de Ángulos (0&deg; a 180&deg;)</h3>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value={isModo} checked={isModo} id="flexCheckDefault" onChange={handleCheckboxChange}></input>
        <label class="form-check-label" for="flexCheckDefault">
          Modo
        </label>
      </div>
      <RangeValue modo={isModo} initialLabel='H' valor={anguloH} onValueChange={actualizarValorH} ></RangeValue>
      <RangeValue modo={isModo} initialLabel='V' valor={anguloV} onValueChange={actualizarValorV} ></RangeValue>

      {isLoading && <ModalAlert isLoading={isLoading}></ModalAlert>}
      <CardData titulo={titulo} mensajeCardClick={mensajeCardClick}></CardData>
    </div>
  );
}
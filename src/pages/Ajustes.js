import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
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
  const [titulo, setTitulo] = useState(null);
  const [mensajeCardClick, setMensajeCardClick] = useState(null);
  // 2. Crear la función que actualiza este estado
  const actualizarValorH = (nuevoValor) => {
    setAnguloH(nuevoValor);
    enviarInfoAnt();
  };
  const actualizarValorV = (nuevoValor) => {
    setAnguloV(nuevoValor);
    enviarInfoAnt();
  };

  //const user = localStorage.getItem('user');//JSON.parse(); // Asumiendo que guardas los datos del usuario
  /* const handleSliderChange = (newValues) => {
     // newValues es un array, e.g., [nuevo_angulo_1, nuevo_angulo_2]
     setAngulos(newValues);
   };*/



  const enviarInfoAnt = () => {
    // e.preventDefault();
    setTitulo('Cargando...');
    setIsLoading(true); 
    var data = {};
    //data.hip = e.hip;
    data.type = 'servoAngle';
    data.ra_h = anguloH;
    data.dec_v = anguloV;
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
      .then((data) => { setTitulo("Resultado"); setMensajeCardClick(data.msg); })
      .catch((err) => console.error("Error:", err))
      .finally(() => {    setTitulo(null);setIsLoading(false); });
  }


  return (
    <div className="container">
      <h3>Control de Ángulos (0&deg; a 180&deg;)</h3>

      <RangeValue initialLabel='H' initialValue={anguloH} onValueChange={actualizarValorH}></RangeValue>
      <RangeValue initialLabel='V' initialValue={anguloV} onValueChange={actualizarValorV}></RangeValue>

      {isLoading && <ModalAlert isLoading={isLoading}></ModalAlert>}
      <CardData titulo={titulo} mensajeCardClick={mensajeCardClick}></CardData>

    </div>
  );
}
import React, { useState, useEffect,useRef } from 'react';
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
  const [titulo, setTitulo] = useState(null);
  const [mensajeCardClick, setMensajeCardClick] = useState(null);
  // 2. Crear la función que actualiza este estado
 const isInitialMount = useRef(true);
    // 2. Usa el Hook useEffect
  useEffect(() => {
    // Coloca la llamada a la función aquí
    // cargar datos iniciales
    setIsLoading(true);
    fetch(getUrl() + "/lastvalueservo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.h_now != null) {
          setAnguloH(data.h_now);
        }
        if (data.v_now != null) {
          setAnguloV(data.v_now);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // El array de dependencias vacío [] asegura que la función
    // se ejecute SOLAMENTE una vez, después del MONTADO inicial del componente.
  }, []); // <--- Array de dependencias vacío
  const actualizarValorH = (nuevoValor) => {
    setAnguloH(nuevoValor);
        enviarInfoAnt(nuevoValor, anguloV);
  };
  /*  useEffect(() => {
    // **Verificación clave:** Ignora la primera ejecución del componente.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

      //if (!isLoading) {
    enviarInfoAnt();
    //  }
    
  }, [anguloH, anguloV]); // Depende de ambos estados
  */
/*
  useEffect(() => {
    enviarInfoAnt();
  }, [anguloH]);*/
  const actualizarValorV = (nuevoValor) => {
    setAnguloV(nuevoValor);
        enviarInfoAnt(anguloH,nuevoValor);
  };
  /*
  useEffect(() => {
    enviarInfoAnt();
  }, [anguloV]);
*/

  //const user = localStorage.getItem('user');//JSON.parse(); // Asumiendo que guardas los datos del usuario
  /*const handleSliderChange = (newValues) => {
     // newValues es un array, e.g., [nuevo_angulo_1, nuevo_angulo_2]
     setAngulos(newValues);
   };*/



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
          if (data.msg == "Ok") {
            setTitulo("Listo"); setMensajeCardClick("Ángulos actualizados");
           } else {
            setTitulo("Resultado"); setMensajeCardClick(data.msg);
          }
          if (data.h_now!=null && data.h_now!= anguloH){setAnguloH(data.h_now);}
          if (data.v_now!=null && data.v_now!= anguloV){setAnguloV(data.v_now);}
        })
        .catch((err) => { console.error("Error:", err); setTitulo(null); })
        .finally(() => { setIsLoading(false); });
}
  }


return (
  <div className="container">
    <h3>Control de Ángulos (0&deg; a 180&deg;)</h3>

    <RangeValue initialLabel='H' valor={anguloH}  onValueChange={actualizarValorH} ></RangeValue>
    <RangeValue initialLabel='V' valor={anguloV} onValueChange={actualizarValorV} ></RangeValue>

    {isLoading && <ModalAlert isLoading={isLoading}></ModalAlert>}
    <CardData titulo={titulo} mensajeCardClick={mensajeCardClick}></CardData>

  </div>
);
}
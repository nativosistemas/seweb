import { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import { getUrl, getToken } from './utils';
import { ModalAlert } from "./ModalAlert";

export const ComponenteEstrellas = forwardRef((props, ref) => {


    const [estrellas, setEstrellas] = useState([]);
    // const [token] = useState(() => localStorage.getItem('token'));//const token = localStorage.getItem('token');
    const [estrellas_onClick] = useState(() => localStorage.getItem(null));
    const [titulo, setTitulo] = useState('Cargando...');
    const [itemExpandido, setItemExpandido] = useState(null);
    const [mensajeCardClick, setMensajeCardClick] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchStars = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(getUrl() + "/estrellas", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getToken() // Asegúrate de que el token esté en el formato correcto
                }
            });

            if (!response.ok) {
                throw new Error(`Error en el servidor: ${response.status}`);
            }

            const data = await response.json();
            setEstrellas(data); // Guardamos el JSON en el estado

        } catch (err) {
            console.error("Error al obtener astros:", err);
            //setError("No se pudieron cargar los astros: " + err.message);
            setError("Ups, algo falló. Prueba más tarde. Log: " + err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStars();
    }, [fetchStars]);

    const funcionRecargarAstro = () => {
        //alert("Función del hijo ejecutada con: " + 'mensaje');
        if (itemExpandido !== null) {
            actionAnt_item(itemExpandido);
        }
    };

    // Exponés la función al padre mediante useImperativeHandle
    useImperativeHandle(ref, () => ({
        funcionRecargarAstro,
    }));

    // 4. Renderizado condicional
    if (isLoading) return <ModalAlert isLoading={isLoading}></ModalAlert>;
    if (error) return <div className="alert alert-danger m-4">{error} <button onClick={fetchStars} className="btn btn-sm btn-outline-danger ms-3">Reintentar</button></div>;

    const toggleExpandir = (e, i) => {
        actionAnt_item(i);
        /*  if (estrellas_onClick === null) {
              setTitulo('Cargando...');
              setMensajeCardClick(null);
              setIsLoading(true);
              localStorage.setItem("Estrellas_onClick", i);
  
  
              var data = {};
              data.hip = e.hip;
              data.type = 'star';
              var json = JSON.stringify(data);
  
              if (onItemSelect) {
                  onItemSelect(data.hip);
              }
  
  
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
                  .catch((err) => {
                      console.error("Error:", err);
                      console.log("Error:", err);
                  })
                  .finally(() => { localStorage.setItem("Estrellas_onClick", null); setIsLoading(false); });
              setItemExpandido(itemExpandido === i ? null : i);
          }*/

    };
    const actionAnt_item = (i) => {

        if (estrellas_onClick === null) {
            const oAstro = estrellas[i] !== null ? estrellas[i] : null;
            if (oAstro === null) return;

            setTitulo('Cargando...');
            setMensajeCardClick(null);
            setIsLoading(true);
            localStorage.setItem("Estrellas_onClick", i);
            var data = {};
            data.hip = oAstro.hip;
            data.type = 'star';
            var json = JSON.stringify(data);

            /*if (onItemSelect) {
                onItemSelect(data.hip);
            }*/


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
                .catch((err) => {
                    console.error("Error:", err);
                    console.log("Error:", err);
                })
                .finally(() => { localStorage.setItem("Estrellas_onClick", null); setIsLoading(false); });

            setItemExpandido(i); // setItemExpandido(itemExpandido === i ? null : i); 

        }

    };



    //const hipSeleccionado = itemExpandido !== null ? estrellas[itemExpandido].hip : null;

    return (
        <div className="container">
            <ListGroup as="ul" className="list-group scrollable-list">
                {estrellas.map((e, i) => {
                    // Determinar clases adicionales basadas en propiedades
                    const disabled = !e.visible ? 'disabled list-group-item-dark' : '';
                    const cssColor = e.nearZenith ? 'li-nearZenith' : '';

                    return (
                        <ListGroup.Item
                            key={i}
                            as="li"
                            action={e.visible} // Solo hacerlo clickeable si es visible
                            className={`list-group-item custom-card ${disabled} ${cssColor}`}
                            onClick={() => toggleExpandir(e, i)}
                            disabled={isLoading}
                        >
                            <Card >
                                <Card.Body>
                                    <Card.Title>HIP {e.hip}</Card.Title>
                                    <Card.Text>
                                        <h4>{e.name}</h4>
                                        <small>
                                            <Row>
                                                <Col md={6}>
                                                    RA {e.ra}
                                                </Col>
                                                <Col md={6}>
                                                    DEC {e.dec}
                                                </Col>
                                            </Row>
                                        </small>
                                        {itemExpandido === i && (
                                            <Card style={{ marginTop: '1rem', backgroundColor: 'rgba(25, 135, 84, 0.7)' }}>
                                                <Card.Body>
                                                    <Card.Title>{titulo}
                                                        <button
                                                            type="button"
                                                            className="btn-close" // En Bootstrap 5 se usa btn-close
                                                            onClick={(event) => {
                                                                event.stopPropagation(); // <--- ESTO evita que el clic llegue al padre
                                                                setItemExpandido(null);
                                                            }}
                                                            aria-label="Close"
                                                            style={{ float: 'right', background: 'none', border: 'none', fontWeight: 'bold' }}
                                                        >
                                                            &times;
                                                        </button>
                                                    </Card.Title>
                                                    <Card.Text>
                                                        {mensajeCardClick}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        )}
                                    </Card.Text>

                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            <ModalAlert isLoading={isLoading}></ModalAlert>
        </div>
    );
});




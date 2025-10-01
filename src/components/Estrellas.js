import { useEffect, useState } from "react";
import { Row, Col, ListGroup, Card } from 'react-bootstrap';
import { getUrl, getToken } from './utils';
import { ModalAlert } from "./ModalAlert";

export function Estrellas() {
    const [estrellas, setEstrellas] = useState([]);
    // const [token] = useState(() => localStorage.getItem('token'));//const token = localStorage.getItem('token');
    const [estrellas_onClick] = useState(() => localStorage.getItem(null));
    const [titulo, setTitulo] = useState('Cargando...');
    const [itemExpandido, setItemExpandido] = useState(null);
    const [mensajeCardClick, setMensajeCardClick] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(getUrl() + "/estrellas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken() // Asegúrate de que el token esté en el formato correcto
            }
        })
            .then((res) => res.json())
            .then((data) => setEstrellas(data))
            .catch((err) => console.error("Error:", err));
    }, []);

    const toggleExpandir = (e, i) => {

        if (estrellas_onClick === null) {
            setTitulo('Cargando...');
            setMensajeCardClick(null);
            setIsLoading(true);
            localStorage.setItem("Estrellas_onClick", i);

            var data = {};
            data.hip = e.hip;
            data.type = 'star';
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
                .catch((err) => { console.error("Error:", err);
                     console.log("Error:", err); })
                .finally(() => { localStorage.setItem("Estrellas_onClick", null); setIsLoading(false); });
            setItemExpandido(itemExpandido === i ? null : i); //setItemExpandido(null);
            //setItemExpandido(null);
        }//  if (itemExpandido == null){

    };


    return (
        <div className="container mt-4">
            <h2 className="mb-4">Estrellas</h2>
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
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>HIP {e.hip}</Card.Title>
                                    <Card.Text>
                                        <h2>{e.name}</h2>
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
                                    </Card.Text>
                                    {itemExpandido === i && (
                                        <Card style={{ marginTop: '1rem', backgroundColor: 'rgba(25, 135, 84, 0.7)' }}>
                                            <Card.Body>
                                                <Card.Title>{titulo}</Card.Title>
                                                <Card.Text>
                                                    {mensajeCardClick}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    )}
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            <ModalAlert isLoading={isLoading}></ModalAlert>
        </div>
    );
}
//export default Estrellas;
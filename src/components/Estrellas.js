import { useEffect, useState } from "react";
import { ListGroup, Card } from 'react-bootstrap';

export function Estrellas() {
    const [estrellas, setEstrellas] = useState([]);
    const [token, setToken] = useState(() => localStorage.getItem('token'));//const token = localStorage.getItem('token');

    useEffect(() => {
        fetch("https://estrellas.duckdns.org/estrellas", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token // Asegúrate de que el token esté en el formato correcto
            }
        })
            .then((res) => res.json())
            .then((data) => setEstrellas(data))
            .catch((err) => console.error("Error:", err));;
    }, [token]); 

    return (
        <div className="container mt-4">
            <h3>Estrellas</h3>
            <ListGroup>
                {estrellas.map((e, i) => (
                    <ListGroup.Item key={i}>{
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>HIP {e.hip}</Card.Title>
                                <Card.Text>
                                    <h2>{e.name}</h2>
                                    <small>ra {e.ra} dec {e.dec}</small>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    }</ListGroup.Item >
                ))}
            </ListGroup>
        </div>
    );
}
//export default Estrellas;
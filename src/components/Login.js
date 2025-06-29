import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validación simple
        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }


        setLoading(true);
        try {
            const response = await fetch("https://estrellas.duckdns.org/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: email, pass: password }),
            });

            if (!response.ok) throw new Error("Error en la petición");

            const data = await response.json();
            console.log("Respuesta exitosa:", data);
            // Guardar token en localStorage o contexto
            localStorage.setItem("token", data);
            localStorage.setItem("user", { name: email, pass: password });
            navigate('/dashboard');
        } catch (error) {
            setError("Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Iniciar Sesión</Card.Title>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="usuario"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 mt-3"
                                    disabled={loading}
                                >
                                    {loading ? "Cargando..." : "Ingresar"}
                                </Button>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
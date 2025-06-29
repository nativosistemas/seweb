import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import { BarChart, PieChart } from '../components/Charts'; // Componentes de gráficos que crearemos después
import { Estrellas } from '../components/Estrellas';
import { FiLogOut, FiHome, FiUsers, FiSettings, FiPieChart } from 'react-icons/fi';

const Dashboard = () => {
  const navigate = useNavigate();
  
  
  const user = localStorage.getItem('user');//JSON.parse(); // Asumiendo que guardas los datos del usuario

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de autenticación
    localStorage.removeItem('user'); // Elimina los datos del usuario
    navigate('/login'); // Redirige al login
  };


  return (
    <>
      {/* Navbar Superior */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Navbar.Brand href="#">
            <FiPieChart className="me-2" />
            Panel de Control
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Collapse id="navbarNav" className="justify-content-end">
            <Nav>
              <Navbar.Text className="me-3">
                Bienvenido: <strong>{user.name}</strong>
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>
                <FiLogOut className="me-1" /> Salir
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenedor Principal */}
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="d-none d-md-block bg-light sidebar">
            <Nav className="flex-column p-3">
              <Nav.Link href="#" active className="mb-2">
                <FiHome className="me-2" />
                Inicio
              </Nav.Link>
              <Nav.Link href="#" className="mb-2">
                <FiUsers className="me-2" />
                Usuarios
              </Nav.Link>
              <Nav.Link href="#" className="mb-2">
                <FiSettings className="me-2" />
                Configuración
              </Nav.Link>
            </Nav>
          </Col>

          {/* Contenido Principal */}
          <Col md={10} className="ms-sm-auto px-md-4 py-3">
            <h2 className="mb-4">Resumen General</h2>
            
            {/* Tarjetas de Resumen */}
            <Row className="mb-4">
              <Col md={3}>
                <Card className="text-white bg-primary mb-3">
                  <Card.Body>
                    <Card.Title>Usuarios</Card.Title>
                    <Card.Text>
                      <h2>1,024</h2>
                      <small>+5% desde ayer</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-white bg-success mb-3">
                  <Card.Body>
                    <Card.Title>Ventas</Card.Title>
                    <Card.Text>
                      <h2>$24,500</h2>
                      <small>+12% este mes</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-white bg-warning mb-3">
                  <Card.Body>
                    <Card.Title>Pedidos</Card.Title>
                    <Card.Text>
                      <h2>156</h2>
                      <small>+8% esta semana</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-white bg-danger mb-3">
                  <Card.Body>
                    <Card.Title>Incidencias</Card.Title>
                    <Card.Text>
                      <h2>12</h2>
                      <small>-3% desde ayer</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
              <Estrellas></Estrellas>
              </Col>
            </Row>

            {/* Gráficos */}
            <Row>
              <Col md={8}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Ventas Mensuales</Card.Title>
                    <BarChart />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Distribución</Card.Title>
                    <PieChart />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
/*import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');//JSON.parse(); // Asumiendo que guardas los datos del usuario

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de autenticación
    localStorage.removeItem('user'); // Elimina los datos del usuario
    navigate('/login'); // Redirige al login
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Panel de Control</h1>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar Sesión
        </button>
      </header>

      <div className="dashboard-content">
        <section className="welcome-section">
          <h2>Bienvenido, {user?.name || 'Usuario'}</h2>
          <p>Último acceso: {new Date().toLocaleString()}</p>
        </section>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Resumen</h3>
            <p>Aquí va el contenido resumido</p>
          </div>
          
          <div className="card">
            <h3>Actividad Reciente</h3>
            <p>Lista de actividades</p>
          </div>
          
          <div className="card">
            <h3>Estadísticas</h3>
            <p>Gráficos o métricas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
*/
/*
// src/pages/Dashboard.js
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return  (
    <div>
      <h2>Hola Mundo v2</h2>
    </div>
  );;
  }

  return (
    <div>
      <h2>Bienvenido, {user.email}</h2>
      <button onClick={() => { logout(); navigate("/login"); }}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;*/

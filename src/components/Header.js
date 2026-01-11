import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getUrl, getToken } from '../components/utils';
import { ModalAlert } from "../components/ModalAlert";

const GearIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor" // 'currentColor' tomará el color del texto del botón/enlace
        className="bi bi-gear"
        viewBox="0 0 24 24"
    >
        <path
            d="M8 8.5C8 9.88071 6.88071 11 5.5 11C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6C6.88071 6 8 7.11929 8 8.5ZM8 8.5H21M16 15.5C16 16.8807 17.1193 18 18.5 18C19.8807 18 21 16.8807 21 15.5C21 14.1193 19.8807 13 18.5 13C17.1193 13 16 14.1193 16 15.5ZM16 15.5H3"
            stroke="currentColor" // Cambiado de #000000 a 'currentColor'
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const ConfiguracionIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        // 'currentColor' hereda el color del texto/icono del botón
        fill="currentColor"
        className="bi bi-gear"
        viewBox="0 0 16 16"
    >
        <path
            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
        />
        <path
            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
        />
    </svg>
);
const StarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        // 'currentColor' hereda el color del texto/icono del botón
        fill="currentColor"
        className="bi bi-gear"
        viewBox="0 0 24 24"
    >
        <path
            d="M7.966 17.883L12 15.463l4.054 2.464l-1.056-4.58l3.544-3.055l-4.669-.42L12 5.547l-1.854 4.298l-4.669.402l3.544 3.098zM12 16.66l-4.515 2.71q-.16.079-.296.064q-.137-.016-.266-.094q-.129-.08-.196-.226q-.067-.148-.012-.319l1.197-5.071l-3.983-3.444q-.135-.117-.168-.266q-.034-.15.028-.29t.164-.231t.282-.117l5.234-.444l2.048-4.816q.068-.165.196-.238T12 3.806t.288.073t.195.238l2.067 4.816l5.235.444q.183.026.288.116t.158.232q.061.14.028.29q-.034.149-.169.266l-3.982 3.444l1.196 5.09q.056.171-.012.309t-.196.217q-.129.078-.265.093q-.137.016-.297-.063zm7.116-10.604l-1.29.75q-.13.065-.239-.003t-.058-.205l.342-1.42l-1.132-.945q-.106-.087-.067-.207q.04-.12.178-.141l1.505-.129l.58-1.349q.044-.128.185-.128t.182.13l.579 1.347l1.5.129q.138.022.178.141q.039.12-.067.207l-1.132.946l.342 1.419q.05.137-.059.205q-.108.068-.237.004zm-7.097 5.669"
        />
    </svg>
);
const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        // 'currentColor' hereda el color del texto/icono del botón
        fill="currentColor"
        className="bi bi-gear"
        viewBox="0 0 24 24"
    >
        <path
            d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6l-5.6 5.6Z"
        />
    </svg>
);
const CalibrateIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        // 'currentColor' hereda el color del texto/icono del botón
        fill="none" //none *** currentColor
        className="bi bi-gear"
        viewBox="0 0 24 24"
    >
        <path d="M2 12L5 12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
        <path d="M19 12L22 12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
        <path d="M12 22L12 19" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
        <path d="M12 5L12 2" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
        <path d="M10 12H12H14" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12 14L12 12L12 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
    </svg>
);
const LaserOnIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        // 'currentColor' hereda el color del texto/icono del botón
        fill="currentColor"
        className="bi bi-gear"
        viewBox="0 0 24 24"
    >
        <path
            d="M12 21.154q-.69 0-1.201-.463q-.51-.462-.607-1.153h3.616q-.096.69-.607 1.153q-.51.463-1.201.463Zm-3-3.385q-.213 0-.357-.143q-.143-.143-.143-.357q0-.213.143-.356q.144-.144.357-.144h6q.213 0 .357.144q.143.143.143.356q0 .214-.143.357q-.144.143-.357.143H9ZM8.558 15q-1.418-.929-2.238-2.356Q5.5 11.217 5.5 9.5q0-2.721 1.89-4.61T12 3q2.721 0 4.61 1.89T18.5 9.5q0 1.717-.82 3.144T15.442 15H8.558Zm.292-1h6.3q1.125-.8 1.738-1.975T17.5 9.5q0-2.3-1.6-3.9T12 4Q9.7 4 8.1 5.6T6.5 9.5q0 1.35.613 2.525T8.85 14ZM12 14Z"
        />
    </svg>
);
const LaserOffIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-gear"
        viewBox="0 0 24 24">
        <path fill="#000000" d="M12 21.154q-.69 0-1.201-.463q-.51-.462-.607-1.153h3.616q-.096.69-.607 1.153q-.51.463-1.201.463ZM12 4q-1.12 0-2.124.426q-1.005.426-1.73 1.14l-.72-.708q.987-.912 2.117-1.385T12 3q2.721 0 4.61 1.89T18.5 9.5q0 1.506-.538 2.605q-.539 1.099-1.358 1.957l-.708-.708q.583-.575 1.093-1.542q.511-.968.511-2.312q0-2.3-1.6-3.9T12 4Zm1.304 11H8.558q-1.418-.929-2.238-2.356Q5.5 11.217 5.5 9.5q0-.52.091-1.08q.092-.562.236-.897L3.023 4.708q-.14-.14-.153-.342q-.012-.2.153-.366q.16-.16.354-.16q.194 0 .354.16l16.077 16.077q.146.146.155.344q.01.198-.155.364q-.166.165-.357.165q-.191 0-.357-.165L13.304 15ZM8.85 14h3.454l-5.65-5.65q-.058.223-.106.546T6.5 9.5q0 1.35.613 2.525T8.85 14Zm.485-2.97Zm2.561-1.695ZM9 17.769q-.213 0-.357-.143q-.143-.143-.143-.357q0-.213.143-.356q.144-.144.357-.144h6.035q.213 0 .356.144t.144.356q0 .214-.144.357t-.356.143H9Z" />
    </svg>
);

const LaserIcon = ({ mostrarOn }) => {

    return (<> {!mostrarOn ? <LaserOnIcon /> : <LaserOffIcon />} </>);
};


const Header = () => {
    const location = useLocation();

    const [mostrarOn, setMostrarOn] = useState(() => {
        const guardado = localStorage.getItem('laserState');
        return guardado ? JSON.parse(guardado) : false;
    });
    const [laser_onClick, setLaser_onClick] = useState(false);
    //const [titulo, setTitulo] = useState('Cargando...');
    //const [mensajeCardClick, setMensajeCardClick] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alerta, setAlerta] = useState({ show: false, msg: "" });
    // Función para mostrar el mensaje y que desaparezca solo
    const mostrarAlerta = (msg) => {
        setAlerta({ show: true, msg });
        setTimeout(() => {
            setAlerta({ show: false, msg: "" });
        }, 10000); // 10 segundos de duración
    };

    useEffect(() => {
        localStorage.setItem('laserState', JSON.stringify(mostrarOn));
    }, [mostrarOn]);

    const activeStyle = (paths) => {
        // Convertimos el argumento en un arreglo si no lo es
        const pathList = Array.isArray(paths) ? paths : [paths];

        // Verificamos si la ubicación actual coincide con alguna de las rutas de la lista
        const isActive = pathList.includes(location.pathname);

        return {
            backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease'
        };
    };

    const fetchServoData = useCallback(async () => {
        try {
            var data = {};
            //data.isLaser = 1;
            data.type = 'laser';
            data.action = 'GET';
            var json = JSON.stringify(data);

            const response = await fetch(getUrl() + "/laser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getToken()
                },
                body: json
            }).catch((err) => {
                //  mostrarAlerta("Error al obtener datos del láser: (2)" + err.message);
            });

            if (!response.ok) {

                //mostrarAlerta("Error al obtener datos del láser");
                // throw new Error(`HTTP error! status: ${response.status}`);
            } else {

                const data_response = await response.json();
                //localStorage.setItem('laserState', JSON.stringify(data_response.isLaser === 1 ? true : false));
                setMostrarOn(data_response.isLaser === 1 ? true : false);
            }

        } catch (err) {
            // no mostrar
            //mostrarAlerta("Error al obtener datos del láser: (1)" + err.message);
        } finally {
            //   setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        // Función para obtener datos del servidor


        fetchServoData();

        // Si necesitas actualizar periódicamente, puedes usar setInterval
        // const interval = setInterval(fetchServoData, 5000); // Actualiza cada 5 segundos
        // return () => clearInterval(interval); // Limpieza al desmontar
    }, [fetchServoData]); // Array vacío = se ejecuta solo al montar

    const onClickLaser = () => {
        if (laser_onClick === false) {
            setLaser_onClick(true);
            //setTitulo('Cargando...');
            // setMensajeCardClick(null);
            setIsLoading(true);


            var data = {};
            data.isLaser = mostrarOn ? 0 : 1;
            data.type = 'laser';
            data.action = 'POST';
            var json = JSON.stringify(data);

            fetch(getUrl() + "/laser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getToken() // Asegúrate de que el token esté en el formato correcto
                },
                body: json
            })
                .then((res) => {
                    // 1. Verificamos si la respuesta es correcta (status 200-299)
                    if (!res.ok) {
                        //mostrarAlerta("Error al obtener datos del láser()3");
                        // Al lanzar el error aquí, saltamos directamente al .catch()
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }

                    // 2. Si todo está bien, retornamos la promesa del JSON
                    return res.json();
                }
                )
                .then((data) => {
                    if (data.msg === "!isFoundAntTracking") {
                        mostrarAlerta("Dispositivo no encontrado. Asegúrate de que esté encendido y dentro del alcance.");
                    } else {
                        setMostrarOn(!mostrarOn);
                    }
                })
                .catch((err) => {
                    console.error("Error:", err);
                    console.log("Error:", err);
                    mostrarAlerta("Ups, algo falló. Prueba más tarde.");
                })
                .finally(() => { setIsLoading(false); setLaser_onClick(false); });





        }

    };
    /*
            if (laser_onClick === null) {
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
        */
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token de autenticación
        localStorage.removeItem('user'); // Elimina los datos del usuario
        navigate('/login'); // Redirige al login
    };

    return (<>      <ModalAlert isLoading={isLoading}></ModalAlert>
        <Navbar expand="lg" sticky="top" style={{
            backgroundColor: 'rgba(128, 128, 128, 0.6)',
            display: 'flex',
            flexDirection: 'column', // Importante: apila el Container y la Alerta
            padding: 0 // Elimina padding para que la alerta toque los bordes
        }}>
            <Container >
                {/*  <Navbar.Brand as={Link} to="/">Señalador de estrellas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
 
                </Navbar.Collapse>*/}
                <Nav className="me-auto">
                    {/*<Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard">Estrellas</Nav.Link>*/}
                    <Nav.Link
                        as={Link}
                        to="/stars"
                        title="Estrellas"
                        style={activeStyle(['/', '/stars'])}
                    >
                        <StarIcon />
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        //to="/stars"
                        onClick={onClickLaser}
                        title="Laser"
                    >
                        <LaserIcon mostrarOn={mostrarOn} />
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/calibracion" // Cambia la ruta a donde deba ir
                        title="Calibración"
                        style={activeStyle('/calibracion')}
                    >
                        <CalibrateIcon />
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/ajustes" // Cambia la ruta a donde deba ir
                        title="Ajustes"
                        style={activeStyle('/ajustes')}
                    >
                        <GearIcon />
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/config" // Cambia la ruta a donde deba ir
                        title="Configuración"
                        style={activeStyle('/config')}
                    >
                        <ConfiguracionIcon />
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link
                        onClick={handleLogout}
                        title="Cerrar"
                    >
                        <CloseIcon />
                    </Nav.Link>

                </Nav>



            </Container>
            {/* MENSAJE TIPO BOOTSTRAP */}
            {alerta.show && (
                <div
                    className="alert alert-info alert-dismissible fade show w-100 m-0"
                    role="alert"
                    style={{
                        borderRadius: 0, // Esquinas rectas para que parezca parte de la barra
                        borderLeft: 0,
                        borderRight: 0,
                        fontSize: '0.9rem',
                        padding: '10px 20px'
                    }}
                >
                    {alerta.msg}
                    <button
                        type="button"
                        className="btn-close" // En Bootstrap 5 se usa btn-close
                        onClick={() => setAlerta({ ...alerta, show: false })}
                        aria-label="Close"
                        style={{ float: 'right', background: 'none', border: 'none', fontWeight: 'bold' }}
                    >
                        &times;
                    </button>
                </div>
            )}
        </Navbar>
    </>
    );
};

export default Header;
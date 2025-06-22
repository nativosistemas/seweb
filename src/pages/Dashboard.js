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

export default Dashboard;

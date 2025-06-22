/*import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthProvider />
      </Router>
    </AuthProvider>
  );
}

export default App; // Esta línea es crucial
*/
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;

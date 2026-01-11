import React from 'react';
import Header from './Header';
//import Footer from './Footer';
import { Outlet } from 'react-router-dom'; // Importa Outlet para el contenido dinámico

const Layout = () => {
  return (
    <div>
      <Header/>
      {/* El main contendrá el contenido de la página actual */}
      <main> {/* Añade padding-bottom para que el contenido no quede debajo del footer fijo */}
        <Outlet/> 
      </main>

    </div>
  );
};

export default Layout;
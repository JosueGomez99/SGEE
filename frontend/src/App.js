import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import ListaUsuarios from "./ListaUsuarios";
import FormularioUsuario from "./FormularioUsuario";

function App() {
  const [actualizar, setActualizar] = useState(false);

  const handleUsuarioCreado = () => {
    setActualizar(!actualizar);
  };

  return (
    <div className="App" style={{ maxWidth: 600, margin: "auto" }}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Gestión de Usuarios</h1>
        <FormularioUsuario onUsuarioCreado={handleUsuarioCreado} />
        <ListaUsuarios key={actualizar} />
      </header>
    </div>
  );
}

export default App;

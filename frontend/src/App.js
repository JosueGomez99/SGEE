import React, { useState } from "react";
import ListaUsuarios from "./usuarios/ListaUsuarios";
import FormularioUsuario from "./usuarios/FormularioUsuario";
import Login from "./usuarios/Login";

function BienvenidoAdmin({ onLogout }) {
  return (
    <div style={{ maxWidth: 500, margin: "80px auto", background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px rgba(52, 152, 219, 0.10)", padding: 40, textAlign: "center" }}>
      <h1 style={{ color: "#2980ef", fontWeight: 800 }}>Bienvenido admin</h1>
      <button onClick={onLogout} style={{marginTop:32, background:'#e74c3c', color:'#fff', border:'none', borderRadius:6, padding:'10px 24px', fontWeight:700, fontSize:16, cursor:'pointer'}}>Cerrar sesión</button>
    </div>
  );
}

function BienvenidoUsuario({ onLogout }) {
  return (
    <div style={{ maxWidth: 500, margin: "80px auto", background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px rgba(52, 152, 219, 0.10)", padding: 40, textAlign: "center" }}>
      <h1 style={{ color: "#2980ef", fontWeight: 800 }}>Bienvenido usuario</h1>
      <button onClick={onLogout} style={{marginTop:32, background:'#e74c3c', color:'#fff', border:'none', borderRadius:6, padding:'10px 24px', fontWeight:700, fontSize:16, cursor:'pointer'}}>Cerrar sesión</button>
    </div>
  );
}

export default function App() {
  const [logueado, setLogueado] = useState(false);
  const [tipo, setTipo] = useState("");

  const handleLogin = (user) => {
    // user: { nombre_usuario }
    if (user && user.nombre_usuario === "admin") {
      setTipo("admin");
      setLogueado(true);
    } else if (user && user.nombre_usuario === "usuario") {
      setTipo("usuario");
      setLogueado(true);
    }
  };

  const handleLogout = () => {
    setLogueado(false);
    setTipo("");
  };

  return (
    <div style={{ background: "#eaf1fb", minHeight: "100vh", padding: 0 }}>
      {!logueado ? (
        <Login onLogin={handleLogin} />
      ) : tipo === "admin" ? (
        <BienvenidoAdmin onLogout={handleLogout} />
      ) : tipo === "usuario" ? (
        <BienvenidoUsuario onLogout={handleLogout} />
      ) : null}
    </div>
  );
}

import React, { useState } from "react";
import Login from "./usuarios/Login";
import Usuarios from "./usuarios/Usuarios";
import FormularioVehiculo from "./vehiculos/FormularioVehiculo";
import ListaVehiculos from "./vehiculos/ListaVehiculos";
import ListaEspacios from "./espacios/ListaEspacios";
import ListaFuncionarios from "./funcionarios/ListaFuncionarios";
import FormularioFuncionario from "./funcionarios/FormularioFuncionario";
import ListaInstituciones from "./instituciones/ListaInstituciones";
import FormularioInstitucion from "./instituciones/FormularioInstitucion";

const navBtn = {
  background: '#f0f6ff', color: '#2980ef', border: 'none', borderRadius: 6, padding: '10px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s'
};
const navBtnActive = {
  ...navBtn,
  background: '#2980ef', color: '#fff'
};

function BienvenidoAdmin({ onLogout }) {
  const [vista, setVista] = useState("usuarios");
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px rgba(52, 152, 219, 0.10)", padding: 40 }}>
      <h1 style={{ color: "#2980ef", fontWeight: 800, textAlign: "center" }}>Panel Administrador</h1>
      <nav style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32 }}>
        <button onClick={() => setVista("usuarios")} style={vista==="usuarios"?navBtnActive:navBtn}>Usuarios</button>
        <button onClick={() => setVista("vehiculos")} style={vista==="vehiculos"?navBtnActive:navBtn}>Vehículos</button>
        <button onClick={() => setVista("espacios")} style={vista==="espacios"?navBtnActive:navBtn}>Espacios</button>
        <button onClick={() => setVista("funcionarios")} style={vista==="funcionarios"?navBtnActive:navBtn}>Funcionarios</button>
        <button onClick={() => setVista("instituciones")} style={vista==="instituciones"?navBtnActive:navBtn}>Instituciones</button>
        <button onClick={onLogout} style={{marginLeft:24, background:'#e74c3c', color:'#fff', border:'none', borderRadius:6, padding:'10px 18px', fontWeight:700, fontSize:16, cursor:'pointer'}}>Cerrar sesión</button>
      </nav>
      {vista === "usuarios" && (<Usuarios />)}
      {vista === "vehiculos" && (<><FormularioVehiculo /><ListaVehiculos /></>)}
      {vista === "espacios" && (<ListaEspacios />)}
      {vista === "funcionarios" && (<><FormularioFuncionario /><ListaFuncionarios /></>)}
      {vista === "instituciones" && (<><FormularioInstitucion /><ListaInstituciones /></>)}
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

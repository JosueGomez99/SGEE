import React, { useState } from "react";
import { createUsuario } from "./apiUsuarios";

const styles = {
  card: {
    background: "#f8fbff",
    borderRadius: 10,
    boxShadow: "0 2px 12px rgba(52, 152, 219, 0.10)",
    padding: 32,
    margin: "40px auto 0 auto",
    maxWidth: 400,
    border: "1px solid #e3eafc"
  },
  input: {
    padding: "10px 14px",
    border: "1px solid #b2c6e6",
    borderRadius: 6,
    marginBottom: 18,
    width: "100%",
    fontSize: 16,
    outline: "none",
    boxSizing: "border-box"
  },
  button: {
    background: "#2980ef",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 0",
    width: "100%",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 17,
    marginTop: 8,
    transition: "background 0.2s"
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 24,
    color: "#2980ef",
    textAlign: "center"
  },
  mensaje: {
    color: "#27ae60",
    marginTop: 12,
    fontWeight: 500,
    textAlign: "center"
  }
};

export default function Login({ onLogin }) {
  const [nombre_usuario, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías validar contra la API real
    if (nombre_usuario && contrasena) {
      setMensaje("");
      if (onLogin) onLogin({ nombre_usuario });
    } else {
      setMensaje("Completa todos los campos");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.card}>
      <div style={styles.title}>Iniciar Sesión</div>
      <input
        type="text"
        placeholder="Usuario"
        value={nombre_usuario}
        onChange={(e) => setNombre(e.target.value)}
        style={styles.input}
        autoFocus
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Entrar</button>
      {mensaje && <div style={styles.mensaje}>{mensaje}</div>}
    </form>
  );
}

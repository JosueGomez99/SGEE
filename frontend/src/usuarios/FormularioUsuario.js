import React, { useState } from "react";
import { createUsuario } from "./apiUsuarios";

const styles = {
  card: {
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: 24,
    marginBottom: 24,
    maxWidth: 500,
    margin: "32px auto 0 auto",
  },
  input: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: 4,
    marginRight: 12,
    fontSize: 16,
  },
  button: {
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "8px 18px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 16,
    transition: "background 0.2s",
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 16,
    color: "#222",
  },
  mensaje: {
    color: "#27ae60",
    marginTop: 12,
    fontWeight: 500,
  },
};

export default function FormularioUsuario({ onUsuarioCreado }) {
  const [nombre_usuario, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUsuario({ nombre_usuario });
    setMensaje("Usuario creado correctamente");
    setNombre("");
    if (onUsuarioCreado) onUsuarioCreado();
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.card}>
      <div style={styles.title}>Agregar Usuario</div>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre_usuario}
        onChange={(e) => setNombre(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Agregar
      </button>
      {mensaje && <div style={styles.mensaje}>{mensaje}</div>}
    </form>
  );
}
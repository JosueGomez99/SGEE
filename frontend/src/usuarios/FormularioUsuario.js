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

const roles = [
  { id: 1, nombre: "Administrador" },
  { id: 2, nombre: "Usuario" },
];

export default function FormularioUsuario({ onUsuarioCreado }) {
  const [form, setForm] = useState({
    nombre_usuario: "",
    contrasena: "",
    id_rol: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUsuario({ ...form, id_rol: Number(form.id_rol) });
    setMensaje("Usuario creado correctamente");
    setForm({ nombre_usuario: "", contrasena: "", id_rol: "" });
    if (onUsuarioCreado) onUsuarioCreado();
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.card}>
      <div style={styles.title}>Agregar Usuario</div>
      <input
        type="text"
        name="nombre_usuario"
        placeholder="Nombre"
        value={form.nombre_usuario}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={form.contrasena}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <select
        name="id_rol"
        value={form.id_rol}
        onChange={handleChange}
        required
        style={styles.input}
      >
        <option value="">Selecciona un rol</option>
        {roles.map((rol) => (
          <option key={rol.id} value={rol.id}>
            {rol.nombre}
          </option>
        ))}
      </select>
      <button type="submit" style={styles.button}>
        Agregar
      </button>
      {mensaje && <div style={styles.mensaje}>{mensaje}</div>}
    </form>
  );
}
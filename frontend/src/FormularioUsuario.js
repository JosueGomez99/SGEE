import React, { useState } from "react";
import { createUsuario } from "./apiUsuarios";

export default function FormularioUsuario({ onUsuarioCreado }) {
  const [nombre_usuario, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUsuario({ nombre_usuario, email });
    setMensaje("Usuario creado correctamente");
    setNombre("");
    setEmail("");
    if (onUsuarioCreado) onUsuarioCreado();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Usuario</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre_usuario}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Agregar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}

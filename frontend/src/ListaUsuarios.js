import React, { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "./apiUsuarios";

export default function ListaUsuarios({ onSelectUsuario }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarUsuarios = async () => {
    setLoading(true);
    const data = await getUsuarios();
    setUsuarios(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleDelete = async (id_usuario) => {
    await deleteUsuario(id_usuario);
    cargarUsuarios();
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id_usuario}>
            {u.nombre_usuario} ({u.email})
            <button onClick={() => handleDelete(u.id_usuario)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

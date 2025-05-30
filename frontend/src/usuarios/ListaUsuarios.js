import React, { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "./apiUsuarios";

export default function ListaUsuarios({ onSelectUsuario }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsuarios();
      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        setUsuarios([]);
        setError(data?.error || "Respuesta inesperada del servidor");
      }
    } catch (err) {
      setError("Error al cargar usuarios");
      setUsuarios([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarUsuarios();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id_usuario) => {
    await deleteUsuario(id_usuario);
    cargarUsuarios();
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id_usuario}>
            {u.nombre_usuario} {u.email && `(${u.email})`}
            <button onClick={() => handleDelete(u.id_usuario)} style={{ marginLeft: 8 }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
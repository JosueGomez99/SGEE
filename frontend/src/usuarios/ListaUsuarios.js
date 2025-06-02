import React, { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "./apiUsuarios";

const styles = {
  card: {
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: 24,
    marginBottom: 16,
    maxWidth: 500,
    margin: "auto"
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #eee"
  },
  button: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "6px 14px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "background 0.2s"
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 16,
    color: "#222"
  },
  empty: {
    color: "#888",
    textAlign: "center",
    marginTop: 16
  }
};

export default function ListaUsuarios({ onSelectUsuario, reload }) {
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
  }, [reload]);

  const handleDelete = async (id_usuario) => {
    await deleteUsuario(id_usuario);
    cargarUsuarios();
  };

  if (loading) return <div style={styles.card}><p>Cargando usuarios...</p></div>;
  if (error) return <div style={styles.card}><p style={{color:'red'}}>Error: {error}</p></div>;

  return (
    <div style={styles.card}>
      <div style={styles.title}>Lista de Usuarios</div>
      <ul style={styles.list}>
        {usuarios.length === 0 && <div style={styles.empty}>No hay usuarios registrados.</div>}
        {usuarios.map((u) => (
          <li key={u.id_usuario} style={styles.listItem}>
            <span style={{fontWeight:500, color:'#333'}}>{u.nombre_usuario}</span>
            <button style={styles.button} onClick={() => handleDelete(u.id_usuario)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
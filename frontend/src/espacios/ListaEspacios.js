import React, { useEffect, useState } from "react";
import { getEspacios, deleteEspacio } from "./apiEspacios";

export default function ListaEspacios() {
  const [espacios, setEspacios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarEspacios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEspacios();
      if (Array.isArray(data)) {
        setEspacios(data);
      } else {
        setEspacios([]);
        setError(data?.error || "Respuesta inesperada del servidor");
      }
    } catch (err) {
      setError("Error al cargar espacios");
      setEspacios([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarEspacios();
  }, []);

  const handleDelete = async (id_espacio) => {
    await deleteEspacio(id_espacio);
    cargarEspacios();
  };

  if (loading) return <p>Cargando espacios...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <div style={{background:'#fff', borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', padding:24, maxWidth:500, margin:'auto'}}>
      <h2 style={{color:'#2980ef'}}>Lista de Espacios</h2>
      <ul style={{listStyle:'none', padding:0}}>
        {espacios.length === 0 && <div style={{color:'#888'}}>No hay espacios registrados.</div>}
        {espacios.map((e) => (
          <li key={e.id_espacio} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #eee'}}>
            <span>{e.nombre_espacio}</span>
            <button onClick={() => handleDelete(e.id_espacio)} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',cursor:'pointer'}}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

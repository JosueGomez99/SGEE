import React, { useEffect, useState } from "react";
import { getInstituciones, deleteInstitucion } from "./apiInstituciones";

export default function ListaInstituciones() {
  const [instituciones, setInstituciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarInstituciones = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInstituciones();
      if (Array.isArray(data)) {
        setInstituciones(data);
      } else {
        setInstituciones([]);
        setError(data?.error || "Respuesta inesperada del servidor");
      }
    } catch (err) {
      setError("Error al cargar instituciones");
      setInstituciones([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarInstituciones();
  }, []);

  const handleDelete = async (id_institucion) => {
    await deleteInstitucion(id_institucion);
    cargarInstituciones();
  };

  if (loading) return <p>Cargando instituciones...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <div style={{background:'#fff', borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', padding:24, maxWidth:500, margin:'auto'}}>
      <h2 style={{color:'#2980ef'}}>Lista de Instituciones</h2>
      <ul style={{listStyle:'none', padding:0}}>
        {instituciones.length === 0 && <div style={{color:'#888'}}>No hay instituciones registradas.</div>}
        {instituciones.map((i) => (
          <li key={i.id_institucion} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #eee'}}>
            <span>{i.nombre_institucion}</span>
            <button onClick={() => handleDelete(i.id_institucion)} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',cursor:'pointer'}}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

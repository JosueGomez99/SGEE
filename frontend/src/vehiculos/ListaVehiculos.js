import React, { useEffect, useState } from "react";
import { getVehiculos, deleteVehiculo } from "./apiVehiculos";

export default function ListaVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarVehiculos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVehiculos();
      if (Array.isArray(data)) {
        setVehiculos(data);
      } else {
        setVehiculos([]);
        setError(data?.error || "Respuesta inesperada del servidor");
      }
    } catch (err) {
      setError("Error al cargar vehículos");
      setVehiculos([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const handleDelete = async (id_vehiculo) => {
    await deleteVehiculo(id_vehiculo);
    cargarVehiculos();
  };

  if (loading) return <p>Cargando vehículos...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <div style={{background:'#fff', borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', padding:24, maxWidth:500, margin:'auto'}}>
      <h2 style={{color:'#2980ef'}}>Lista de Vehículos</h2>
      <ul style={{listStyle:'none', padding:0}}>
        {vehiculos.length === 0 && <div style={{color:'#888'}}>No hay vehículos registrados.</div>}
        {vehiculos.map((v) => (
          <li key={v.id_vehiculo} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #eee'}}>
            <span>{v.placa}</span>
            <button onClick={() => handleDelete(v.id_vehiculo)} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',cursor:'pointer'}}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

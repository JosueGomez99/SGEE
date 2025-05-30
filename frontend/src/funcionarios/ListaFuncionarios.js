import React, { useEffect, useState } from "react";
import { getFuncionarios, deleteFuncionario } from "./apiFuncionarios";

export default function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarFuncionarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFuncionarios();
      if (Array.isArray(data)) {
        setFuncionarios(data);
      } else {
        setFuncionarios([]);
        setError(data?.error || "Respuesta inesperada del servidor");
      }
    } catch (err) {
      setError("Error al cargar funcionarios");
      setFuncionarios([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarFuncionarios();
  }, []);

  const handleDelete = async (id_funcionario) => {
    await deleteFuncionario(id_funcionario);
    cargarFuncionarios();
  };

  if (loading) return <p>Cargando funcionarios...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <div style={{background:'#fff', borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', padding:24, maxWidth:500, margin:'auto'}}>
      <h2 style={{color:'#2980ef'}}>Lista de Funcionarios</h2>
      <ul style={{listStyle:'none', padding:0}}>
        {funcionarios.length === 0 && <div style={{color:'#888'}}>No hay funcionarios registrados.</div>}
        {funcionarios.map((f) => (
          <li key={f.id_funcionario} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #eee'}}>
            <span>{f.nombre_funcionario}</span>
            <button onClick={() => handleDelete(f.id_funcionario)} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',cursor:'pointer'}}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

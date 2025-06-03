import React, { useEffect, useState } from "react";
import { getFuncionarios, deleteFuncionario } from "./apiFuncionarios";
import { getInstituciones } from "../instituciones/apiInstituciones";

export default function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [editando, setEditando] = useState(null);
  const [funcionarioEdit, setFuncionarioEdit] = useState({});

  const cargarFuncionarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, insts] = await Promise.all([
        getFuncionarios(),
        getInstituciones(),
      ]);
      setFuncionarios(Array.isArray(data) ? data : []);
      setInstituciones(Array.isArray(insts) ? insts : []);
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

  const getInstitucionNombre = (id) => {
    const inst = instituciones.find(i => i.id_institucion === id);
    return inst ? inst.nombre_institucion : id;
  };

  // Filtrar y ordenar
  const funcionariosFiltrados = funcionarios
    .filter(f => `${f.nombres} ${f.apellidos}`.toLowerCase().includes(filtro.toLowerCase()))
    .sort((a, b) => a.nombres.localeCompare(b.nombres, 'es', { sensitivity: 'base' }));

  if (loading) return <p>Cargando funcionarios...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <div style={{background:'#fff', borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', padding:24, maxWidth:1000, margin:'auto'}}>
      <h2 style={{color:'#2980ef'}}>Lista de Funcionarios</h2>
      <input
        type="text"
        placeholder="Buscar por nombre o apellido..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        style={{marginBottom:18, padding:'8px 12px', border:'1px solid #ccc', borderRadius:4, fontSize:16, width:'100%'}}
      />
      <table style={{width:'100%',borderCollapse:'collapse',marginTop:16}}>
        <thead>
          <tr style={{background:'#f4f8ff',color:'#2980ef',fontWeight:700}}>
            <th style={{padding:8,borderBottom:'2px solid #e0e0e0'}}>Nombres</th>
            <th style={{padding:8,borderBottom:'2px solid #e0e0e0'}}>Apellidos</th>
            <th style={{padding:8,borderBottom:'2px solid #e0e0e0'}}>Modalidad</th>
            <th style={{padding:8,borderBottom:'2px solid #e0e0e0'}}>Responsable de Pago</th>
            <th style={{padding:8,borderBottom:'2px solid #e0e0e0'}}>Institución</th>
            <th style={{padding:8,borderBottom:'2px solid #e0e0e0'}}>ID Estado</th>
            <th style={{padding:8,borderBottom:'2px solid #e0e0e0'}}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {funcionariosFiltrados.length === 0 && (
            <tr><td colSpan={7} style={{color:'#888',textAlign:'center',padding:16}}>No hay funcionarios registrados.</td></tr>
          )}
          {funcionariosFiltrados.map((f) => (
            <tr key={f.id_funcionario} style={{borderBottom:'1px solid #eee'}}>
              <td style={{padding:8}}>{editando === f.id_funcionario ? <input value={funcionarioEdit.nombres} onChange={e => setFuncionarioEdit({...funcionarioEdit, nombres: e.target.value})} style={{padding:6, fontSize:15}} /> : f.nombres}</td>
              <td style={{padding:8}}>{editando === f.id_funcionario ? <input value={funcionarioEdit.apellidos} onChange={e => setFuncionarioEdit({...funcionarioEdit, apellidos: e.target.value})} style={{padding:6, fontSize:15}} /> : f.apellidos}</td>
              <td style={{padding:8}}>{editando === f.id_funcionario ? <input value={funcionarioEdit.modalidad} onChange={e => setFuncionarioEdit({...funcionarioEdit, modalidad: e.target.value})} style={{padding:6, fontSize:15}} /> : f.modalidad}</td>
              <td style={{padding:8}}>{editando === f.id_funcionario ? <input value={funcionarioEdit.responsable_pago} onChange={e => setFuncionarioEdit({...funcionarioEdit, responsable_pago: e.target.value})} style={{padding:6, fontSize:15}} /> : f.responsable_pago}</td>
              <td style={{padding:8}}>{getInstitucionNombre(f.id_institucion)}</td>
              <td style={{padding:8}}>{f.id_estado}</td>
              <td style={{padding:8}}>
                {editando === f.id_funcionario ? (
                  <>
                    <button onClick={async () => {
                      // Aquí deberías llamar a tu función de updateFuncionario
                      // await updateFuncionario(f.id_funcionario, funcionarioEdit);
                      setEditando(null);
                      setFuncionarioEdit({});
                      cargarFuncionarios();
                    }} style={{background:'#27ae60',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',marginRight:6,cursor:'pointer'}}>Guardar</button>
                    <button onClick={() => { setEditando(null); setFuncionarioEdit({}); }} style={{background:'#aaa',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',cursor:'pointer'}}>Cancelar</button>
                  </>
                ) : (
                  <div style={{display:'inline-flex',gap:6}}>
                    <button onClick={() => { setEditando(f.id_funcionario); setFuncionarioEdit(f); }} style={{background:'#f1c40f',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',marginRight:0,cursor:'pointer'}}>Editar</button>
                    <button onClick={() => handleDelete(f.id_funcionario)} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',cursor:'pointer'}}>Eliminar</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

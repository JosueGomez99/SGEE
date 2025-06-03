import React, { useEffect, useState } from "react";
import { getInstituciones, deleteInstitucion, updateInstitucion } from "./apiInstituciones";
import FormularioInstitucion from "./FormularioInstitucion";

export default function ListaInstituciones() {
  const [instituciones, setInstituciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editando, setEditando] = useState(null); // id de la institución en edición
  const [nombreEdit, setNombreEdit] = useState("");
  const [siglasEdit, setSiglasEdit] = useState("");
  const [filtro, setFiltro] = useState("");

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

  const handleEditClick = (institucion) => {
    setEditando(institucion.id_institucion);
    setNombreEdit(institucion.nombre_institucion || "");
    setSiglasEdit(institucion.siglas || "");
  };

  const handleEditCancel = () => {
    setEditando(null);
    setNombreEdit("");
    setSiglasEdit("");
  };

  const handleEditSave = async (id) => {
    await updateInstitucion(id, { nombre_institucion: nombreEdit, siglas: siglasEdit });
    setEditando(null);
    setNombreEdit("");
    setSiglasEdit("");
    cargarInstituciones();
  };

  // Eliminar instituciones repetidas por nombre (y siglas opcionalmente)
  const institucionesUnicas = Object.values(
    instituciones.reduce((acc, inst) => {
      // Puedes usar solo nombre_institucion o también siglas para unicidad
      const key = inst.nombre_institucion.trim().toLowerCase();
      if (!acc[key]) acc[key] = inst;
      return acc;
    }, {})
  );

  // Filtrar y ordenar instituciones únicas
  const institucionesFiltradas = institucionesUnicas
    .filter(i => i.nombre_institucion.toLowerCase().includes(filtro.toLowerCase()) || (i.siglas && i.siglas.toLowerCase().includes(filtro.toLowerCase())))
    .sort((a, b) => a.nombre_institucion.localeCompare(b.nombre_institucion, 'es', { sensitivity: 'base' }));

  if (loading) return <p>Cargando instituciones...</p>;
  if (error) return <p style={{color:'red'}}>Error: {error}</p>;

  return (
    <div style={{background:'#fff', borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.08)', padding:24, maxWidth:600, margin:'auto'}}>
      <h2 style={{color:'#2980ef'}}>Lista de Instituciones</h2>
      <input
        type="text"
        placeholder="Filtrar por nombre o siglas..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        style={{marginBottom:18, padding:'8px 12px', border:'1px solid #ccc', borderRadius:4, fontSize:16, width:'100%'}}
      />
      <ul style={{listStyle:'none', padding:0}}>
        {institucionesFiltradas.length === 0 && <div style={{color:'#888'}}>No hay instituciones registradas.</div>}
        {institucionesFiltradas.map((i) => (
          <li key={i.id_institucion} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #eee'}}>
            {editando === i.id_institucion ? (
              <>
                <input
                  type="text"
                  value={nombreEdit}
                  onChange={e => setNombreEdit(e.target.value)}
                  placeholder="Nombre"
                  style={{padding:'6px',fontSize:16,border:'1px solid #ccc',borderRadius:4,marginRight:8,width:220}}
                />
                <input
                  type="text"
                  value={siglasEdit}
                  onChange={e => setSiglasEdit(e.target.value.toUpperCase())}
                  placeholder="Siglas"
                  style={{padding:'6px',fontSize:16,border:'1px solid #ccc',borderRadius:4,marginRight:8,width:80,textTransform:'uppercase'}}
                  maxLength={10}
                />
                <button onClick={() => handleEditSave(i.id_institucion)} style={{background:'#27ae60',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',marginRight:6,cursor:'pointer'}}>Guardar</button>
                <button onClick={handleEditCancel} style={{background:'#aaa',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',cursor:'pointer'}}>Cancelar</button>
              </>
            ) : (
              <>
                <span style={{fontWeight:600,fontSize:18,letterSpacing:0.2}}>{i.nombre_institucion}</span>
                <div>
                  <button onClick={() => handleEditClick(i)} style={{background:'#f1c40f',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',marginRight:6,cursor:'pointer'}}>Editar</button>
                  <button onClick={() => handleDelete(i.id_institucion)} style={{background:'#e74c3c',color:'#fff',border:'none',borderRadius:4,padding:'6px 14px',cursor:'pointer'}}>Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, { useState } from "react";
import { createInstitucion } from "./apiInstituciones";

export default function FormularioInstitucion({ onInstitucionCreada }) {
  const [nombre_institucion, setNombre] = useState("");
  const [siglas, setSiglas] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createInstitucion({ nombre_institucion, siglas });
    setMensaje("Institución creada correctamente");
    setNombre("");
    setSiglas("");
    if (onInstitucionCreada) onInstitucionCreada();
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <form onSubmit={handleSubmit} style={{background:'#fff',borderRadius:8,boxShadow:'0 2px 8px rgba(0,0,0,0.08)',padding:24,maxWidth:500,margin:'32px auto 0 auto'}}>
      <div style={{fontSize:22,fontWeight:700,marginBottom:16,color:'#2980ef'}}>Agregar Institución</div>
      <div style={{display:'flex',gap:12,marginBottom:12}}>
        <input
          type="text"
          placeholder="Nombre de la institución"
          value={nombre_institucion}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{padding:'8px 12px',border:'1px solid #ccc',borderRadius:4,fontSize:16,flex:2}}
        />
        <input
          type="text"
          placeholder="Siglas"
          value={siglas}
          onChange={e => setSiglas(e.target.value.toUpperCase())}
          required
          maxLength={10}
          style={{padding:'8px 12px',border:'1px solid #ccc',borderRadius:4,fontSize:16,width:120,textTransform:'uppercase',fontWeight:700,letterSpacing:1.5,background:'#f4f8ff'}}
        />
      </div>
      <button type="submit" style={{background:'#3498db',color:'#fff',border:'none',borderRadius:4,padding:'8px 18px',cursor:'pointer',fontWeight:600,fontSize:16,transition:'background 0.2s'}}>Agregar</button>
      {mensaje && <div style={{color:'#27ae60',marginTop:12,fontWeight:500}}>{mensaje}</div>}
    </form>
  );
}

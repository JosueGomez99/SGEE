import React, { useState } from "react";
import { createEspacio } from "./apiEspacios";

export default function FormularioEspacio({ onEspacioCreado }) {
  const [nombre_espacio, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEspacio({ nombre_espacio });
    setMensaje("Espacio creado correctamente");
    setNombre("");
    // Llama a la función para recargar la lista de espacios inmediatamente
    if (onEspacioCreado) onEspacioCreado();
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <form onSubmit={handleSubmit} style={{background:'#fff',borderRadius:8,boxShadow:'0 2px 8px rgba(0,0,0,0.08)',padding:24,maxWidth:500,margin:'32px auto 0 auto'}}>
      <div style={{fontSize:22,fontWeight:700,marginBottom:16,color:'#2980ef'}}>Agregar Espacio</div>
      <input
        type="text"
        placeholder="Nombre del espacio"
        value={nombre_espacio}
        onChange={(e) => setNombre(e.target.value)}
        required
        style={{padding:'8px 12px',border:'1px solid #ccc',borderRadius:4,marginRight:12,fontSize:16}}
      />
      <button type="submit" style={{background:'#3498db',color:'#fff',border:'none',borderRadius:4,padding:'8px 18px',cursor:'pointer',fontWeight:600,fontSize:16,transition:'background 0.2s'}}>Agregar</button>
      {mensaje && <div style={{color:'#27ae60',marginTop:12,fontWeight:500}}>{mensaje}</div>}
    </form>
  );
}

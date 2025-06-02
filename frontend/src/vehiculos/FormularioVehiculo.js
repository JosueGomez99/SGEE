import React, { useState, useEffect } from "react";
import { createVehiculo } from "./apiVehiculos";
import { getTiposVehiculo } from "./apiTipovehiculo";

export default function FormularioVehiculo({ onVehiculoCreado }) {
  const [form, setForm] = useState({
    placa: "",
    modelo: "",
    color: "",
    marca: "",
    idtipoVeh: ""
  });
  const [tipos, setTipos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    getTiposVehiculo().then(setTipos);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVehiculo(form);
    setMensaje("Vehículo creado correctamente");
    setForm({ placa: "", modelo: "", color: "", marca: "", idtipoVeh: "" });
    if (onVehiculoCreado) onVehiculoCreado();
    setTimeout(() => setMensaje(""), 2000);
  };

  return (
    <form onSubmit={handleSubmit} style={{background:'#fff',borderRadius:8,boxShadow:'0 2px 8px rgba(0,0,0,0.08)',padding:24,maxWidth:500,margin:'32px auto 0 auto'}}>
      <div style={{fontSize:22,fontWeight:700,marginBottom:16,color:'#2980ef'}}>Agregar Vehículo</div>
      <input name="placa" type="text" placeholder="Placa" value={form.placa} onChange={handleChange} required style={{padding:'8px 12px',border:'1px solid #ccc',borderRadius:4,marginRight:12,fontSize:16}} />
      <input name="modelo" type="text" placeholder="Modelo" value={form.modelo} onChange={handleChange} required style={{padding:'8px 12px',border:'1px solid #ccc',borderRadius:4,marginRight:12,fontSize:16}} />
      <input name="color" type="text" placeholder="Color" value={form.color} onChange={handleChange} required style={{padding:'8px 12px',border:'1px solid #ccc',borderRadius:4,marginRight:12,fontSize:16}} />
      <input name="marca" type="text" placeholder="Marca" value={form.marca} onChange={handleChange} required style={{padding:'8px 12px',border:'1px solid #ccc',borderRadius:4,marginRight:12,fontSize:16}} />
      <select name="idtipoVeh" value={form.idtipoVeh} onChange={handleChange} required style={{padding:'8px 12px',border:'1px solid #ccc',borderRadius:4,marginRight:12,fontSize:16}}>
        <option value="">Selecciona tipo de vehículo</option>
        {tipos.map((t) => (
          <option key={t.idtipoVeh} value={t.idtipoVeh}>{t.tipoVeh}</option>
        ))}
      </select>
      <button type="submit" style={{background:'#3498db',color:'#fff',border:'none',borderRadius:4,padding:'8px 18px',cursor:'pointer',fontWeight:600,fontSize:16,transition:'background 0.2s'}}>Agregar</button>
      {mensaje && <div style={{color:'#27ae60',marginTop:12,fontWeight:500}}>{mensaje}</div>}
    </form>
  );
}

import React, { useEffect, useState } from "react";
import { getVehiculos, deleteVehiculo } from "./apiVehiculos";
import { getTiposVehiculo } from "./apiTipovehiculo";

export default function ListaVehiculos({ reload }) {
  const [vehiculos, setVehiculos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarVehiculos = async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, tiposData] = await Promise.all([
        getVehiculos(),
        getTiposVehiculo(),
      ]);
      if (Array.isArray(data)) {
        setVehiculos(data);
      } else {
        setVehiculos([]);
        setError(data?.error || "Respuesta inesperada del servidor");
      }
      setTipos(Array.isArray(tiposData) ? tiposData : []);
    } catch (err) {
      setError("Error al cargar vehículos");
      setVehiculos([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarVehiculos();
  }, [reload]);

  const handleDelete = async (id_vehiculo) => {
    await deleteVehiculo(id_vehiculo);
    cargarVehiculos();
  };

  const getTipoNombre = (idtipoVeh) => {
    const tipo = tipos.find((t) => t.idtipoVeh === idtipoVeh);
    return tipo ? tipo.tipoVeh : idtipoVeh;
  };

  if (loading) return <p>Cargando vehículos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: 24,
        maxWidth: 700,
        margin: "auto",
      }}
    >
      <h2 style={{ color: "#2980ef" }}>Lista de Vehículos</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f6ff" }}>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Marca</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                style={{
                  color: "#888",
                  textAlign: "center",
                }}
              >
                No hay vehículos registrados.
              </td>
            </tr>
          ) : (
            vehiculos.map((v) => (
              <tr
                key={v.id_vehiculo}
                style={{ borderBottom: "1px solid #eee" }}
              >
                <td>{v.placa}</td>
                <td>{v.modelo}</td>
                <td>{v.color}</td>
                <td>{v.marca}</td>
                <td>{getTipoNombre(v.idtipoVeh)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(v.id_vehiculo)}
                    style={{
                      background: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "6px 14px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

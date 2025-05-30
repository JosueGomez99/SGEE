// Servicio para consumir la API de vehículos
const API_URL = "http://localhost:3000/api/v2/vehiculos";

export async function getVehiculos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createVehiculo(vehiculo) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehiculo),
  });
  return res.json();
}

export async function deleteVehiculo(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}

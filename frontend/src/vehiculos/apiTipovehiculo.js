// Servicio para consumir la API de tipos de vehículo
const API_URL = "http://localhost:3000/api/v2/tipovehiculo";

export async function getTiposVehiculo() {
  const res = await fetch(API_URL);
  return res.json();
}

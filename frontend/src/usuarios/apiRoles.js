// Servicio para consumir la API de roles
const API_URL = "http://localhost:3000/api/v2/roles";

export async function getRoles() {
  const res = await fetch(API_URL);
  return res.json();
}

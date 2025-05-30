// Servicio para consumir la API de espacios
const API_URL = "http://localhost:3000/api/v2/espacios";

export async function getEspacios() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createEspacio(espacio) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(espacio),
  });
  return res.json();
}

export async function deleteEspacio(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}

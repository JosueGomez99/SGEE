// Servicio para consumir la API de instituciones
const API_URL = "http://localhost:3000/api/v2/institucion";

export async function getInstituciones() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createInstitucion(institucion) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(institucion),
  });
  return res.json();
}

export async function deleteInstitucion(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}

export async function updateInstitucion(id, institucion) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(institucion),
  });
  return res.json();
}

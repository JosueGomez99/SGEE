// Servicio para consumir la API de usuarios
const API_URL = "http://localhost:3000/api/v2/usuarios";

export async function getUsuarios() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createUsuario(usuario) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return res.json();
}

export async function deleteUsuario(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}

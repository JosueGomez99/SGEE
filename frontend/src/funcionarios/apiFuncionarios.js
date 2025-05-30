// Servicio para consumir la API de funcionarios
const API_URL = "http://localhost:3000/api/v2/funcionarios";

export async function getFuncionarios() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createFuncionario(funcionario) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(funcionario),
  });
  return res.json();
}

export async function deleteFuncionario(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
}

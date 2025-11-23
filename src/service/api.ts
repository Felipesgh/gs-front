const API_URL = import.meta.env.VITE_API_URL || "https://focus-play.onrender.com";

export async function getRanking() {
  const response = await fetch(`${API_URL}/ranking`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    console.error("Erro ao buscar ranking:", response.status);
    return [];
  }

  return response.json();
}

export async function apiGet(path: string) {
  const response = await fetch(`${API_URL}${path}`);
  return response.json();
}

export async function apiPost(path: string, body: any) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function apiPut(path: string, body: any) {
  await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function apiDelete(path: string) {
  return fetch(`${API_URL}${path}`, { method: "DELETE" });
}
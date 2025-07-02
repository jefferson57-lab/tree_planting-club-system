const API_BASE = process.env.REACT_APP_API_URL || '/api';

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchClubs() {
  const res = await fetch(`${API_BASE}/clubs/`, { headers: authHeaders() });
  return res.json();
}

export async function fetchClub(id) {
  const res = await fetch(`${API_BASE}/clubs/${id}`, { headers: authHeaders() });
  return res.json();
}

export async function fetchEvent(id) {
  const res = await fetch(`${API_BASE}/events/${id}`, { headers: authHeaders() });
  return res.json();
}

export async function createMembership(data) {
  const res = await fetch(`${API_BASE}/memberships/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function createReview(data) {
  const res = await fetch(`${API_BASE}/reviews/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return res.json();
}

export { authHeaders, API_BASE };

const API = "http://localhost:3000/api";

async function login(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  localStorage.setItem("token", data.token);
  window.location = "dashboard.html";
}

async function loadOffers() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}/offers`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const offers = await res.json();
  document.getElementById("offers").innerHTML =
    offers.map(o => `<div>Oferta #${o.id}: ${o.availableKwh} kWh a R$ ${o.pricePerKwh}</div>`).join("");
}

document.getElementById("loginForm")
  ? document.getElementById("loginForm").addEventListener("submit", login)
  : loadOffers();

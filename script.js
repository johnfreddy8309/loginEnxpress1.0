//url del backend
const API_URL = "http://localhost:3000/auth/login";

// Funcion para registrar un usuario
document.getElementById("registerBtn").addEventListener("click", async () => {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    if (!usuario || !password) {
        alert("Por favor, completa todos los campos");
        return;
    }

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: username, contrasena: password }),
    });

    const data = await response.json();
    alert(data.message);
});

// Función para iniciar sesión
document.getElementById("loginBtn").addEventListener("click", async () => {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if (!username || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: username, contrasena: password }),
    });

    const data = await response.json();
    alert(data.message);
});
    

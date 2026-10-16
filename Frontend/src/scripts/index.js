const loginForm = document.querySelector("#login-form");
const loginButton = document.querySelector("#login-button");
const loginMessage = document.querySelector("#login-message");
const localHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
const apiBaseUrl = localHost ? `http://${window.location.hostname}:3000` : window.location.origin;

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginButton.disabled = true;
    loginMessage.textContent = "";
    delete loginMessage.dataset.state;

    try {
        const response = await fetch(`${apiBaseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                email: loginForm.elements.email.value.trim(),
                senha: loginForm.elements.password.value,
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Não foi possível entrar na conta.");
        }

        loginForm.reset();
        loginMessage.textContent = `Login realizado. Bem-vindo(a), ${data.user.nome}!`;
        loginMessage.dataset.state = "success";
    } catch (error) {
        loginMessage.textContent = error instanceof Error ? error.message : "Não foi possível conectar ao servidor.";
        loginMessage.dataset.state = "error";
    } finally {
        loginButton.disabled = false;
    }
});

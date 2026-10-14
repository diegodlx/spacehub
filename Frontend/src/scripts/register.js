const form = document.querySelector("#register-form");
const password = document.querySelector("#password");
const confirmation = document.querySelector("#confirm-password");
const message = document.querySelector("#register-message");
const submitButton = document.querySelector("#register-button");
const registerUrl = "http://localhost:3000/auth/register";

function validatePasswordConfirmation() {
    confirmation.setCustomValidity(
        confirmation.value !== password.value ? "As senhas devem ser iguais." : ""
    );
}

password.addEventListener("input", validatePasswordConfirmation);
confirmation.addEventListener("input", validatePasswordConfirmation);

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    validatePasswordConfirmation();
    if (!form.reportValidity()) return;

    const fields = new FormData(form);
    const user = {
        nome: fields.get("nome"),
        perfil: fields.get("perfil"),
        email: fields.get("email"),
        senha: fields.get("senha"),
        telefone: fields.get("telefone") || null,
        data_nascimento: fields.get("data_nascimento") || null,
        foto_perfil: fields.get("foto_perfil") || null,
    };

    submitButton.disabled = true;
    submitButton.textContent = "Criando conta...";
    message.hidden = true;

    try {
        const response = await fetch(registerUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        const result = await response.json();

        if (!response.ok) {
            const invalidField = result.errors?.[0]?.field;
            const fieldLabels = {
                nome: "nome",
                perfil: "perfil",
                email: "e-mail",
                senha: "senha (mínimo de 8 caracteres)",
                telefone: "telefone",
                data_nascimento: "data de nascimento",
                foto_perfil: "link da foto de perfil",
            };
            const detail = response.status === 400 && invalidField
                ? ` Confira o campo ${fieldLabels[invalidField] || invalidField}.`
                : "";
            throw new Error((result.message || "Não foi possível criar a conta.") + detail);
        }

        message.textContent = "Conta criada com sucesso! Agora você pode entrar.";
        message.dataset.state = "success";
        form.reset();
    } catch (error) {
        message.textContent = error instanceof TypeError
            ? "Não foi possível conectar ao servidor. Verifique se o backend está em execução."
            : error.message;
        message.dataset.state = "error";
    } finally {
        message.hidden = false;
        submitButton.disabled = false;
        submitButton.textContent = "Criar conta";
    }
});

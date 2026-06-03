const usuarioLogado = localStorage.getItem("usuarioVeltrix");
const acoesConta = document.querySelector(".acoes-conta");
const formLogin = document.querySelector(".form-login");
const campoNome = document.querySelector("#nome");
const campoEmailLogin = document.querySelector("#email");
const campoEmailCadastro = document.querySelector("#email-cadastro");

function pegarPrimeiroNome(nome, email) {
    if (nome && nome.trim()) {
        return nome.trim().split(" ")[0];
    }

    return email.split("@")[0];
}

function mostrarPerfil(usuario) {
    if (!acoesConta) {
        return;
    }

    const inicial = usuario.nome.charAt(0).toUpperCase();

    acoesConta.classList.add("perfil-logado");
    acoesConta.innerHTML = `
        <a class="perfil-cliente" href="index.html" aria-label="Perfil do cliente">
            <span class="avatar-cliente">${inicial}</span>
            <span>
                <strong>${usuario.nome}</strong>
                <small>Minha conta</small>
            </span>
        </a>
        <button class="botao-sair" type="button">Sair</button>
    `;

    acoesConta.querySelector(".botao-sair").addEventListener("click", function () {
        localStorage.removeItem("usuarioVeltrix");
        window.location.href = "index.html";
    });
}

if (usuarioLogado) {
    mostrarPerfil(JSON.parse(usuarioLogado));
}

if (formLogin) {
    formLogin.addEventListener("submit", function () {
        const email = campoEmailLogin ? campoEmailLogin.value : campoEmailCadastro.value;
        const nome = campoNome ? campoNome.value : "";
        const usuario = {
            nome: pegarPrimeiroNome(nome, email),
            email: email
        };

        localStorage.setItem("usuarioVeltrix", JSON.stringify(usuario));
    });
}

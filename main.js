// Tenta carregar interesses salvos no localStorage ou usa o padrão inicial
let interesses = JSON.parse(localStorage.getItem("interesses")) || [];

// Seletores
const inputElement = document.querySelector(".form-input");
const buttonElement = document.querySelector("button");
const ulElement = document.querySelector('.lista__content ul');
const limparButton = document.querySelector(".limpar");
const contadorElement = document.getElementById("contador");

// Função para renderizar os itens na lista
function renderizarLista() {
    ulElement.innerHTML = ""; // Limpa a lista antes de renderizar
    interesses.forEach(interesse => {
        const li = document.createElement("li");
        li.innerText = interesse;
        ulElement.appendChild(li);
    });
    atualizarContador(); // Atualiza o número após renderizar
}

// Evento de clique no botão "Adicionar"
buttonElement.addEventListener("click", function () {
    let conteudoDoInput = inputElement.value.trim();

    if (conteudoDoInput) {
        // Evita duplicados
        if (interesses.includes(conteudoDoInput)) {
            alert("Esse item já foi adicionado.");
            return;
        }

        interesses.push(conteudoDoInput);
        localStorage.setItem("interesses", JSON.stringify(interesses)); // Salva no localStorage
        renderizarLista();

        inputElement.value = '';
        inputElement.classList.remove('is-invalid');
    } else {
        inputElement.classList.add('is-invalid');
    }

    atualizarContador(); // Atualiza o número após renderizar
});

// Evento de clique no botão "Limpar lista"
limparButton.addEventListener("click", function () {
    interesses = [];
    localStorage.removeItem("interesses");
    renderizarLista();
});

// Inicializa a lista ao carregar a página
renderizarLista();

// Atualiza o contador visual com o número de itens
function atualizarContador() {
    contadorElement.innerText = interesses.length;
}

buttonElement.addEventListener("mouseover", function() {
    // Adiciona a classe de carregamento quando o mouse está sobre o botão
    buttonElement.classList.add("loading");
});

buttonElement.addEventListener("mouseout", function() {
    // Remove a classe de carregamento quando o mouse sai do botão
    buttonElement.classList.remove("loading");
});

buttonElement.addEventListener("click", function() {
    // Ao clicar, remove a animação
    buttonElement.classList.remove("loading");
});
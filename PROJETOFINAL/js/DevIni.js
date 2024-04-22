document.getElementById("meuFormulario").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os dados do formulário
    var formData = new FormData(this);
    var mensagem = formData.get("mensagem");

    // Cria um novo elemento <p> para a mensagem
    var novaMensagem = document.createElement("p");
    novaMensagem.textContent = mensagem;

    // Adiciona a nova mensagem ao <div id="mensagens">
    var mensagensDiv = document.getElementById("mensagens");
    mensagensDiv.appendChild(novaMensagem);

    // Limpa o campo de texto após enviar a mensagem
    this.reset();
});




document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    const mensagem = document.getElementById('mensagem').value; // Obtém o valor do campo de mensagem
    const user = document.getElementById('user').textContent; // Obtém o valor do campo de nome de usuário
    const arquivo = document.getElementById('arquivo').files[0]; // Obtém o arquivo selecionado

    // Cria um novo elemento de mensagem
    const novaMensagem = document.createElement('div');
    novaMensagem.classList.add('caixa-de-conversa');
    novaMensagem.innerHTML = `
        <div class="avatar">
            <img src="/img/relampago-mcqueen_capa_widelg.jpg" alt="Avatar">
        </div>
        <div class="conteudo">
            <p class="usuario" id="user">${user}</p>
            <p>${mensagem}</p>
        </div>
    `;

    // Se um arquivo foi selecionado, adiciona um elemento correspondente à mensagem
    if (arquivo) {
        const tipoArquivo = arquivo.type.split('/')[0]; // Obtém o tipo de arquivo (audio, image, video)

        if (tipoArquivo === 'audio') {
            const audioElement = document.createElement('audio');
            audioElement.src = URL.createObjectURL(arquivo);
            audioElement.controls = true;
            novaMensagem.querySelector('.conteudo').appendChild(audioElement);
        } else if (tipoArquivo === 'image') {
            const imagemElement = document.createElement('img');
            imagemElement.src = URL.createObjectURL(arquivo);
            novaMensagem.querySelector('.conteudo').appendChild(imagemElement);
        } else if (tipoArquivo === 'video') {
            const videoElement = document.createElement('video');
            videoElement.src = URL.createObjectURL(arquivo);
            videoElement.controls = true;
            novaMensagem.querySelector('.conteudo').appendChild(videoElement);
        }
    }

    // Insere a nova mensagem na caixa de conversas
    const mensagensContainer = document.getElementById('mensagens');
    mensagensContainer.appendChild(novaMensagem);

    // Limpa os campos após o envio
    document.getElementById('mensagem').value = '';
    document.getElementById('arquivo').value = ''; // Limpa a seleção do arquivo
});

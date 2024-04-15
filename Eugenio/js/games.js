// Adiciona um ouvinte de eventos para o evento 'submit' no formulário com o ID 'meuFormulario'
document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém o valor do campo de mensagem
    const mensagem = document.getElementById('mensagem').value;

    // Obtém o valor do campo de nome de usuário
    const user = document.getElementById('user').textContent;

    // Obtém o arquivo selecionado, se houver
    const arquivo = document.getElementById('arquivo').files[0];

    // Cria um novo contêiner para a mensagem
    const novaMensagemContainer = document.createElement('div');
    novaMensagemContainer.classList.add('caixa-de-conversa');

    // Cria um novo elemento de mensagem
    const novaMensagem = document.createElement('div');
    novaMensagem.classList.add('mensagem');

    // Preenche o conteúdo da nova mensagem com HTML
    novaMensagem.innerHTML = `
        <div class="avatar">
            <img src="/imagens/batman icon.jpeg" alt="Avatar">
        </div>
        <div class="conteudo">
            <p class="usuario" id="user">${user}</p>
            <p>${mensagem}</p>
        </div>
    `;

    // Se um arquivo foi selecionado, adiciona um elemento correspondente à mensagem
    if (arquivo) {
        const tipoArquivo = arquivo.type.split('/')[0]; // Obtém o tipo de arquivo (audio, image, video)

        // Cria um elemento de mídia correspondente ao tipo de arquivo
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

    // Adiciona a nova mensagem ao contêiner de mensagens
    novaMensagemContainer.appendChild(novaMensagem);

    // Insere o contêiner de mensagem na caixa de conversas
    const mensagensContainer = document.getElementById('mensagens');
    mensagensContainer.appendChild(novaMensagemContainer);

    // Limpa os campos após o envio
    document.getElementById('mensagem').value = '';
    document.getElementById('arquivo').value = ''; // Limpa a seleção do arquivo
});

// Adiciona um ouvinte de eventos para o evento 'keydown' no campo de mensagem
document.getElementById('mensagem').addEventListener('keydown', function(event) {
    // Verifica se a tecla pressionada foi 'Enter'
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o envio padrão do formulário
        document.getElementById('meuFormulario').dispatchEvent(new Event('submit')); // Dispara o evento de envio do formulário
    }
});

// Função para abrir a caixa de texto flutuante
function abrirCaixa() {
    document.getElementById("caixaFlutuante").style.display = "block";
}

// Função para fechar a caixa de texto flutuante
function fecharCaixa() {
    document.getElementById("caixaFlutuante").style.display = "none";
}

// Exibir a caixa de texto flutuante quando a página carregar
window.onload = abrirCaixa;

// Obtém referências para os elementos HTML dentro da seção novoPostDiv
const novoPostDiv = document.getElementById('novoPostDiv');
const formularioNovoPost = novoPostDiv.querySelector('#formularioNovoPost');
const tituloPostInput = novoPostDiv.querySelector('#tituloPost');
const mensagemInput = novoPostDiv.querySelector('#mensagem');
const arquivoInput = novoPostDiv.querySelector('#arquivo');

// Adiciona um ouvinte de eventos para o envio de novo comentário
document.getElementById('formularioComentario').addEventListener('submit', function (event) {
            
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém o valor do novo comentário
    const novoComentario = document.getElementById('novoComentario').value;

    // Verifica se o campo de comentário está vazio
    if (novoComentario.trim() === '') {
        alert('Por favor, insira um comentário antes de enviar.');
        return; // Sai da função se o campo estiver vazio
    }

    // Cria um novo elemento de comentário
    const novoComentarioDiv = document.createElement('div');
    novoComentarioDiv.classList.add('comentario');
    novoComentarioDiv.innerHTML = `<p><strong>Usuário</strong>: ${novoComentario}</p>`;

    // Adiciona o novo comentário dentro da mesma div
    const novoComentarioContainer = document.querySelector('.novoComentario');
    novoComentarioContainer.parentNode.insertBefore(novoComentarioDiv, novoComentarioContainer);

    // Limpa o campo de comentário após o envio
    document.getElementById('novoComentario').value = '';
});


// Adiciona um ouvinte de evento para o formulário de novo post
formularioNovoPost.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtém os valores inseridos nos campos de entrada
    const tituloPost = tituloPostInput.value;
    const mensagem = mensagemInput.value;
    const arquivo = arquivoInput.files[0]; // Obtém o primeiro arquivo selecionado (caso haja)

    // Cria os elementos HTML para representar o novo post
    const novoPost = document.createElement('div');
    novoPost.classList.add('conversaBox');

    novoPost.innerHTML = `
        <div class="infoUsuarioDiv">
            <div class="avatarUsuarioDiv">
                <img class="avatarUsuario" src="/imagens/imagem1.png" alt="Avatar">
            </div>
            <div class="nomeTempoDiv">
                <p class="nomeUsuario"><strong>Usuário</strong></p>
                <p class="tempoPost">Agora mesmo</p>
            </div>
        </div>
        <div class="conteudo">
            <h1>${tituloPost}</h1>
            <p>${mensagem}</p>
            ${arquivo ? criarElementoArquivo(arquivo) : ''}
        </div>
        <div class="novoComentario">
            <form class="formularioComentario" method="post" action="/postar-comentario">
                <div class="caixa-mensagem">
                    <textarea class="novoComentario" name="novoComentario" placeholder="Escreva seu comentário..."></textarea>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    `;

    // Adiciona o novo post à seção conversaDiv
    const conversaDiv = document.getElementById('conversaDiv');
    conversaDiv.appendChild(novoPost);

    // Limpa os campos de entrada do formulário
    tituloPostInput.value = '';
    mensagemInput.value = '';
    arquivoInput.value = '';

    // Adiciona um ouvinte de evento para o envio do formulário de comentário dentro do novo post
    const formularioComentario = novoPost.querySelector('.formularioComentario');
    formularioComentario.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obtém o valor do comentário
        const comentarioInput = formularioComentario.querySelector('.novoComentario');
        const comentario = comentarioInput.value;

        // Cria um elemento para representar o comentário
        const novoComentario = document.createElement('div');
        novoComentario.classList.add('comentario');
        novoComentario.innerHTML = `<p><strong>Usuário:</strong> ${comentario}</p>`;

        // Adiciona o comentário ao final do conteúdo do post
        const conteudoPost = novoPost.querySelector('.conteudo');
        conteudoPost.appendChild(novoComentario);

        // Limpa o campo de comentário
        comentarioInput.value = '';
    });

    
});

// Função para criar elemento de áudio ou vídeo dependendo do tipo de arquivo
function criarElementoArquivo(arquivo) {
    const extensao = arquivo.name.split('.').pop().toLowerCase();
    if (extensao === 'mp3' || extensao === 'ogg' || extensao === 'wav') {
        return `<audio controls><source src="${URL.createObjectURL(arquivo)}" type="audio/${extensao}">Seu navegador não suporta a reprodução de áudio.</audio>`;

    } else if (extensao === 'mp4' || extensao === 'webm' || extensao === 'ogg' || extensao === 'm4v') {
        return `<video controls><source src="${URL.createObjectURL(arquivo)}" type="video/${extensao}">Seu navegador não suporta a reprodução de vídeo.</video>`;

    } else if (extensao === 'jpg' || extensao === 'jpeg' || extensao === 'png' || extensao === 'gif') {
        return `<img src="${URL.createObjectURL(arquivo)}" alt="Imagem do post">`;

    } else {
        return `<p>Arquivo não suportado: ${arquivo.name}</p>`;
    }
}

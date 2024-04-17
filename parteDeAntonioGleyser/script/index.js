window.onload = function() {
    // Declaração das variáveis
    const comunidadeContainer = document.getElementById('comunidadeDiv');
    const comunidadeDivs = document.querySelectorAll(".comunidadeItem");
    const mostrarMaisBtn = document.getElementById("mostrarMaisBtn");
    const larguraTela = 768;
    const alturaMaxima = 100;

    // Variável para controlar o estado atual do botão
    let mostrandoMais = false;

    // Função para mostrar ou ocultar as divs da comunidade
    function toggleDivs() {
        // Verifica se está mostrando mais ou menos divs
        if (mostrandoMais) {
            // Oculta as divs além das três primeiras
            for (let i = 3; i < comunidadeDivs.length; i++) {
                comunidadeDivs[i].style.display = "none";
            }
            // Atualiza o texto do botão
            mostrarMaisBtn.textContent = 'Mostrar Mais';
        } else {
            // Exibe todas as divs da comunidade
            for (let i = 0; i < comunidadeDivs.length; i++) {
                comunidadeDivs[i].style.display = "block";
            }
            // Atualiza o valor do botão
            mostrarMaisBtn.textContent = 'Mostrar Menos';
        }
        // Inverte o estado
        mostrandoMais = !mostrandoMais;
    }

    // Função para ajustar o layout quando a largura da janela é maior que 768 pixels
    function ajustarLayout() {
        if (window.innerWidth > larguraTela && mostrandoMais) {
            // Layout quando a largura da tela é maior que larguraTela e mostrandoMais é verdadeiro
            comunidadeContainer.style.display = 'flex';
            comunidadeContainer.style.flexFlow = 'column wrap'
            comunidadeContainer.style.alignContent = 'center';
            comunidadeContainer.style.justifyContent = 'space-evenly';
            mostrarMaisBtn.style.alignSelf = 'flex-end';
            for (let i = 0; i < comunidadeDivs.length; i++) {
                comunidadeDivs[i].style.width = 'auto'; // Largura automática para ocupar o espaço das colunas
                comunidadeDivs[i].style.gridColumn = 'span 1'; // Cada div deve ocupar uma coluna
            }
        }
        else {
            for (let i = 0; i < comunidadeDivs.length; i++) {
                comunidadeDivs[i].style.width = 'auto'; // Largura automática para ocupar o espaço das colunas
            }
            
        }
    }
    
    // Ajusta o layout quando a página é carregada
    ajustarLayout();

    // Atribuição do evento onclick ao botão "Mostrar Mais"
    mostrarMaisBtn.onclick = function() {
        toggleDivs();
    }

    // Ajusta o layout quando a janela é redimensionada
    window.onresize = function() {
        ajustarLayout();
    }
}

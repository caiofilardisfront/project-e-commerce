/* Objetivo 1 - quando clicar no botao de adicionar ao carrinho temos que atualizar o 
contador, adicionar o produto no localStorage e atualizar o html do carrinho
    parte 1 - vamos adicionar +1 no icone do carrinho
        passo 1 - pegar os botões de adicionar ao carrinho do html */
const botoesAdicionarAoCarrinho = document.querySelectorAll('.adicionar-ao-carrinho'); // variavel imutável 'const' com objeto do tipo NodeList (lista de elementos do DOM)

/*  passo 2 - adicionar uma evento de escuta nesses botões pra quando clicar disparar uma ação */
botoesAdicionarAoCarrinho.forEach(botao => {
    botao.addEventListener('click', () => {
        // passo 3 - pegar o valor do contador do carrinho e adicionar +1
        
    });
});
/* Objetivo 1 - quando clicar no botao de adicionar ao carrinho temos que atualizar o 
contador, adicionar o produto no localStorage e atualizar o html do carrinho
    parte 1 - vamos adicionar +1 no icone do carrinho
        passo 1 - pegar os botões de adicionar ao carrinho do html */
const botoesAdicionarAoCarrinho = document.querySelectorAll('.adicionar-ao-carrinho'); // variavel imutável 'const' com objeto do tipo NodeList (lista de elementos do DOM)

/*  passo 2 - adicionar uma evento de escuta nesses botões pra quando clicar disparar uma ação */
botoesAdicionarAoCarrinho.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        // passo 3 - pegar o valor do contador do carrinho e adicionar +1
        const elementoProduto = evento.target.closest(".produto") // pega o elemento mais próximo com a classe 'produto'
        const produtoId = elementoProduto.dataset.id; // pega o valor do atributo 'data-id' do elemento produto
        const produtoNome = elementoProduto.querySelector(".nome").textContent; // pega o nome do produto
        const produtoImagem = elementoProduto.querySelector("img").getAttribute("src"); // pega a URL da imagem do produto
        const produtoPreco = parseFloat(elementoProduto.querySelector(".preco").textContent.replace('R$', '').replace(".", "").replace(",",".").trim()); // pega o preço do produto e converte para número
        
        // 1. bsucar lista de itens no carrinho
        const carrinho = obterItensDocCarrinho();

        // 2. verifica se existe itens no carrinho
        const existeItem = carrinho.find(produto => produto.id === produtoId);

        // 2.1. se existe produto
        if (existeItem) {
            existeItem.quantidade += 1;
        } else { 
            // se não existe adiciono o produto com quantidade + 1
            const produto = {
                id: produtoId,
                name: produtoNome,
                imagem: produtoImagem,
                preco: produtoPreco,
                quantidade: 1
            };
            carrinho.push(produto);
        }

        // objeto que armazena ações do botão do carrinho
        salvarProdutoCarrinho(carrinho);
        atualizarContadorCarrinho();
    });
});

function salvarProdutoCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function obterItensDocCarrinho() {
    const produtos = localStorage.getItem("carrinho");
    return produtos ? JSON.parse(produtos):[]; // transforma em objeto
}

// passo 4 - atualizar o contador do carrinho de compras
function atualizarContadorCarrinho() {
    // 1. pegar o carrinho e listar a quantidade de itens
    const carrinho = obterItensDocCarrinho();
    let total = 0;

    // 2. percorrer os itens e somar a quantidade total de itens
    carrinho.forEach(produto => {
        total += produto.quantidade;
    });

    // 3. pegar e atualizar o valor do carrinho
    document.getElementById("contador-carrinho").textContent = total;
}

atualizarContadorCarrinho();
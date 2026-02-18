//  passo 1 - pegar os botões de adicionar ao carrinho do html
const botoesAdicionarAoCarrinho = document.querySelectorAll('.adicionar-ao-carrinho'); // variavel imutável 'const' com objeto do tipo NodeList (lista de elementos do DOM)

/*  passo 2 - adicionar uma evento de escuta nesses botões pra quando clicar disparar uma ação */
botoesAdicionarAoCarrinho.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        // passo 3 - pegar o valor do contador do carrinho e adicionar +1
        const elementoProduto = evento.target.closest(".produto") // pega o elemento mais próximo com a classe 'produto'
        const produtoId = elementoProduto.dataset.id; // pega o valor do atributo 'data-id' do elemento produto
        const produtoNome = elementoProduto.querySelector(".nome").textContent; // pega o nome do produto
        const produtoImagem = elementoProduto.querySelector("img").getAttribute("src"); // pega a URL da imagem do produto
        const produtoPreco = parseFloat(elementoProduto.querySelector(".preco").textContent.replace('R$', '').replace(".", "").replace(",", ".").trim()); // pega o preço do produto e converte para número

        // 1. bsucar lista de itens no carrinho
        const carrinho = obterItensDoCarrinho();

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
        atualizarCarrinhoETabela();
    });
});

function salvarProdutoCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function obterItensDoCarrinho() {
    const produtos = localStorage.getItem("carrinho");
    return produtos ? JSON.parse(produtos) : []; // transforma em objeto
}

// passo 4 - atualizar o contador do carrinho de compras
function atualizarContadorCarrinho() {
    // 1. pegar o carrinho e listar a quantidade de itens
    const carrinho = obterItensDoCarrinho();
    let total = 0;

    // 2. percorrer os itens e somar a quantidade total de itens
    carrinho.forEach(produto => {
        total += produto.quantidade;
    });

    // 3. pegar e atualizar o valor do carrinho
    document.getElementById("contador-carrinho").textContent = total;
}


// passo 5 - renderizar a tabela do carrinho de compras
function renderizarTabelaCarrinhoCompras() {
    // 1. buscar os produtos docarrinho
    const produtos = obterItensDoCarrinho();

    // 2. buscar o corpo da tabela
    const corpoTabela = document.querySelector("#modal-1-content table tbody"); // como se fosse uma propriedade CSS

    // 3. limpar a atbela antes de renderizar
    corpoTabela.innerHTML = "";

    // 4. Adicionar os itens pegando do carrinho
    produtos.forEach(produto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td class="td-produto">
                            <img src="${produto.imagem}" alt="${produto.nome}">
                        </td>
                        <td>${produto.name}</td>
                        <td class="td-preco-unitario">R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
                        <td class="td-quantidade"><input type="number" class="input-quantidade" data-id="${produto.id}" value="${produto.quantidade}" min="1"></td>
                        <td class="td-preco-total">R$ ${(produto.preco * produto.quantidade).toFixed(2).replace(".", ",")}</td>
                        <td><button class="btn-remover" data-id=${produto.id} id="deletar"></button></td>`;
        corpoTabela.appendChild(tr);
    })
}

renderizarTabelaCarrinhoCompras();

/* ------ Objetivo 2 - remover produtos do carrinho ----- */
// passo 1 - pegar o botão de deletar do html
const corpoTabela = document.querySelector("#modal-1-content table tbody");
corpoTabela.addEventListener("click", evento => {
    // se a lista contém um "btn-deletar"
    if (evento.target.classList.contains('btn-remover')) {
        const id = evento.target.dataset.id;
        removeItemDoCarrinho(id);
    }

});

//-- Objetivo 3 - Atualizar os valores do carrinho
    //-- passo 1 - adicionar evento de escuta no input do tbody
corpoTabela.addEventListener("input", evento => {
    //-- passo 2 - atualizar o valor total do produto
    if (evento.target.classList.contains("input-quantidade")) {
        // 1. buscar o carrnho
        const buscarProdutos = obterItensDoCarrinho();
        // 2. obtem o item do carrinho
        const buscarItensCarrinho = buscarProdutos.find(produto => produto.id === evento.target.dataset.id); 
        let novaQuantidade = parseInt(evento.target.value); // pega o valor do id encontrado
        // 3. verifico se há produto nele e adiciono a nova quantidade
        if (buscarItensCarrinho) {
            buscarItensCarrinho.quantidade = novaQuantidade;
        }
        // 4. salvo a nova quantidade
        salvarProdutoCarrinho(buscarProdutos);
        atualizarCarrinhoETabela();
    }
});

function removeItemDoCarrinho(id) {
    // 1. buscar itens do carrinho
    const produtos = obterItensDoCarrinho();

    // 2. filtra os produtos que não possuem o id passado por parÂmetroS
    const carrinhoAtualizado = produtos.filter(produto => produto.id !== id);
    
    salvarProdutoCarrinho(carrinhoAtualizado);
    atualizarCarrinhoETabela();
}

// -- passo 3 - atualizar o valor total do carrinho
function atualizarValorTotalCarrinho() {
    // 1. buscar itens do carrinho 
    const buscarProdutos = obterItensDoCarrinho();
    let total = 0;

    // 2. percorrer esses itens e calculando
    buscarProdutos.forEach(produto => {
        total += produto.preco * produto.quantidade; 
    });

    // 3. pegar o cálculo e mostrar conteúdo na tela
    document.querySelector("#total-carrinho").textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
}

function atualizarCarrinhoETabela() {
    atualizarContadorCarrinho();
    renderizarTabelaCarrinhoCompras();
    atualizarValorTotalCarrinho();
}

atualizarCarrinhoETabela();


document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('produtos')) {
        const url = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';

        fetch(url)
        .then(response => response.json())
        .then(data => {
            const produtoSection = document.getElementById("produtos");
            produtoSection.innerHTML = "";

            data.results.forEach(produto => {
                const produtoDiv = document.createElement("div");
                produtoDiv.classList.add("produtos");

                produtoDiv.innerHTML = `
                    <img src="${produto.thumbnail}" alt="${produto.title}" class="img-fluid">
                    <div>
                        <h2>${produto.title}</h2>
                        <p>R$ ${produto.price.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="window.open('${produto.permalink}', '_blank')">Comprar</button>
                    </div>
                    <br>
                `;
                produtoSection.appendChild(produtoDiv);
            });
        })
        .catch(error => {
            console.error("ERRO: Não foi possível achar os dados", error);
        });
    }

    
    if (document.getElementById('carrinho-items')) {
        function adicionarItem(nome, quantidade, preco) {
            const tabela = document.getElementById('carrinho-items');
            const linha = document.createElement('tr');

            const subtotal = quantidade * preco;

            linha.innerHTML = `
                <td>${nome}</td>
                <td>${quantidade}</td>
                <td>R$ ${preco.toFixed(2)}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
            `;

            tabela.appendChild(linha);
            atualizarTotal();
        }

        function atualizarTotal() {
            const linhas = document.querySelectorAll('#carrinho-items tr');
            let total = 0;

            linhas.forEach(linha => {
                const subtotal = parseFloat(linha.children[3].textContent.replace('R$ ', '').replace(',', '.'));
                total += subtotal;
            });

            document.getElementById('total').textContent = total.toFixed(2);
        }

        
        adicionarItem('Produto A', 2, 29.99);
        adicionarItem('Produto B', 1, 49.90);
    }
});
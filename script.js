const url = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';

fetch(url)
.then(response => response.json())
.then(data => {
    const produtos = data.results;
    const produtosContainer = document.getElementById('produtos');
    const produtosContainer = document.getElementById('produtos');




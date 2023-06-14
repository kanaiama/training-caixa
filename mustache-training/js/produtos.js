var produtosData = {
    imgProdutos: [
        {img: 'img/planta1.jpeg'},
        {img: 'img/planta2.jpeg'},
        {img: 'img/planta3.jpeg',}
    ],
    produtos: [
        {preco: '$ 180', descricao: 'Avenca' },
        {preco: '$ 300', descricao: 'Conjunto violetas' },
        {preco: '$ 90', descricao: 'Dracena' }
    ]
};

var produtoTemplate = document.getElementById('template-produto').innerHTML;
var renderedProducts = Mustache.render(produtoTemplate, produtosData);

var productListContainer = document.getElementById('lista-produto');
productListContainer.innerHTML = renderedProducts;

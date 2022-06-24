const fs = require('fs')

const Produto = {
    filename: './data/produtos.json',

    // create: function(produtoData) {
    //     let allProdutos = this.getProdutos();
    //     let newProduto = {
    //         id: this.generateId(),
    //         ...produtoData
    //     }

    //     allProdutos.push(newProduto);
    //     fs.writeFileSync(this.fileName, JSON.stringify(allProdutos, null, ' '));
    //     return newUser;

    // },

    generateId: function() {
        let allProdutos = this.getProdutos();
        let lastProduto = allProdutos.pop();
    
        if (lastProduto) {
            return lastProduto.id + 1;
        }
        return 1
    },

    getProdutos: function() {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
    },

    findProdutoById: function(id) {
        let allProdutos = this.getProdutos();
        let produtoFound = allProdutos.find( oneProduto => oneProduto.id === id );
        return produtoFound;
    },

    findProdutoByField: function (field, value) {
        let allProdutos = this.getProdutos();
        let produtoFound = allProdutos.find( oneProduto => oneProduto[field] === value );
        return produtoFound;
    },

}

module.exports = Produto
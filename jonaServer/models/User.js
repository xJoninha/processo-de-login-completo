// CRUD

// 1- Salvar o usúario na base de dados



const fs = require('fs')

const User = {
    filename: './data/users.json',

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
        let allUsers = this.getUsers();
        let lastUser = allUsers.pop();
    
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    getUsers: function() {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))
    },

    findUserById: function(id) {
        let allUsers = this.getUsers();
        let userFound = allUsers.find( oneUser => oneUser.id === id );
        return userFound;
    },

    findUserByField: function (field, value) {
        let allUsers = this.getUsers();
        let userFound = allUsers.find( oneUser => oneUser[field] === value );
        return userFound;
    },

}

console.log(User.generateId())
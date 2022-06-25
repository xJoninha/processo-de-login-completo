// fazendo require do 'fs' e do metodo http 'get'
const fs = require('fs');
const { get } = require('https');

const User = {
    // aqui estamos dizendo ao 'User' qual
    // vai ser o arquivo que vamo lêr e escrever
    fileName: './data/users.json',

    // propriedade usada para 'gravar' os dados
    // em nosso banco de dados
    create: function(userData) {
        let allUsers = this.getUsers();
        let newUser = {
            id: this.generateId(),
            ...userData
        }

        // usando o metodo 'push', salvamos os dados recebidos
        // pelo body(userData), no arquivo 'users.json'
        allUsers.push(newUser)
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))
        return newUser;
    },

    // propriedade usada para gerar um novo id, 
    // independente se já existe id ou não
    generateId: function() {
        let allUsers = this.getUsers();
        let lastUser = allUsers.pop();
    
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    // propriedade usada para ler o arquivo que 
    // será usado como 'banco de dados'
    getUsers: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'))
    },

    // propriedade usada para encontrar usuario por ID
    findUserById: function(id) {
        let allUsers = this.getUsers();
        let userFound = allUsers.find( oneUser => oneUser.id === id );
        return userFound;
    },

    // propriedade usada para encontrar usuario por CAMPO(field)
    findUserByField: function (field, value) {
        let allUsers = this.getUsers();
        let userFound = allUsers.find( oneUser => oneUser[field] === value );
        return userFound;
    },

}

// console.log usado para testar se as 
//propriedades estavam funcionando corretamente como esperado

// console.log(User.create({ userName: 'joaninha', userEmail: 'joaninha@email' }))


// exportando o 'model' User
module.exports = User;
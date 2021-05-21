const express = require('express'); // requere a biblioteca express
const consign = require('consign');

module.exports = () => {
    // configura o app
    const app = express(); // executa o express - cria um app
    
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    consign()
        .include('controllers')// inclui a pasta com os modulos das rotas
        .into(app) // passa essa variavel para todos os modulos incluidos acima

    return app;
}



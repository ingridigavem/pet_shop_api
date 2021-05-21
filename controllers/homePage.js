module.exports = app => {
    app.get('/', (req, res) => res.send('Você está na Home Page, mas não há nada aqui ainda... Caso queira ver algo entre na rota "/atendimentos"'));
}
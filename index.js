const customExpress = require('./config/customExpress');
const conection = require('./infraestrutura/conection'); // importa a conexao com o banco
const Tables = require('./infraestrutura/tables')

conection.connect(error => { // conecta com o banco
    if(error){
        console.log(error);
    } else {
        console.log('***** CONEXÃO NO BANCO EFETUADA COM SUCESSO *****');

        Tables.init(conection);
        
        const app = customExpress(); // executa a função exportada de customExpress
        
        app.listen(3000, () =>{ // quando for na porta 3000 vai fazer isso q ta na funcao -> dps q rodar o servidor com o node
            console.log('***** Servidor rodando na porta 3000 *****');
        });
    }
}); 


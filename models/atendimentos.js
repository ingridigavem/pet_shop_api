const moment = require('moment'); // importa biblioteca moment
const conection = require('../infraestrutura/conection')

class Atendimento{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss');

        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 3;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagemErro: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagemErro: 'Nome do cliente deve ter mais que 2 letras'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros){
            res.status(400).json(erros);
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = `INSERT INTO Atendimentos SET ?`;

            conection.query(sql, atendimentoDatado, (error, results) => {
                if(error){
                    res.status(400).json(error);
                } else {
                    res.status(201).json({atendimento});
                }
            })
        }

    }

    lista(res){
        const sql = `SELECT * FROM Atendimentos`;

        conection.query(sql, (error, resultados) => {
            if(error){
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados);
            }
        })
    }

    buscaID(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
        conection.query(sql, (error, resultados) => {
            const atendimento = resultados[0];
            if(error){
                res.status(400).json(error);
            } else{
                res.status(200).json(atendimento);
            }
        });   
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss');
        }
        const sql = `UPDATE Atendimentos SET ? WHERE id=?`;

        conection.query(sql, [valores, id], (error, resultados) => {
            if(error){
                res.status(400).json(error);
            } else{
                res.status(200).json({...valores, id});
            }
        })
    }

    deleta(id, res){
        const sql = `DELETE FROM Atendimentos WHERE id=?`

        conection.query(sql, id, (error, resultados) => {
            if(error){
                res.status(400).json(error);
            } else{
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Atendimento;
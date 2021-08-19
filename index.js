const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient

require('dotenv').config()

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})
console.log('App running');
const create_at = {
    pegarData() {
        var data = new Date();
        return data.toISOString();
    }
}


MongoClient.connect( process.env.CONNECTION_STRING, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('examsclients')
        const clients = db.collection('clients')
        app.use(express.static('public'));
        app.use(express.urlencoded({
            extended: true
        }))
        app.use('/', router);
        app.listen(process.env.PORT || 3000);
        //Post method
        app.post('/cadastro', (req, res) => {
            var erros = [];

            if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
                erros.push({ texto: "Nome Inválido" });
            }
            if (!req.body.phone || typeof req.body.phone == undefined || req.body.phone == null) {
                erros.push({ texto: "Telefone Inválido" });
            }
            if (req.body.phone.length < 8) {
                erros.push({ texto: "Telefone Inválido" });
            }
            if (!req.body.loja || typeof req.body.loja == undefined || req.body.loja == null || req.body.loja == "--Nenhum--") {
                erros.push({ texto: "Loja Inválida" });
            }
            if (!req.body.created_at || typeof req.body.created_at == undefined || req.body.created_at == null || req.body.created_at == "") {
                req.body.created_at = create_at.pegarData();
        }
            if (erros.length > 0) {
                console.log(erros)
                chamarCard("erro",erros[0].texto)

            } else {
                clients.insertOne(req.body).then(result => {
                    res.redirect('/?sucesso=1')
                    console.log("Cadastrado com sucesso " + req.body.name)
                })
            }
        })
    })
    .catch(error => {
        res.redirect('/?sucesso=1')
        console.log(error);
    })



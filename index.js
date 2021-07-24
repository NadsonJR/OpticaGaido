const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://admin:admin@adminexams.5vvj4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

console.log('Server running');

const create_at = {
    pegarData() {
        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        var hora = data.getHours();
        var minutos = data.getMinutes();
        dataAtual = ano + '-' + mes + '-' + dia +"T"+ hora + ":" + minutos;
        console.log(dataAtual);
        return dataAtual;
    }
}




MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('examsclients')
        const clients = db.collection('clients')


        app.use(express.static('public'));
        app.use(express.urlencoded({
            extended: true
        }))
        app.use('/', router);
        app.listen(process.env.port || 3000);
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
                console.log("Passou aqui");
                req.body.created_at = create_at.pegarData();
        }
            if (erros.length > 0) {
                console.log(erros)
            } else {
                clients.insertOne(req.body).then(result => {
                    res.redirect('/')
                    console.log("Cadastrado com sucesso " + req.body.name)
                })
            }
        })
    })
    .catch(error => console.error(error))



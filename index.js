const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://admin:admin@adminexams.5vvj4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
})

console.log('Server running');

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('exams-clients')
    const clients = db.collection('client')
    
    
    app.use(express.static('public'));
    app.use(express.urlencoded({
    extended: true
    }))
    app.use('/',router);
    app.listen(process.env.port || 3000);
    //Post method
    app.post('/cadastro', (req,res) =>{
        var erros = [];

        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
            erros.push({texto: "Nome Inválido"});
        }
        if(!req.body.phone || typeof req.body.phone == undefined || req.body.phone == null){
            erros.push({texto: "Telefone Inválido"});
        }
        if(req.body.phone.length < 8){
            erros.push({texto: "Telefone Inválido"});
        }
        if(!req.body.lojas || typeof req.body.lojas == undefined || req.body.lojas == null || req.body.lojas == "--Nenhum--"){
            erros.push({texto: "Loja Inválida"});
        }
        if(erros.length > 0){
            console.log(erros)
        }else{
            clients.insertOne(req.body).then(result =>{
                res.redirect('/')
                console.log("Cadastrado com sucesso")
            })
        }
    })
  })
  .catch(error => console.error(error))

 

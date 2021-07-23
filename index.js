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
    app.post('/cadastro', (req,res) =>{
    clients.insertOne(req.body).then(result =>{
        res.redirect('/')
        console.log(result)
        })
    .catch(error => console.error(error))
    })
    
  })
  .catch(error => console.error(error))



const express = require("express")

const app = express()
const cors = require('cors');
const { routerMail } = require('./Routes/Mail');
app.use(cors());
app.use(routerMail);
const dotenv = require('dotenv').config()
var bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})




app.use(express.json(({ type: '*/*' })));


const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Escuchando en el puerto ${port}... ${host}`);
})



app.post('/api/mailing', urlencodedParser,  )
app.get('/', (req, res) => {
  res.send('Bienvenidos a mi api');
});
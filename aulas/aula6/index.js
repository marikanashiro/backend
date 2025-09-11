// 1. importar framework
const express = require("express");

// importar middleware de terceiros
const cors = require('cors');

const router = require('./router');

// 2. criar uma instância da aplicação
const app = express();

// middleware embutido ou integrado
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // ?param1=valor1&param2=valor2...

// middleware de terceiros
app.use(cors());

// midleware de aplicação
app.use((req, res, next) => {
    console.log('Passei pelo middleware de app');
    next();
});

app.use('/tarefas', router);

// criar o middleware
app.get('/', (req, res) => {
    res.send("Olá!");
})

// middleware de erro
app.use((err, req, res, next) => {
    res.status(500).send(err, mesage);
})

// 3. iniciar a aplicação em uma porta
app.listen(3000, () => {
    console.log("App está on!");
});
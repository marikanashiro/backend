// Importe o pacote do "express":
const express = require('express');

// Crie um array em memória chamado "tarefas":
const tarefas = [  
  { id: 1, nome: "Estudar middleware", concluida: false },  
  { id: 2, nome: "Praticar Express", concluida: true }  
];

// Crie uma instância de uma aplicação Express:
const app = express();

// Utilize o middleware integrado "express.json()":
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Registre no console a data/hora da requisição: 
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Crie abaixo do middleware de aplicação um roteador específico para tarefas usando "express.Router":
const router = express.Router();
app.use('/tarefas', router);

// Implemente a rota "GET /tarefas":
router.get('/', (req, res) => {
    res.send(tarefas);
});

// Implemente a rota "POST /tarefas":
router.post('/', (req, res) => {
    console.log(req.body);
    const novaTarefa = {
        id: tarefas.length + 1,
        ...req.body
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

// Implemente a rota "GET /tarefas/:tarefaId":
router.get('/:tarefaId', (req, res) => {
    const { tarefaId } = req.params; // Desestruturando o objeto params
    const tarefa = tarefas.find(t => t.id === parseInt(tarefaId));
    
    if (!tarefa) {
        
        return next(new Error('Tarefa não localizada'));
    }
    
    res.send(tarefa);
});

// Implemente a rota "PUT /tarefas/:tarefaId":
router.put('/:tarefaId', (req, res) => {
    const { tarefaId } = req.params; // Desestruturando o objeto params
    const tarefa = tarefas.find(t => t.id === parseInt(tarefaId));

    if (!tarefa) {
        return next(new Error('Tarefa não localizada'));
    }

    // Atualiza a tarefa com os dados do corpo da requisição
    tarefa.nome = req.body.nome || tarefa.nome;
    tarefa.concluida = req.body.concluida !== undefined ? req.body.concluida : tarefa.concluida;

    res.json(tarefa);
});

// Implemente a rota "DELETE /tarefas/:tarefaId":
router.delete('/:tarefaId', (req, res) => {
    const { tarefaId } = req.params;
    const tarefaIndex = tarefas.findIndex(t => t.id === parseInt(tarefaId));

    if (tarefaIndex === -1) {
        return next(new Error('Tarefa não localizada'));
    }

    tarefas.splice(tarefaIndex, 1); // Remove a tarefa do array
    res.status(204).end();
});

// Declare middleware de erro para responder um JSON com código "400":
app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message });
});

// Faça a instância da aplicação Express ouvir a porta 3000:
app.listen(3000, () => {
    console.log("App está on!");
});

// Exporte a instância da aplicação Express: 
module.exports = app;
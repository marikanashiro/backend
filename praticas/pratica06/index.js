const readline = require('readline-sync');
const controlador = require('./controlador');

function menu() {
    console.log('1 - Adicionar tarefa');
    console.log('2 - Buscar tarefa');
    console.log('3 - Atualizar tarefa');
    console.log('4 - Remover tarefa');
    console.log('5 - Sair');
}

function escolherOpcao(opcao) {
    switch (opcao) {
        case '1':
            const tarefaNova = readline.question('Digite o nome da nova tarefa: ');
            controlador.adicionarTarefa(tarefaNova);
            break;
        case '2': 
            const tarefaBuscar = readline.question('Digite o nome da tarefa: ');
            controlador.buscarTarefa(tarefaBuscar);
            break;
        case '3': 
            const nomeAtualizar = readline.question('Digite o novo nome da tarefa: ');
            const concluidaAtualizar = readline.question('A tarefa foi concluida? (Sim/Não): ') === 'Sim';
            controlador.atualizarTarefa(nomeAtualizar, concluidaAtualizar);
            break;
        case '4': 
            const tarefaRemover = readline.question('Digite o nome da tarefa a ser excluída: ');
            controlador.removerTarefa(tarefaRemover);
            break;
        case '5': 
            process.exit();
        default: 
            console.log('Opção inválida.');                    
    }
}

function main() {
    let opcao;
    do {
        menu();
        opcao = readline.question('Escolha uma opção: ');
        escolherOpcao(opcao);
    } while (true);
}

main();
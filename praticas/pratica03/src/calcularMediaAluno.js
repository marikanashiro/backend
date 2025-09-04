function calcularMediaAluno(a1, a2, a3) {
    return 0;
}

function numeroUndefined(a1, a2) {
    if (a1 === undefined || a2 === undefined) {
        throw new Error('Notas a1 ou a2 não informadas');
    }
}

function numeroNegativo(a1, a2) {
    if (a1 < 0 || a2 < 0) {
        throw new Error('Notas a1 ou a2 não podem ser negativas');
    }
}

function a3NotInformed(a1, a2, a3) {
    if (a3 === undefined) {
        return (a1 * 0.4) + (a2 * 0.6);
    }
}

function a3Negative(a1, a2, a3) {
    if (a3 < 0) {
        throw new Error('Nota a3 não pode ser negativa');
    }
}

function a1BestMatchesA3(a1, a2, a3) {
    combinacao1 = (a1 * 0.4) + (a2 * 0.6);
    combinacao2 = (a1 * 0.4) + (a3 * 0.6);
    return Math.max(combinacao1, combinacao2);
    /*if (combinacao2 > combinacao1) {
        return combinacao2;
    }*/
}

function a2BestMatchesA3(a1, a2, a3) {
    combinacao1 = (a1 * 0.4) + (a2 * 0.6);
    combinacao2 = (a3 * 0.4) + (a2 * 0.6);
    return Math.max(combinacao1, combinacao2);
    /*if (combinacao2 > combinacao1) {
        return combinacao2;
    }*/
}
module.exports = { calcularMediaAluno, numeroUndefined, numeroNegativo, a3NotInformed, a3Negative, a1BestMatchesA3, a2BestMatchesA3 };
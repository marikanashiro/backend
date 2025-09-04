const { calcularMediaAluno, numeroUndefined, numeroNegativo, a3NotInformed, a3Negative, a1BestMatchesA3, a2BestMatchesA3 } 
    = require('../src/calcularMediaAluno');

describe("Teste de média", () => {
    test("A função existe", () => {
            expect(calcularMediaAluno()).toBeDefined();
    });

    test("a1 === undefined || a2 === undefined, deve lançar exceção", () => {
        expect(() => numeroUndefined(undefined, 2)).toThrow("Notas a1 ou a2 não informadas");
        expect(() => numeroUndefined(10, undefined)).toThrow("Notas a1 ou a2 não informadas");
    });

    test("a1 ou a2 negtivo, deve lançar exceção", () => {
        expect(() => numeroNegativo(-5, 2)).toThrow("Notas a1 ou a2 não podem ser negativas");
        expect(() => numeroNegativo(10, -8)).toThrow("Notas a1 ou a2 não podem ser negativas");
    });

    test("a3 não informado, deve utilizar a1 * 0.4 + a2 * 0.6", () => {
        expect(a3NotInformed(10, 5, undefined)).toBeCloseTo(7);
        expect(a3NotInformed(2, 6, undefined)).toBeCloseTo(4.4);
    });

    test("a3 negativo, deve deve lançar exceção", () => {
        expect(() => a3Negative(10, 8, -2)).toThrow("Nota a3 não pode ser negativa");
        expect(() => a3Negative(5, 4, -10)).toThrow("Nota a3 não pode ser negativa");
    });

    test("a3 informada, e melhor combinação é a1 com a3", () => {
        expect(a1BestMatchesA3(10, 5, 8)).toBeCloseTo(8.8);
        expect(a1BestMatchesA3(5, 1, 3)).toBeCloseTo(3.8);
    });

    test("a3 informada, e melhor combinação é a2 com a3", () => {
        expect(a2BestMatchesA3(5, 10, 8)).toBeCloseTo(9.2);
        expect(a2BestMatchesA3(3, 8, 5)).toBeCloseTo(6.8);
    });
});
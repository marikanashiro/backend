const calculadora = require('../src/index.js')

describe("Teste de calculadora", () => {

    test("2 + 2 = 4", () => {
        expect(calculadora.soma).toBeDefined();
        expect(calculadora.soma(2, 2)).toBe(4);
    });

    test("2 + 0 = 2", () => {
        expect(calculadora.soma(2, 0)).toBe(2);
    });

    test("-2 + -2 = -4", () => {
        expect(calculadora.soma(-2, -2)).toBe(-4);
    });

    test("2 -2 = 0", () => {
        expect(calculadora.subtracao).toBeDefined();
        expect(calculadora.subtracao(2, 2)).toBe(0);
    });

    test("-4 - 2 = -6", () => {
        expect(calculadora.subtracao).toBeDefined();
        expect(calculadora.subtracao(-4, 2)).toBe(-6);
    });

    test("Se a >= b então a - b >= 0", () => {
        expect(calculadora.subtracao(2, 1)).toBeGreaterThanOrEqual(0);
        expect(calculadora.subtracao(2 ,2)).toBeGreaterThanOrEqual(0);
        expect(calculadora.subtracao(2, -2)).toBeGreaterThanOrEqual(0);
        expect(calculadora.subtracao(-2, -4)).toBeGreaterThanOrEqual(0);
    });

    test("Se a < b então a - b < 0", () => {
        expect(calculadora.subtracao(1, 2)).toBeLessThan(0);
        expect(calculadora.subtracao(-2, -1)).toBeLessThan(0);
        expect(calculadora.subtracao(-2, 1)).toBeLessThan(0);
    });

    test("Se a e b < 0 u a e b > 0 então a * b > 0", () => {
        expect(calculadora.multiplicacao).toBeDefined();
        expect(calculadora.multiplicacao(2, 2)).toBeGreaterThan(0);
        expect(calculadora.multiplicacao(-2, -2)).toBeGreaterThan(0);
    });

    test("Se a < 0 ou b < 0 entã a * b < 0", () => {
        expect(calculadora.multiplicacao(-2, 2)).toBeLessThan(0);
        expect(calculadora.multiplicacao(2, -2)).toBeLessThan(0);
    });

    test("Se a = 0 ou b = 0 então a * b = 0", () => {
        expect(calculadora.multiplicacao(2, 0)).toBe(0);
        expect(calculadora.multiplicacao(-2, 0)).toBe(-0);
    });

    test("Se b = 0 então divisão por ZERO", () => {
        expect(calculadora.divisao).toBeDefined();
        expect(() => calculadora.divisao(2, 0)).toThrow("Divisão por ZERO");
    });
});
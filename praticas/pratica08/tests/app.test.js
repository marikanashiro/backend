const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
let token = '';
let novoToken = '';

describe('Testes da API REST', () => {
    it('deve retornar 401 sem token', async () => {
        const response = await request.get('/produtos');
        expect(response.status).toBe(401);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('msg', 'Não autorizado');
    });

    it('deve retornar 401 com token inválido', async () => {
        const response = await request.get('/produtos').set('Authorization', 'Bearer 123456789');
        expect(response.status).toBe(401);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('msg', 'Token inválido');
    });

    it('deve fazer login e retornar token', async () => {
        const response = await request.post('/usuarios/login').send({ "usuario": "email@exemplo.com", "senha": "abcd1234" });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    it('deve acessar /produtos com token válido', async () => {
        const response = await request.get('/produtos').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });

    it('deve renovar token', async () => {
        const response = await request.post('/usuarios/renovar').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        novoToken = response.body.token;
    });

    it('deve acessar /produtos com novo token', async () => {
        const response = await request.get('/produtos').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });
});
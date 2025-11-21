const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

let usuarioId = '';
let token = '';

describe("Testes para o recurso /usuarios", () => {

    test("POST /usuarios deve criar um novo usuário com status 201", async () => {
        const response = await request.post('/usuarios').send({
            email: 'usuario@email.com',
            senha: 'abcd1234'
        }).expect('Content-Type', /json/).expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.email).toBe('usuario@email.com');

        usuarioId = response.body._id;
    });

    test("POST /usuarios sem parâmetros deve retornar status 422", async () => {
        const response = await request.post('/usuarios').send({

        }).expect('Content-Type', /json/).expect(422);

        expect(response.body.msg).toBe('Email e Senha são obrigatórios');
    });

    test("POST /usuarios/login deve retornar status 200", async () => {
        const response = await request.post('/usuarios/login').send({
            usuario: 'usuario@email.com',
            senha: 'abcd1234'
        }).expect('Content-Type', /json/).expect(200);

        expect(response.body).toHaveProperty('token');

        token = response.body.token;
    });

    test("POST /usuarios/login sem parâmetros deve retornar status 401", async () => {
        const response = await request.post('/usuarios/login').send({

        }).expect('Content-Type', /json/).expect(401);

        expect(response.body.msg).toBe('Credenciais inválidas');
    });

    test("POST /usuarios/renovar deve retornar status 200", async () => {
        const response = await request.post('/usuarios/renovar').set(
            'Authorization', token
        ).expect('Content-Type', /json/).expect(200);

        expect(response.body).toHaveProperty('token');
    });

    test("POST /usuarios/renovar passando parâmetro errado deve retonar status 401", async () => {
        const response = await request.post('/usuarios/renovar').set(
            'Authorization', 'Bearer 123456789'
        ).expect('Content-Type', /json/).expect(401);

        expect(response.body.msg).toBe('Token inválido');
    });

    test("DELETE /usuarios/${id} deve retornar status 204", async () => {
        await request.delete(`/usuarios/${usuarioId}`).set(
            'Authorization', token
        ).expect(204);
    });
});
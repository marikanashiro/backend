const request = require('supertest');
const app = require('../app');

const api = request(app);

let productId;

describe('Testes da API /produtos', () => {
    it('Deve criar um produto com status 201', async () => {
        const response = await api
            .post('/produtos')
            .send({ nome: 'Laranja', preco: 10.0 })
            .expect(201)
            .expect('Content-Type', /json/);
            

        expect(response.body).toHaveProperty('_id');
        expect(response.body.nome).toBe('Laranja');
        expect(response.body.preco).toBe(10.0);

        productId = response.body._id;
    });

    it('Deve retornar erro 422 ao criar produto sem dados', async () => {
        const response = await api
            .post('/produtos')
            .send({})
            .expect(422)
            .expect('Content-Type', /json/);

        expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
    });

    it('Deve listar produtos com status 200', async () => {
        const response = await api
            .get('/produtos')
            .expect(200)
            .expect('Content-Type', /json/);

        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Deve retornar um produto específico com status 200', async () => {
        const response = await api
            .get(`/produtos/${productId}`)
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('_id', productId);
        expect(response.body.nome).toBe('Laranja');
        expect(response.body.preco).toBe(10.0);
    });

    it('Deve retornar erro 400 para parâmetro inválido', async () => {
        const response = await api
            .get('/produtos/0')
            .expect(400)
            .expect('Content-Type', /json/);

        expect(response.body.msg).toBe('Parâmetro inválido');
    });

    it('Deve retornar erro 404 para produto não encontrado', async () => {
        const response = await api
            .get('/produtos/000000000000000000000000')
            .expect(404)
            .expect('Content-Type', /json/);

        expect(response.body.msg).toBe('Produto não encontrado');
    });

    it('Deve atualizar um produto com status 200', async () => {
        const response = await api
            .put(`/produtos/${productId}`)
            .send({ nome: 'Laranja Pera', preco: 18.0 })
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body.nome).toBe('Laranja Pera');
        expect(response.body.preco).toBe(18.0);
    });

    it('Deve retornar erro 422 ao atualizar sem dados', async () => {
        const response = await api
            .put(`/produtos/${productId}`)
            .send({})
            .expect(422)
            .expect('Content-Type', /json/);

        expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
    });

    it('Deve retornar erro 400 para parâmetro inválido no PUT', async () => {
        const response = await api
            .put('/produtos/0')
            .send({ nome: 'Laranja Pera', preco: 18.0 })
            .expect(400)
            .expect('Content-Type', /json/);

        expect(response.body.msg).toBe('Parâmetro inválido');
    });

    it('Deve retornar erro 404 para produto não encontrado no PUT', async () => {
        const response = await api
            .put('/produtos/000000000000000000000000')
            .send({ nome: 'Laranja Pera', preco: 18.0 })
            .expect(404)
            .expect('Content-Type', /json/);

        expect(response.body.msg).toBe('Produto não encontrado');
    });

    it('Deve deletar um produto com status 204', async () => {
        await api
            .delete(`/produtos/${productId}`)
            .expect(204);
    });

    it('Deve retornar erro 400 para parâmetro inválido no DELETE', async () => {
        const response = await api
            .delete('/produtos/0')
            .expect(400)
            .expect('Content-Type', /json/);

        expect(response.body.msg).toBe('Parâmetro inválido');
    });

    it('Deve retornar erro 404 para produto não encontrado no DELETE', async () => {
        const response = await api
            .delete('/produtos/000000000000000000000000')
            .expect(404)
            .expect('Content-Type', /json/);

        expect(response.body.msg).toBe('Produto não encontrado');
    });
});
const request = require('supertest');
let server;

describe('/api/v1/movies', () => {
    beforeEach(() => {
        server = require('../../src/index');
    });
    afterEach(() => {
        server.close();
    });
    describe('GET /', () => {
        it('should return all movies', async () => {
            const result = await request(server).get('/api/v1/movies');
            expect(result.statusCode).toBe(200);
        });
    });
});

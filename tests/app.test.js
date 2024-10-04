// tests/app.test.js
const request = require('supertest');
const app = require('../app');

describe('GET /api', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/api');
        expect(response.status).toBe(200);
    });
});

const request = require('supertest');
const app = require('../app');

describe("GET /", () => {
    test("should return 200 and backend message", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.text).toBe("Backend is running");
    })
})
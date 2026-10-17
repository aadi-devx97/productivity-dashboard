const request = require("supertest");
const app = require("../app");

describe("GET /api/auth/me", () => {
    test("should return 401 when no token is provided", async () => {
        const response = await request(app).get("/api/auth/me");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("No token provided");
    });
});

test("should return 401 when an invalid token is provided", async () => {
    const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid token");
});
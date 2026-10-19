require("dotenv").config();

const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

jest.spyOn(User, "findById").mockResolvedValue({
    _id: "test-user-id",
    name: "Test User",
    email: "test@example.com",
});

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

test("should return the current user when a valid token is provided", async () => {
    const token = jwt.sign(
        { userId: "test-user-id" },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test User");
    expect(response.body.email).toBe("test@example.com");
});
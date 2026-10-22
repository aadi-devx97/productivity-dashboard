require("dotenv").config();
const bcrypt = require("bcrypt");

const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

jest.spyOn(User, "findById");

beforeEach(() => {
    User.findById.mockResolvedValue({
        _id: "test-user-id",
        name: "Test User",
        email: "test@example.com",
    });
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

test("should return 404 when the user does not exist", async () => {
    User.findById.mockResolvedValueOnce(null);

    const token = jwt.sign(
        { userId: "deleted-user-id" },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
});

test("should return 401 when logging in with an unknown email", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(null);

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "unknown@example.com",
            password: "SomePassword123",
        });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
});

test("should return 401 when the password is incorrect", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce({
        _id: "test-user-id",
        email: "test@example.com",
        password: "hashed-password",
    });
    
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "test@example.com",
            password: "WrongPassword123",
        });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
});

test("should return a JWT when login succeeds", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce({
        _id: "test-user-id",
        email: "test@example.com",
        password: "hashed-password",
    });

    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);

    const response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "test@example.com",
            password: "CorrectPassword123",
        });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();

    const decoded = jwt.verify(
        response.body.token,
        process.env.JWT_SECRET
    );

    expect(decoded.userId).toBe("test-user-id");;
});
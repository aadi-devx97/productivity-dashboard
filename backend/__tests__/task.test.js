require("dotenv").config();

const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

jest.spyOn(Task, "find").mockResolvedValue([
    {
        _id: "task-1",
        title: "Learn automated testing",
        completed: false,
        user: "test-user-id",
    },
]);

test("should return 401 when fetching tasks without a token", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("No token provided");
});

test("should return the user's tasks when a valid token is provided", async () => {
    const token = jwt.sign(
        { userId: "test-user-id" },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe("Learn automated testing");
    expect(Task.find).toHaveBeenCalledWith({
        user: "test-user-id",
    });
});

test("should return 500 when fetching tasks fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(Task, "find").mockRejectedValueOnce(
        new Error("Database failure")
    );

    const token = jwt.sign(
        { userId: "test-user-id" },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Failed to fetch tasks");
});

test("should return 500 when fetching tasks fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(Task, "find").mockRejectedValueOnce(
        new Error("Database failure")
    );

    const token = jwt.sign(
        { userId: "test-user-id" },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Failed to fetch tasks");
});

test("should create a task for the authenticated user", async () => {
    jest.spyOn(Task, "create").mockResolvedValueOnce({
        _id: "new-task-id",
        title: "Build automated tests",
        completed: false,
        user: "test-user-id",
    });

    const token = jwt.sign(
        { userId: "test-user-id" },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Build automated tests",
        });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Build automated tests");
    expect(Task.create).toHaveBeenCalledWith({
        title: "Build automated tests",
        user: "test-user-id",
    });
});

test("should return 500 when task creation fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(Task, "create").mockRejectedValueOnce(
        new Error("Database failure")
    );

    const token = jwt.sign(
        { userId: "test-user-id" },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Build automated tests",
        });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Failed to create task");
});

test("should update a task successfully", async () => {
    const updatedTask = {
        _id: "task-123",
        title: "Updated task",
        completed: true,
        user: "test-user-id",
    };

    jest.spyOn(Task, "findOneAndUpdate").mockResolvedValueOnce(updatedTask);

    const token = jwt.sign(
        { userId: "test-user-id" },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .put("/tasks/task-123")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Updated task",
            completed: true,
        });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated task");
    expect(response.body.completed).toBe(true);

    expect(Task.findOneAndUpdate).toHaveBeenCalledWith(
        {
            _id: "task-123",
            user: "test-user-id",
        },
        {
            title: "Updated task",
            completed: true,
        },
        { new: true }
    );
});

test("should return 404 when task to update is not found", async () => {
    jest.spyOn(Task, "findOneAndUpdate").mockResolvedValueOnce(null);

    const token = jwt.sign(
        { userId: "test-user-id" },
        process.env.JWT_SECRET
    );

    const response = await request(app)
        .put("/tasks/nonexistent-task")
        .set("Authorization", `Bearer ${token}`)
        .send({
            title: "Updated task",
        });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Task not found");
});
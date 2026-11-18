const { z } = require("zod")
const express = require("express");
const pool = require("./db");
const app = express();
app.use(express.json());
app.use ((request, response, next) => {
console.log(request.method, request.url);
next();
});
const taskSchema = z.object({
title: z.string().trim().min(1, "Title is required")
});
const updateTaskSchema = z.object({
title: z.string().trim().min(1, "Title is required"),
completed: z.boolean()
});

app.get("/", (request, response) => {
response.send("My Tasks Api is working!");
});

app.get("/tasks/:id", async (request, response, next) => {
    try {
        const id = Number(request.params.id);

        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return response.status(404).json({
                error: "Task not found"
            });
        }

        response.status(200).json(result.rows[0]);

    } catch (error) {
        next(error);
    }
});

app.get("/tasks", async (request, response, next) => {
    try {
        const result = await pool.query(
            `SELECT
                tasks.id,
                tasks.title,
                tasks.completed,
                users.id AS user_id,
                users.name AS user_name,
                users.email AS user_email
            FROM tasks
            INNER JOIN users
                ON tasks.user_id = users.id
            ORDER BY tasks.id ASC`
        );

        response.status(200).json(result.rows);
    } catch (error) {
        next(error);
    }
});


app.put("/tasks/:id", async (request, response, next) => {
    try {
        const id = Number(request.params.id);

        const validatedData = updateTaskSchema.parse(request.body);

        const result = await pool.query(
            `UPDATE tasks
             SET title = $1, completed = $2
             WHERE id = $3
             RETURNING *`,
            [validatedData.title, validatedData.completed, id]
        );

        if (result.rows.length === 0) {
            return response.status(404).json({
                error: "Task not found"
            });
        }

        response.status(200).json(result.rows[0]);

    } catch (error) {
        next(error);
    }
});


app.delete("/tasks/:id", async (request, response, next) => {
    try {
        const id = Number(request.params.id);

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return response.status(404).json({
                error: "Task not found"
            });
        }

        response.status(204).send();

    } catch (error) {
        next(error);
    }
});


app.post("/tasks", async (request, response, next) => {
    try {
        const validatedData = taskSchema.parse(request.body);

        const result = await pool.query(
            `INSERT INTO tasks (title, user_id)
             VALUES (
                $1,
                (SELECT id FROM users WHERE email = $2)
             )
             RETURNING *`,
            [validatedData.title, "developer@example.com"]
        );

        response.status(201).json(result.rows[0]);

    } catch (error) {
        next(error);
    }
});

app.use((error, request, response, next) => {
    console.error(error);
    if (error.type === "entity.parse.failed") {
        return response.status(400).json({
            error: "Invalid JSON"
        });
    }


    response.status(500).json({
        error: "Internal server error"
    });
});




app.listen(3000, () => {
    console.log("Server is running on port 3000");
});



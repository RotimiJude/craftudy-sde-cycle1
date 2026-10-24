const { z } = require("zod")
const express = require("express");
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
const tasks = [
{id:1, title: "Learn Express", completed: false},
{id:2, title: "Build Tasks API", completed: false},
{id:3, title: "Peer Review", completed: false}
];

app.get("/", (request, response) => {
response.send("My Tasks Api is working!");
});

app.get("/tasks/:id", (request, response) => {
const id = Number(request.params.id);
const task =tasks.find((task) => task.id === id);
if (!task){
return response.status(404).json({
error: "Task not found"
});
}
response.status(200).json(task);
});

app.get("/tasks", (request, response) => {
response.status(200).json(tasks);
});


app.put("/tasks/:id", (request, response) => {
    const id = Number(request.params.id);

    const result = updateTaskSchema.safeParse(request.body);

    if (!result.success) {
        return response.status(400).json({
            error: result.error.issues[0].message
        });
    }

    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return response.status(404).json({
            error: "Task not found"
        });
    }

    task.title = result.data.title;
    task.completed = result.data.completed;

    response.status(200).json(task);
});

app.delete("/tasks/:id", (request, response) => {
    const id = Number(request.params.id);

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return response.status(404).json({
            error: "Task not found"
        });
    }

    tasks.splice(taskIndex, 1);

    response.status(204).send();
});


app.post("/tasks", (request, response) => {
const result = taskSchema.safeParse(request.body);

if (!result.success) {
return response.status(400).json({
error:result.error.issues[0].message
});
}
const newTask={
id: tasks.length === 0
    ? 1
    : Math.max(...tasks.map(task => task.id)) + 1,
title: result.data.title,
completed: false
};
tasks.push(newTask);
response.status(201).json(newTask);
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



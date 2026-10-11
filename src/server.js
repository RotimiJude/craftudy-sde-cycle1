
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;


app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();
});


const tasks = [];


app.get("/tasks", (request, response) => {
    response.status(200).json(tasks);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


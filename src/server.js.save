const http = require("http");
const fs = require("fs").promises;
const PORT = process.env.PORT || 3000;

const server = http.createServer(async (request, response) => {
    if (request.method === "GET" && request.url === "/tasks") {
        const tasks = await fs.readFile("tasks.json", "utf8");
response.statusCode = 200;
response.setHeader("Content-Type", "application/json");
        response.end(tasks);
    }
else if (request.method === "POST" && request.url === "/tasks") {
    let body = "";

    request.on("data", (chunk) => {
        body += chunk;
    });

    request.on("end",async() => {
        const newTask = JSON.parse(body);
const file = await fs.readFile("tasks.json", "utf8");
    const tasks = JSON.parse(file);
tasks.push(newTask);
await fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2));
console.log(newTask);
response.statusCode = 201;
response.setHeader("Content-Type", "text/plain");
        response.end("Task received!");
    });}
 else {
        response.statusCode = 404;
        response.end("Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `);
});

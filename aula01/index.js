import express from "express";
import bodyParser from "body-parser";

const app = express();
const _dirname = import.meta.dirname;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(_dirname + "/public/index.html");
});

app.post("/", (req, res) => {
    const dados = req.body;
    console.log(dados);
    res.send(dados);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});

// import http from "http";

// function handleRequest(req, res) {
//   if (req.method === "GET" && req.url === "/aula01") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(`<h1>${req.method}</h1>`);
//     res.end();
//   }
// }

// const server = http.createServer(handleRequest);
// server.listen(3000);
// console.log("Server running at http://localhost:3000/");

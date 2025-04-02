import express from "express";
import bibliotecaRouter from "./src/router/bibliotecaRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/bib", bibliotecaRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Algo deu errado!" });
});

// Rota padrão
app.get("/", (req, res) => {
    res.send("API da Biblioteca - Bem vindo!");
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

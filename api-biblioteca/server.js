import express from "express";
import bibliotecaRouter from "./src/router/bibliotecaRouter";

const app = express();

app.use(express.json());
app.use("/bib", bibliotecaRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

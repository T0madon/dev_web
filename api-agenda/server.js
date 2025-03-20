import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DBAS,
});

const app = express();
app.use(express.json());

//Retorna todos os contatos
app.get("/", async (req, res) => {
    try {
        const sql = "SELECT * FROM contatos";
        const contatos = await db.query(sql);
        res.status(200).send(contatos.rows);
    } catch (e) {
        console.log(e);
        res.status(500).send({ erro: "Um erro ocorreu" });
    }
});

//Retorna um contato baseado no id
app.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const sql = "SELECT * FROM contatos WHERE id = " + id;
        const contatos = await db.query(sql);
        res.status(200).send(contatos.rows);
    } catch (e) {
        console.log(e);
        res.status(500).send({ erro: "Um erro ocorreu" });
    }
});

app.listen(process.env.APP_PORT, () => {
    console.log("Server running at http://localhost:3000/");
});

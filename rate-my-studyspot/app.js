import models from "./models.js";
import express from "express";
import path from "path";

import msIdExpress from "microsoft-identity-express";
import sessions from "express-session";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use((req, res, next) => {
    req.models = models;
    next();
});

console.log(models);

app.use(express.static(path.join(__dirname, "build")));

/*
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});*/

app.get('/', (req, res) => {
    res.send('api home')
})

app.listen(process.env.PORT || 8080);
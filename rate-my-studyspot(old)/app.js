import models from "./models.js";
import express from "express";
import cors from 'cors'
import path from "path";

import msIdExpress from "microsoft-identity-express";
import sessions from "express-session";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import locationRouter from './javascripts/routes/controllers/location.js'
import createRouter from './javascripts/routes/controllers/create.js'
import studySpotsRouter from "./javascripts/routes/controllers/studyspots.js"
import { create } from "domain";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    req.models = models;
    next();
});

//console.log(models);

app.use(express.static(path.join(__dirname, "build")));

/*
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
}); */

app.use('/location', locationRouter)
app.use('/create', createRouter)
app.use("/studyspots", studySpotsRouter)

app.listen(process.env.PORT || 8080);
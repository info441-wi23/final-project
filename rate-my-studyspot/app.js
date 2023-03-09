
import express from "express";
import cors from 'cors'
import path from "path";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import msIdExpress from "microsoft-identity-express";
import sessions from "express-session";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { create } from "domain";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static('public'));


/*app.use((req, res, next) => {
    req.models = models;
    next();
}); */

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000);

export default app;
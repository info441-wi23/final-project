import models from "./models.js";
import express from "express";
import cors from 'cors'
import path from "path";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import msIdExpress from "microsoft-identity-express";
import sessions from "express-session";
import studySpotsRouter from "./routes/api/v1/controllers/studyspots.js"
import reviewsRouter from './routes/api/v1/controllers/reviews.js'
import userRouter from "../javascripts/routes/controllers/users.js"

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
const appSettings = {
    appCredentials: {
        clientId: "f2f9caa8-2681-48b8-9675-3110aaaf9e34",
        tenantId: "f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret: "ytD8Q~QHH0bCc9c6WzhGcdW84MnvKqKf5AMrFc3x"
    },
    authRoutes: {
        redirect: "http://localhost:3000/redirect",
        error: "/error",
        unauthorized: "/unauthorized"
    }
};
const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "37686540-bf0a-4c1c-9b40-3bdf3f0d7eaf",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build()
app.use(msid.initialize())

/*
app.get("/", (req, res) => {
    console.log(req.session.account.name);
    console.log("app.get(/) called")
    res.redirect("http://localhost:3000")
    res.sendFile(path.join(__dirname, "build", "index.html"));
    res.send("hello");
});
*/

app.get('/signin',
    msid.signIn({ postLoginRedirect: '/' })
)

app.get('/signout',
    msid.signOut({ postLogoutRedirect: '/' })
)

app.get('/error', (req, res) => {
    res.status(500).send("Error: Server error")
})

app.get('/unauthorized', (req, res) => {
    res.status(401).send("Error: Unauthorized")
})

app.use((req, res, next) => {
    req.models = models;
    next();
});

app.get("/", (req, res) => {
    console.log("get called");
    console.log(models);
    res.sendFile(__dirname + "/index.html");
})
app.use("/studyspots", studySpotsRouter)
app.use('/reviews', reviewsRouter)
app.use("/user", userRouter)


app.listen(3000);

export default app;
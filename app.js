import models from "./models.js";
import express from "express";
import cors from 'cors'
import path from "path";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import msIdExpress from "microsoft-identity-express";
import sessions from "express-session";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import studySpotsRouter from "./javascripts/routes/controllers/studyspots.js"
import reviewsRouter from './javascripts/routes/controllers/review.js'
import { create } from "domain";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
// idk why but commenting this out lets me do stuff with router.get("/") and res.send


const appSettings = {
    appCredentials: {
        clientId: "f2f9caa8-2681-48b8-9675-3110aaaf9e34",
        tenantId: "f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret: "ytD8Q~QHH0bCc9c6WzhGcdW84MnvKqKf5AMrFc3x"
    },
    authRoutes: {
        redirect: "http://localhost:8080/redirect",
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
app.get('/', (req, res) => {
    //console.log("hello");
    //console.log(__dirname);
    //console.log(process.cwd());
    //res.sendFile(process.cwd() + "/src/App.js");
    //res.sendFile("index.html")
    res.sendFile(process.cwd() + "/public/index.html");
})
*/


app.get("/", (req, res) => {
    console.log("app.get(/) called")
    res.sendFile(path.join(__dirname, "build", "index.html"));
    //res.send("hello");
});


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

//console.log(models);

/*
app.get('/', (req, res) => {
    res.send('api home')
})
*/

app.use("/studyspots", studySpotsRouter)
app.use('/reviews', reviewsRouter)

app.listen(process.env.PORT || 8080);
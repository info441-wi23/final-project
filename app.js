import models from "./models.js";
import express from "express";
import cors from 'cors'
import path from "path";

import msIdExpress from "microsoft-identity-express";
import sessions from "express-session";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// routers
import locationRouter from './javascripts/routes/controllers/location.js'
import createRouter from './javascripts/routes/controllers/create.js'
import studySpotsRouter from "./javascripts/routes/controllers/studyspots.js"
import userRouter from "./javascripts/routes/controllers/users.js"
import { create } from "domain";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Application (client) ID: f2f9caa8-2681-48b8-9675-3110aaaf9e34
// Object ID: 4b11e17f-d2ca-44cb-8b68-6cbf6b999a40
// Directory (tenant) ID: f6b6dd5b-f02f-441a-99a0-162ac5060bd2
// secret value: ytD8Q~QHH0bCc9c6WzhGcdW84MnvKqKf5AMrFc3x
// secret id: 37686540-bf0a-4c1c-9b40-3bdf3f0d7eaf
const appSettings = {
    appCredentials: {
        clientId:  "f2f9caa8-2681-48b8-9675-3110aaaf9e34",
        tenantId:  "f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret:  "ytD8Q~QHH0bCc9c6WzhGcdW84MnvKqKf5AMrFc3x"
    },	
    authRoutes: {
        redirect: "https://travonswebsitesharer441.azurewebsites.net/redirect",
        error: "/error",
        unauthorized: "/unauthorized"
    }
};

var app = express();

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "37686540-bf0a-4c1c-9b40-3bdf3f0d7eaf",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build();
app.use(msid.initialize());

app.use((req, res, next) => {
    req.models = models;
    next();
});

app.get("/signin", 
    msid.signIn({postLoginRedirect: "/"})
);

app.get("/signout",
    msid.signOut({postLogoutRedirect: "/"})
);

app.get("/error", (req, res) => {
    res.status(500).send("Error: Server error")
});

app.get("/unauthorized", (req, res) => {
    res.status(401).send("Permission Denied")
});


var app = express();
app.use(express.json())
app.use(cors())

//console.log(models);

app.use(express.static(path.join(__dirname, "build")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
}); 

app.use('/location', locationRouter)
app.use('/create', createRouter)
app.use("/studyspots", studySpotsRouter)
app.use('/users', userRouter);

app.listen(process.env.PORT || 8080);
// create new user

// get user info

// update user info

// post and get bookmarks

import express from 'express';
import session from "express-session";
var router = express.Router();

router.get("/myIdentity", async (req, res) => {
    if (req.session.isAuthenticated) {
        res.json({
            status: "loggedin",
            userInfo: {
                name: req.session.account.name,
                username: req.session.account.username
            }
        });
    } else {
        res.json({ status: "loggedout" });
    }
});

// router.post("/userInfo", async (req, res) => {

// });

// router.get("/userInfo", async (req, res) => {
//     // try {
//     //     if (req.session.isAuthenticated) {
//     //         let user = await req.models.User.find({username: req.session.account.username});

//     //     } else {
//     //         res.json({ status: "loggedout" });
//     //     }
//     // } catch (error) {
//     //     res.status(500).send({
//     //         status: 'error',
//     //         error: error
//     //     })
//     // }
// });

export default router;

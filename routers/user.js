const express = require("express");
const router = express.Router();
const { listAllUsers, addNewUser } = require("../controller/user");
// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log("Time: ", Date.now());
//     next();
// });

//
// define the home page route
router.get("/list/all", listAllUsers);
router.post("/new", addNewUser);
//

module.exports = router;

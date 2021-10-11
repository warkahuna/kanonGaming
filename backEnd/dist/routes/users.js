"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var client_1 = __importDefault(require("../database/client"));
var express_validator_1 = require("express-validator");
//sends a request to the remote database
//to get the user where the username is the same as the one provided in the body
router.post("/getUser", 
//username can't be empty
(0, express_validator_1.body)("username").isLength({ min: 1 }), function (req, res) {
    var username = req.body.username;
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //send a query to the remote database to get the specific user where the username is the same as provided
    client_1.default.query("select * from userdata where username = $1", [username], //the username that will passed instead of the $1 which represents the first element of the table
    function (err, result) {
        if (err)
            throw err;
        if (result.rows.length < 1) {
            //in case the query retuned an empty table that means the user dosn't exist so we create it
            creatUser(username, res);
        }
        else {
            //since the query retuned a table which containes data then the user exsits so we send the data
            res.status(200).send(result.rows[0]);
        }
    });
});
//allows for the creation of a new user
var creatUser = function (username, res) {
    //send a query to insert a new row into the table userData in the remote database
    client_1.default.query("insert into userdata (username,points) values ($1,20)", //20 represents the number of point the user will get when created
    [username], //the username that will passed instead of the $1 which represents the first element of the table
    function (err, result) {
        if (err)
            throw err;
        res.status(200).send(result.rows[0]); //the query will retun the information of the user after adding them so we send them
        client_1.default.end();
    });
};
//allows for the visualisation of all user
router.get("/getAllUsers", function (req, res) {
    //send a query to get all rows of the table userData in the remote database
    client_1.default.query("select * from userdata", function (err, result) {
        if (err)
            throw err;
        res.status(200).send(result.rows); //the query will retuns a table with all users so we send them
        client_1.default.end();
    });
});
//allows the update of a users points aka coins using the ammount provided
router.post("/updateUserCoins", function (req, res) {
    var username = req.body.username; // the user to be updated
    var coins = req.body.newCoins; //the new amount of coins to be set
    //send a query to update the points of a user in the table userData in the remote database
    client_1.default.query("update userdata set points = $1 where username = $2", 
    //the coins will passed instead of the $1 which represents the first element of the table
    //the username will passed instead of the $2 which represents the second element of the table
    [coins, username], function (err, result) {
        if (err)
            throw err;
        //once the query is executed without problems we send a result
        res.status(200).send({ result: "updated" });
    });
});
module.exports = router;

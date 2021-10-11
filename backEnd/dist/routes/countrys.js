"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var axios_1 = __importDefault(require("axios"));
var keys_1 = __importDefault(require("../config/keys"));
var express_validator_1 = require("express-validator");
//getting the specified country from the api endpoint api.countrylayer.com
//using the country name provided in the body
router.post("/getCounry", 
//provided country name shouldn't be empty
(0, express_validator_1.body)("country").isLength({ min: 1 }), 
//allow the api to know weather to search by correct full name by providing true or false
(0, express_validator_1.body)("fullText").isBoolean(), function (req, res) {
    var errors = (0, express_validator_1.validationResult)(req);
    var wantedCountry = req.body.country;
    var fullText = req.body.fullText;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //send request to the api endpoint using the country name and fulltext atrributes using the library axios
    axios_1.default
        .get("http://api.countrylayer.com/v2/name/" +
        wantedCountry +
        "?access_key=" +
        keys_1.default.apiKey +
        "&FullText=" +
        fullText)
        .then(function (response) {
        //the response represent all the data fetched with the api by using .data we get only the information needed
        //in this case the information of the searched country which we send
        res.status(200).send(response.data);
    })
        .catch(function (error) {
        res.status(200).send({ error: error });
    });
});
//send request to the api endpoint to get all the available countrys using the axios library
router.get("/getAllCountrys", function (req, res) {
    axios_1.default
        .get("http://api.countrylayer.com/v2/all?access_key=" + keys_1.default.apiKey)
        .then(function (response) {
        //the response represent all the data fetched with the api by using .data we get only the information needed
        //in this case the information of all countrys which we send
        res.status(200).send(response.data);
    })
        .catch(function (error) {
        res.status(404).send({ error: error });
    });
});
module.exports = router;

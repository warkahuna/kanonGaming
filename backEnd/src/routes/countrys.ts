import express from "express";
const router = express.Router();
import axios from "axios";
import Keys from "../config/keys";
import { body, validationResult } from "express-validator";

//getting the specified country from the api endpoint api.countrylayer.com
//using the country name provided in the body
router.post(
  "/getCounry",
  //provided country name shouldn't be empty
  body("country").isLength({ min: 1 }),
  //allow the api to know weather to search by correct full name by providing true or false
  body("fullText").isBoolean(),
  (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    const wantedCountry = req.body.country;
    const fullText = req.body.fullText;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //send request to the api endpoint using the country name and fulltext atrributes using the library axios
    axios
      .get(
        "http://api.countrylayer.com/v2/name/" +
          wantedCountry +
          "?access_key=" +
          Keys.apiKey +
          "&FullText=" +
          fullText
      )
      .then((response) => {
        //the response represent all the data fetched with the api by using .data we get only the information needed
        //in this case the information of the searched country which we send
        res.status(200).send(response.data);
      })
      .catch((error) => {
        res.status(200).send({ error: error });
      });
  }
);

//send request to the api endpoint to get all the available countrys using the axios library
router.get("/getAllCountrys", (req: express.Request, res: express.Response) => {
  axios
    .get("http://api.countrylayer.com/v2/all?access_key=" + Keys.apiKey)
    .then((response) => {
      //the response represent all the data fetched with the api by using .data we get only the information needed
      //in this case the information of all countrys which we send
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(404).send({ error: error });
    });
});

module.exports = router;

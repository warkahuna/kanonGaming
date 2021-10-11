import express from "express";
import cors from "cors";
const httpPort = 4444; //the port the server will run on
const app = express();

//cors configuration
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], //Configures the Access-Control-Allow-Methods CORS header
    exposedHeaders: ["authorization"], //Configures the Access-Control-Expose-Headers CORS header
    origin: "*", //allow requests from all domains
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", //allowed request types
    preflightContinue: false, //Pass the CORS preflight response to the next handler
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//by adding /users to the url after the domain you get access the the users request in routes folder
app.use("/users", require("./routes/users"));
//by adding /countrys to the url after the domain you get access the the countrys request in routes folder
app.use("/countrys", require("./routes/countrys"));
//by adding /game to the url after the domain you get access the the users game in routes folder
app.use("/game", require("./routes/game"));

app.listen(httpPort, () => console.log("server running port " + httpPort));

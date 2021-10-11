"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var httpPort = 4444; //the port the server will run on
var app = (0, express_1.default)();
//cors configuration
app.use((0, cors_1.default)({
    allowedHeaders: ["authorization", "Content-Type"],
    exposedHeaders: ["authorization"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false, //Pass the CORS preflight response to the next handler
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//by adding /users to the url after the domain you get access the the users request in routes folder
app.use("/users", require("./routes/users"));
//by adding /countrys to the url after the domain you get access the the countrys request in routes folder
app.use("/countrys", require("./routes/countrys"));
//by adding /game to the url after the domain you get access the the users game in routes folder
app.use("/game", require("./routes/game"));
app.listen(httpPort, function () { return console.log("server running port " + httpPort); });

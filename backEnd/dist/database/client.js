"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var keys_1 = __importDefault(require("../config/keys"));
var client = new pg_1.Client({
    connectionString: keys_1.default.databaseUri,
    ssl: {
        rejectUnauthorized: false,
    },
});
client.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});
exports.default = client;

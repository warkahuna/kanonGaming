import { Client } from "pg";
import Keys from "../config/keys";

const client = new Client({
  connectionString: Keys.databaseUri,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

export default client;

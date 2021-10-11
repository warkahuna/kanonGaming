import "../styles/dataBaseStyle.css";
import { useSelector, useDispatch } from "react-redux";
import { dataBaseActions } from "../actions";
import schema from "../assets/dataBaseSchema.png";

function DataBasePage() {
  //get the state from the dataBaseReducer
  const dataBaseData = useSelector((state) => state.dataBaseReducer);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <h3>SQL</h3>
      <h4>Click the buttons to change view</h4>
      <div className="buttonsRow">
        <button
          className="normal-button"
          onClick={() => {
            if (!dataBaseData.isSchema) {
              dispatch(dataBaseActions({ type: "isSchema", payload: true }));
              dispatch(dataBaseActions({ type: "isMethode1", payload: false }));
              dispatch(dataBaseActions({ type: "isMethode2", payload: false }));
              dispatch(dataBaseActions({ type: "query", payload: false }));
            }
          }}
        >
          Show schema
        </button>
        <button
          className="normal-button"
          onClick={() => {
            if (!dataBaseData.isMethode1) {
              dispatch(dataBaseActions({ type: "isSchema", payload: false }));
              dispatch(dataBaseActions({ type: "isMethode1", payload: true }));
              dispatch(dataBaseActions({ type: "isMethode2", payload: false }));
              dispatch(dataBaseActions({ type: "query", payload: false }));
            }
          }}
        >
          Table creation sql methode 1
        </button>
        <button
          className="normal-button"
          onClick={() => {
            if (!dataBaseData.isMethode2) {
              dispatch(dataBaseActions({ type: "isSchema", payload: false }));
              dispatch(dataBaseActions({ type: "isMethode1", payload: false }));
              dispatch(dataBaseActions({ type: "isMethode2", payload: true }));
              dispatch(dataBaseActions({ type: "query", payload: false }));
            }
          }}
        >
          Table creation sql methode 2
        </button>
        <button
          className="normal-button"
          onClick={() => {
            if (!dataBaseData.query) {
              dispatch(dataBaseActions({ type: "isSchema", payload: false }));
              dispatch(dataBaseActions({ type: "isMethode1", payload: false }));
              dispatch(dataBaseActions({ type: "isMethode2", payload: false }));
              dispatch(dataBaseActions({ type: "query", payload: true }));
            }
          }}
        >
          query
        </button>
      </div>
      {dataBaseData.isSchema ? (
        <img className="schema" src={schema} alt="Logo" />
      ) : dataBaseData.isMethode1 ? (
        <p>
          CREATE TABLE employee (<br></br> id INTEGER PRIMARY KEY AUTOINCREMENT,
          <br></br> name varchar(255),<br></br> casinoId INTEGER,<br></br>{" "}
          created_at timestamp );<br></br>
          <br></br> CREATE TABLE casino ( id INTEGER PRIMARY KEY AUTOINCREMENT,
          <br></br> name varchar(255),<br></br>
          created_at timestamp );<br></br> <br></br>CREATE TABLE country ( id
          INTEGER PRIMARY KEY AUTOINCREMENT,<br></br> name varchar(255) UNIQUE,
          <br></br> created_at timestamp );<br></br> <br></br>CREATE TABLE game
          ( id INTEGER PRIMARY KEY AUTOINCREMENT,
          <br></br> name varchar(255) UNIQUE,<br></br> typeId INTEGER,<br></br>{" "}
          casinoId INTEGER,<br></br> created_at timestamp );<br></br> CREATE
          TABLE type ( id INTEGER PRIMARY KEY AUTOINCREMENT,<br></br>
          name varchar(255) UNIQUE,<br></br> created_at timestamp ); CREATE
          TABLE player ( id INTEGER PRIMARY KEY AUTOINCREMENT,<br></br> name
          varchar(255),<br></br> favorite INTEGER,<br></br> created_at timestamp
          );<br></br> <br></br>CREATE TABLE country_game ( id INTEGER PRIMARY
          KEY AUTOINCREMENT,
          <br></br> countryId INTEGER,<br></br> gameId INTEGER,<br></br>
          created_at timestamp ); <br></br>
          <br></br>CREATE TABLE countries_player ( id INTEGER PRIMARY KEY
          AUTOINCREMENT,<br></br> countryId INTEGER,
          <br></br> playerId INTEGER,<br></br>
          created_at timestamp );<br></br>
          <br></br>ALTER TABLE employee ADD FOREIGN KEY (casinoId) REFERENCES
          casino (id);<br></br> <br></br>ALTER TABLE game ADD FOREIGN KEY
          (typeId) REFERENCES type (id);<br></br> <br></br>ALTER TABLE game ADD
          FOREIGN KEY (casinoId) REFERENCES casino (id);<br></br> <br></br>ALTER
          TABLE player ADD FOREIGN KEY (favorite) REFERENCES game (id);<br></br>
          <br></br>
          ALTER TABLE countries_player ADD FOREIGN KEY (playerId) REFERENCES
          country (id);<br></br> <br></br>ALTER TABLE countries_player ADD
          FOREIGN KEY (countryId) REFERENCES player (id);
          <br></br>ALTER TABLE country_game ADD FOREIGN KEY (countryId)
          REFERENCES game (id);<br></br> ALTER TABLE country_game ADD FOREIGN
          KEY (gameId) REFERENCES country (id);
        </p>
      ) : dataBaseData.isMethode2 ? (
        <p>
          CREATE TABLE employee ( id INTEGER PRIMARY KEY AUTOINCREMENT,<br></br>{" "}
          name varchar(255),<br></br> casinoId INTEGER,<br></br> created_at
          timestamp,<br></br> FOREIGN KEY (casinoId) REFERENCES casino(id) );
          <br></br>
          <br></br>CREATE TABLE casino ( id INTEGER PRIMARY KEY AUTOINCREMENT,
          <br></br> name varchar(255),<br></br> created_at timestamp );<br></br>{" "}
          <br></br>CREATE TABLE country ( id INTEGER PRIMARY KEY,<br></br> name
          varchar(255) UNIQUE,
          <br></br> created_at timestamp );<br></br>
          <br></br>CREATE TABLE game ( id INTEGER PRIMARY KEY,<br></br> name
          varchar(255) UNIQUE,<br></br> typeId INTEGER,<br></br> casinoId int,
          <br></br>
          created_at timestamp,<br></br> FOREIGN KEY (typeId) REFERENCES
          type(id),<br></br>
          FOREIGN KEY (casinoId) REFERENCES casino(id) );<br></br> <br></br>
          CREATE TABLE type ( id INTEGER PRIMARY KEY,<br></br> name varchar(255)
          UNIQUE,
          <br></br> created_at timestamp );<br></br> <br></br>CREATE TABLE
          player ( id INTEGER PRIMARY KEY,
          <br></br> name varchar(255),<br></br>
          favorite INTEGER,<br></br> created_at timestamp,<br></br> FOREIGN KEY
          (favorite) REFERENCES game(id) );<br></br> <br></br>CREATE TABLE
          country_game ( id INTEGER PRIMARY KEY,<br></br> countryId INTEGER,
          <br></br> gameId INTEGER,<br></br> created_at timestamp,<br></br>{" "}
          FOREIGN KEY (countryId) REFERENCES country(id),<br></br> FOREIGN KEY
          (gameId) REFERENCES game(id) );<br></br> <br></br>CREATE TABLE
          countries_player ( id INTEGER PRIMARY KEY,<br></br> countryId INTEGER,
          <br></br> playerId INTEGER,
          <br></br> created_at timestamp,<br></br> FOREIGN KEY (countryId)
          REFERENCES country(id),<br></br> FOREIGN KEY (playerId) REFERENCES
          player(id) );
        </p>
      ) : dataBaseData.query ? (
        <p>
          select p.name,p.id,p.favorite from player p <br></br>
          left join game g on p.favorite = g.id <br></br>
          left join type t on g.typeId = t.id <br></br>
          where t.name = 'SLOT';{" "}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default DataBasePage;

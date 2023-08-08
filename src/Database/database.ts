require("dotenv").config();
import { DataSource } from "typeorm";
import { join } from "path";


export let DatabaseConnection: DataSource

if (process.versions?.electron) {
  DatabaseConnection = new DataSource({
  type:"sqlite",
  database: "db.sqlite3",
  entities: [join(__dirname, "..", "Entities/*.ts")],
});
} else {
  DatabaseConnection = new DataSource({
  host: process.env.DB_HOST,
  type: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  synchronize: true,
  entities: [join(__dirname, "..", "Entities/*.ts")],
});
}

// host: "sql865.main-hosting.eu",
// type: "mysql",
// username: "u848751863_school",
// password: "@Jollyjoe123",
// database: "u848751863_school",
// username: process.env.DB_USER,
// password: process.env.DB_PASS,
// database: process.env.DB_NAME,
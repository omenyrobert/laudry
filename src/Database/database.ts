import { DataSource } from "typeorm";
import { join } from "path";

export const DatabaseConnection = new DataSource({
  host: "localhost",
  type: "mysql",
  username: "root",
  password: "",
  database: "school",
  logging: false,
  synchronize: true,
  entities: [join(__dirname, "..", "Entities/*.ts")],
});
// host: "sql865.main-hosting.eu",
// type: "mysql",
// username: "u848751863_school",
// password: "@Jollyjoe123",
// database: "u848751863_school",

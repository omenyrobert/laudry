import { DataSource } from "typeorm";
import { Staff } from "../Entities/Staff";
import { Stream } from "../Entities/Stream";
import { StaffType } from "../Entities/StaffType";
import { SchoolClass } from "../Entities/SchoolClass";
import { PasswordReset } from "../Entities/PasswordReset";
import { Section } from "../Entities/Section";
import { Term } from "../Entities/Term";
import { Subject } from "../Entities/Subject";
import { Grade } from "../Entities/Grade";
import { StudentType } from "../Entities/StudentType";
import { House } from "../Entities/House";

export const DatabaseConnection = new DataSource({
  // host: "sql865.main-hosting.eu",
  // type: "mysql",
  // username: "u848751863_school",
  // password: "@Jollyjoe123",
  // database: "u848751863_school",
  host: "sql865.main-hosting.eu",
  type: "mysql",
  username: "u848751863_school",
  password: "@Jollyjoe123",
  database: "u848751863_school",
  logging: false,
  synchronize: true,
  entities: [Stream, StudentType, House, SchoolClass, Grade, Subject, StaffType, Staff, PasswordReset, Section, Term],
});

import { DataSource } from "typeorm";
import { Staff } from "../Entities/Staff";
import { Stream } from "../Entities/Stream";
import { StaffType } from "../Entities/StaffType";
import { SchoolClass } from "../Entities/SchoolClass";
import { PasswordReset } from "../Entities/PasswordReset";
import { Sections } from "../Entities/Sections";

export const DatabaseConnection = new DataSource({
  host: "localhost",
  type: "mysql",
  username: "root",
  password: "",
  database: "school_soft",
  logging: false,
  synchronize: true,
  entities: [Stream, SchoolClass, StaffType, Staff, PasswordReset, Sections],
});

import { DataSource } from "typeorm";
import { Stream } from "../Entities/Stream";
import { SchoolClass } from "../Entities/SchoolClass";
import { Sections } from "../Entities/Sections";

export const DatabaseConnection = new DataSource({
	host: "localhost",
	type: "mysql",
	username: "root",
	password: "",
	database: "school_soft",
	logging: false,
	synchronize: true,
	entities: [Stream, SchoolClass, Sections],
});

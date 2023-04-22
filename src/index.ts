import express, { Request, Response } from "express";
import router from "./Router";
const PORT: string | 3001 = process.env.PORT || 3001;
import { DatabaseConnection } from "./Database/database";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router());

app.use(express.static(path.join(__dirname, "SchoolSheet/build")));

// Catch-all route for handling SchoolSheet-side routing

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "SchoolSheet/build", "index.html"));
});

DatabaseConnection.initialize()
	.then(() => {
		console.log("Database Connection Successful");
	})
	.catch((error) => {
		console.log(error);
	});

app.listen(PORT, () => {
	console.log(`Server Running on http://localhost:${PORT}`);
});

import express, { Application, Request, Response } from "express";
import router from "./Router";
import { DatabaseConnection } from "./Database/database";
import cors from "cors";
import { join } from "path";
import cookieParser from "cookie-parser";
import { encrypt } from "./Helpers/Hash";

const app: Application = express();
const PORT: string | 3001 = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router());

app.use(express.static(join(__dirname, "SchoolSheet/build")));

// serve user uploads in parent directory ../useruploads
app.use("/useruploads", express.static(join(__dirname, "../useruploads")));

//styles and html
app.use(express.static(join(__dirname, "./Views/")));

// Catch-all route for handling SchoolSheet-side routing
app.get("*", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "SchoolSheet/build", "index.html"));
});

DatabaseConnection.initialize()
  .then(() => {
    console.log("Database Connection Successful");
    const hash = encrypt()
    console.log("HASH:  ", hash);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

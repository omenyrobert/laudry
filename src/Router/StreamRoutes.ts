import { Router } from "express";
import {
	fetchStreams,
	addStream,
	modifyStream,
	removeStream,
} from "../Controllers/StreamsController";

export default (router: Router) => {
	router.get("/streams", fetchStreams);
	router.post("/streams", addStream);
	router.put("/streams", modifyStream);
	router.delete("/streams/:id", removeStream);
};

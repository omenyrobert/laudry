import { Request, Response } from "express";
import {
	getStreams,
	createStream,
	updateStream,
	getSingleStream,
	deleteStream,
} from "../Entities/Stream";
import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchStreams = async (req: Request, res: Response) => {
	try {
		const streams = await getStreams();
		return res.json(customPayloadResponse(true, streams)).status(200).end();
	} catch (error) {
		console.log(error);
	}
};

export const addStream = async (req: Request, res: Response) => {
	try {
		const { stream } = req.body;
		if (!stream) {
			return res
				.json(customPayloadResponse(false, "Stream Required"))
				.status(200)
				.end();
		}
		await createStream(stream);
		return res
			.json(customPayloadResponse(true, "Stream Added"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
};

export const modifyStream = async (req: Request, res: Response) => {
	try {
		const { streamId, stream } = req.body;
		if (!stream) {
			return res
				.json(customPayloadResponse(false, "Stream Required"))
				.status(200)
				.end();
		}
		if (!streamId) {
			return res
				.json(customPayloadResponse(false, "Stream Id Required"))
				.status(200)
				.end();
		}
		const streamToUpdate = await getSingleStream(streamId);
		if (streamToUpdate) {
			await updateStream(streamId, stream);
			return res
				.json(customPayloadResponse(true, "Stream Updated"))
				.status(200)
				.end();
		}
		return res
			.json(customPayloadResponse(false, "Stream not Updated"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
};

export const removeStream = async (req: Request, res: Response) => {
	try {
		const streamId = parseInt(req.params.id);
		const streamToDelete = await getSingleStream(streamId);
		if (streamToDelete) {
			await deleteStream(streamId);
			return res
				.json(customPayloadResponse(true, "Stream Deleted"))
				.status(200)
				.end();
		}
		return res
			.json(customPayloadResponse(false, "Stream not Found"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
};

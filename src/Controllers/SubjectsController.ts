import { Request, Response } from "express";
import {
	getSubjects,
	createSubject,
	updateSubject,
	getSingleSubject,
	deleteSubject,
} from "../Entities/Subject";
import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchSubjects = async (req: Request, res: Response) => {
	try {
		const subjects = await getSubjects();
		return res.json(customPayloadResponse(true, subjects)).status(200).end();
	} catch (error) {
		console.log(error);
	}
};

export const addSubject = async (req: Request, res: Response) => {
	try {
		const { subject } = req.body;
		if (!subject) {
			return res
				.json(customPayloadResponse(false, "Subject Required"))
				.status(200)
				.end();
		}
		await createSubject(subject);
		return res
			.json(customPayloadResponse(true, "Subject Added"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
};

export const modifySubject = async (req: Request, res: Response) => {
	try {
		const { subjectId, subject } = req.body;
		if (!subject) {
			return res
				.json(customPayloadResponse(false, "Subject Required"))
				.status(200)
				.end();
		}
		if (!subjectId) {
			return res
				.json(customPayloadResponse(false, "Subject Id Required"))
				.status(200)
				.end();
		}
		const subjectToUpdate = await getSingleSubject(subjectId);
		if (subjectToUpdate) {
			await updateSubject(subjectId, subject);
			return res
				.json(customPayloadResponse(true, "Subject Updated"))
				.status(200)
				.end();
		}
		return res
			.json(customPayloadResponse(false, "Subject not Updated"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
};

export const removeSubject = async (req: Request, res: Response) => {
	try {
		const subjectId = parseInt(req.params.id);
		const subjectToDelete = await getSingleSubject(subjectId);
		if (subjectToDelete) {
			await deleteSubject(subjectId);
			return res
				.json(customPayloadResponse(true, "Subject Deleted"))
				.status(200)
				.end();
		}
		return res
			.json(customPayloadResponse(false, "Subject not Found"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
};

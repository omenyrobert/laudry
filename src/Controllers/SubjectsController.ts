import { Request, Response } from "express";
import {
	getSubjects,
	createSubject,
	updateSubject,
	getSingleSubject,
	deleteSubject,
	addSubjectToStaff,
	removeSubjectFromStaff
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
		const { subject, classLevels } = req.body;
		if (!subject) {
			return res
				.json(customPayloadResponse(false, "Subject Required"))
				.status(200)
				.end();
		}
		await createSubject(subject, classLevels);
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
		const { subjectId, subject, classLevels } = req.body;
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
			await updateSubject(subjectId, subject, classLevels);
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


// add subject to staff
export const addSubjectToStaffMember = async (req: Request, res: Response) => {
	try {
		const { subjectId, staffId } = req.body;
		if (!subjectId) {
			return res
				.json(customPayloadResponse(false, "Subject Required"))
				.status(200)
				.end();
		}
		if (!staffId) {
			return res
				.json(customPayloadResponse(false, "Staff Id Required"))
				.status(200)
				.end();
		}
		await addSubjectToStaff(subjectId, staffId);
		return res
			.json(customPayloadResponse(true, "Subject Added to Staff"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
}


// remove subject from staff

export const removeSubjectFromStaffMember = async (req: Request, res: Response) => {
	try {
		const { subjectId, staffId } = req.body;
		if (!subjectId) {
			return res
				.json(customPayloadResponse(false, "Subject Required"))
				.status(200)
				.end();
		}
		if (!staffId) {
			return res
				.json(customPayloadResponse(false, "Staff Id Required"))
				.status(200)
				.end();
		}
		await removeSubjectFromStaff(subjectId, staffId);
		return res
			.json(customPayloadResponse(true, "Subject Removed from Staff"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
}
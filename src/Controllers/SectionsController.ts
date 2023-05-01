import { Request, Response } from "express";
import {
	getSections,
	createSections,
	updateSections,
	deleteSections,
	getSingleSections,
} from "../Entities/Section";
import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchSections = async (req: Request, res: Response) => {
	try {
		const sections = await getSections();
		return res.json(customPayloadResponse(true, sections)).status(200).end();
	} catch (error) {
		console.log(error);
	}
};

export const addSection = async (req: Request, res: Response) => {
	try {
		const { section } = req.body;
		if (!section) {
			return res
				.json(customPayloadResponse(false, "Section Required"))
				.status(200)
				.end();
		}
		await createSections(section);
		return res
			.json(customPayloadResponse(true, "Section Added"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
};

export const modifySection = async (req: Request, res: Response) => {
	try {
		const { sectionId, section } = req.body;
		if (!section) {
			return res
				.json(customPayloadResponse(false, "Section Required"))
				.status(200)
				.end();
		}
		if (!sectionId) {
			return res
				.json(customPayloadResponse(false, "Section Id Required"))
				.status(200)
				.end();
		}
		const sectionToUpdate = await getSingleSections(sectionId);
		if (sectionToUpdate) {
			await updateSections(sectionId, section);
			return res
				.json(customPayloadResponse(true, "Section Updated"))
				.status(200)
				.end();
		}
		return res
			.json(customPayloadResponse(false, "Section not Updated"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
};

export const removeSection = async (req: Request, res: Response) => {
	try {
		const sectionId = parseInt(req.params.id);
		const sectionToDelete = await getSingleSections(sectionId);
		if (sectionToDelete) {
			await deleteSections(sectionId);
			return res
				.json(customPayloadResponse(true, "Section Deleted"))
				.status(200)
				.end();
		}
		return res
			.json(customPayloadResponse(false, "Section not Found"))
			.status(200)
			.end();
	} catch (error) {
		console.log(error);
	}
};

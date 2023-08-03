import { Request, Response } from "express";

import { 
  fetchLevels,
  createLevel,
  updateLevel,
  deleteClassById
} from "../Entities/ClassLevel";

import { customPayloadResponse } from "../Helpers/Helpers";

export const getLevels = async (req: Request, res: Response) => {
  try {
    const levels = await fetchLevels();
    return res.json(customPayloadResponse(true, levels)).status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
};

export const addLevel = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .json(customPayloadResponse(false, "Please provide a name"))
        .status(400)
        .end();
    }
    const level = await createLevel(name);
    return res.json(customPayloadResponse(true, level)).status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const updateLevelById = async (req: Request, res: Response) => {
  try {
    const { id, name, classes } = req.body;
    if (!id || !name || !classes) {
      return res
        .json(customPayloadResponse(false, "Please provide all fields"))
        .status(400)
        .end();
    }
    if (!Array.isArray(classes)) {
      return res
        .json(customPayloadResponse(false, "Classes must be an array"))
        .status(400)
        .end();
    }
    const level = await updateLevel(id, name, classes);
    return res.json(customPayloadResponse(true, level)).status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const deleteLevelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .json(customPayloadResponse(false, "Please provide an id"))
        .status(400)
        .end();
    }
    const level = await deleteClassById(parseInt(id));
    return res.json(customPayloadResponse(true, level)).status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}
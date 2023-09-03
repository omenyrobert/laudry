import { Request, Response } from "express";
import {
  getDivisions,
  createDivision,
  updateDivision,
  deleteDivision,
  getSingleDivision,
} from "../Entities/Division";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchDivisions = async (req: Request, res: Response) => {
  try {
    const divisions = await getDivisions();
    return res
      .json(customPayloadResponse(true, divisions))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const addDivision = async (req: Request, res: Response) => {
  try {
    const { division, points, upperLimit, lowerLimit, classLevels } = req.body;

    if (!division) {
      return res
        .json(customPayloadResponse(false, "Division Required"))
        .status(200)
        .end();
    }

    if (!points) {
      return res
        .json(customPayloadResponse(false, "Points Required"))
        .status(200)
        .end();
    }

    await createDivision(division, points, upperLimit, lowerLimit, classLevels);
        
    return res
      .json(customPayloadResponse(true, "Division Added"))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const modifyDivision = async (req: Request, res: Response) => {
  try {
    const { id, division, points, 
      upperLimit, lowerLimit, classLevels
    } = req.body;

    const divisionId = id;

    if (!divisionId) {
      return res
        .json(customPayloadResponse(false, "Division Id Required"))
        .status(200)
        .end();
    }

    if (!division) {
      return res
        .json(customPayloadResponse(false, "Division Required"))
        .status(200)
        .end();
    }

    if (!points) {
      return res
        .json(customPayloadResponse(false, "Points Required"))
        .status(200)
        .end();
    }

    const divisionToModify = await getSingleDivision(divisionId);

    if (divisionToModify) {
      await updateDivision(divisionId, division, points, upperLimit, lowerLimit, classLevels);

      return res
        .json(customPayloadResponse(true, "Division Modified"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Division Not Found"))
        .status(200)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const removeDivision = async (req: Request, res: Response) => {
  try {
    const divisionId = parseInt(req.params.id);

    if (!divisionId) {
      return res
        .json(customPayloadResponse(false, "Division Id Required"))
        .status(200)
        .end();
    }

    const divisionToDelete = await getSingleDivision(divisionId);

    if (divisionToDelete) {
      await deleteDivision(divisionId);
      return res
        .json(customPayloadResponse(true, "Division Deleted"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Division Not Found"))
        .status(400)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

import { Request, Response } from "express";

import { fetchLevels } from "../Entities/ClassLevel";

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

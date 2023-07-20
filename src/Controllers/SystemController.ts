import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers";
import { setDate, getActiveDate } from "../Entities/System";
import { decrypt } from "../Helpers/Hash";


export const fetchDate = async (req: Request, res: Response) => {
  try {
    const date = await getActiveDate();
    return res.json(customPayloadResponse(true, date)).status(200).end();
  } catch (error) {
    console.log(error);
  }
}


export const addDate = async (req: Request, res: Response) => {
  try {
    const { key } = req.body;
    if (!key) {
      return res
        .json(customPayloadResponse(false, "Date Required"))
        .status(200)
        .end();
    }
    const newDate = decrypt(key)
    await setDate(newDate);
    return res
      .json(customPayloadResponse(true, "Date Added"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
    return res
      .json(customPayloadResponse(false, "Invalid Date"))
      .status(200)
      .end();
  }
}




import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers";
import { setDate, getActiveToken } from "../Entities/System";
import { decrypt } from "../Helpers/Hash";


export const fetchDate = async (req: Request, res: Response) => {
  try {
    const date = await getActiveToken();
    if (date) {
      return res.json(customPayloadResponse(true, decrypt(date.token))).status(200).end();
    }
    return res.json(customPayloadResponse(false, null)).status(200).end();
  } catch (error) {
    console.log(error);
    return res.json(customPayloadResponse(false, "Invalid Date")).status(200).end();
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
    try {
      const dateStr = decrypt(key);
      const date = new Date(dateStr);
      if (date.toString() === "Invalid Date") {
        return res
          .json(customPayloadResponse(false, "Invalid Token"))
          .status(200)
          .end();
      }
    } catch (error) {
      return res
        .json(customPayloadResponse(false, "Invalid Token"))
        .status(200)
        .end();
    }
    await setDate(key);
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




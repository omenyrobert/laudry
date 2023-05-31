import { Request, Response } from "express";
import {
  getHouses,
  addHouse,
  getHouseById,
  getHouseByType,
  deleteHouse,
  updateHouse,
} from "../Entities/House";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchHouses = async (req: Request, res: Response) => {
  try {
    const houses = await getHouses();
    return res.json(customPayloadResponse(true, houses)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const addHouseController = async (req: Request, res: Response) => {
  try {
    const { house } = req.body;

    const House = await addHouse(house);

    return res.json(customPayloadResponse(true, House)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const deleteHouseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const House = await deleteHouse(parseInt(id));

    return res.json(customPayloadResponse(true, House)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const updateHouseController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { house } = req.body;

    const House = await updateHouse(parseInt(id), house);

    return res.json(customPayloadResponse(true, House)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const getHouseByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const House = await getHouseById(parseInt(id));

    return res.json(customPayloadResponse(true, House)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const getHouseByTypeController = async (req: Request, res: Response) => {
  try {
    const { house } = req.params;

    const House = await getHouseByType(house);

    return res.json(customPayloadResponse(true, House)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}


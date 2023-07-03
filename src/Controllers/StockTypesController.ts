import { Request, Response } from "express";
import {
  getStockTypes,
  addStockType,
  deleteStockType,
  updateStockType,
  getStockTypeById,
  getStockTypeByType,
} from "../Entities/StockType";
import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchStockTypes = async (req: Request, res: Response) => {
  try {
    const stockTypes = await getStockTypes();
    return res.json(customPayloadResponse(true, stockTypes)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const createStockType = async (req: Request, res: Response) => {
  try {
    const { type } = req.body;
    const findType = await getStockTypeByType(type);
    if (findType) {
      return res.json(customPayloadResponse(false, "Type Exists"));
    }
    const insertType = await addStockType(type);
    if (insertType) {
      return res
        .json(customPayloadResponse(true, "Type Added"))
        .status(200)
        .end();
    }
  } catch (error) {
    console.log(error);
  }
};

export const modifyStockType = async (req: Request, res: Response) => {
  try {
    const { type, id } = req.body;
    if (!type) {
      return res
        .json(customPayloadResponse(false, "Stock Type Required"))
        .status(200)
        .end();
    }
    if (!id) {
      return res
        .json(customPayloadResponse(false, "Stock Type Id Required"))
        .status(200)
        .end();
    }
    const typeUpdate = await getStockTypeById(id);
    if (typeUpdate) {
      await updateStockType(id, type);
      return res
        .json(customPayloadResponse(true, "Stock Type Updated"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Stock Type not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const removeStockType = async (req: Request, res: Response) => {
  try {
    const stockTypeId = parseInt(req.params.id);
    const stockType = await getStockTypeById(stockTypeId);
    if (stockType) {
      await deleteStockType(stockTypeId);
      return res
        .json(customPayloadResponse(true, "Stock Type Deleted"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Stock Type not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

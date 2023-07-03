import { Request, Response } from "express";
import {
  getStockLevels,
  addStockLevel,
  getStockLevelById,
  updateStockLevel,
  deleteStockLevel,
} from "../Entities/StockLevels";
import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchStockLevels = async (req: Request, res: Response) => {
  try {
    const stockLevels = await getStockLevels();
    return res
      .json(customPayloadResponse(true, stockLevels))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const createStockLevel = async (req: Request, res: Response) => {
  try {
    const { date, stock, quantity, remaining, stockType } = req.body;
    const stockLevelToAdd = await addStockLevel(
      date,
      stock,
      quantity,
      remaining,
      stockType
    );
    return res
      .json(customPayloadResponse(true, stockLevelToAdd))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const modifyStockLevel = async (req: Request, res: Response) => {
  try {
    const { id, date, stock, quantity, remaining, stockType, reducedDate, takenBy, takenByContacts, reductions } = req.body;
    if (!id) {
      return res
        .json(customPayloadResponse(false, "Stock Level Id Required"))
        .status(200)
        .end();
    }
    const stockLevelToUpdate = await getStockLevelById(id);

    const stockReductions = stockLevelToUpdate?.reductions ? 
      `${reductions},${stockLevelToUpdate?.reductions}`  :  `${reductions}`;

    if (stockLevelToUpdate) {
      await updateStockLevel(
        id,
        date,
        stock,
        quantity,
        remaining,
        stockType,
        reducedDate,
        takenBy,
        takenByContacts,
        stockReductions
      );
      return res
        .json(customPayloadResponse(true, "Stock Level Updated"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Stock Level not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const removeStockLevel= async (req: Request, res: Response) => {
    try {
      const stockLevelId = parseInt(req.params.id);
      const stockType = await getStockLevelById(stockLevelId);
      if (stockType) {
        await deleteStockLevel(stockLevelId);
        return res
          .json(customPayloadResponse(true, "Stock Level Deleted"))
          .status(200)
          .end();
      }
      return res
        .json(customPayloadResponse(false, "Stock Level not Found"))
        .status(200)
        .end();
    } catch (error) {
      console.log(error);
    }
  };
  
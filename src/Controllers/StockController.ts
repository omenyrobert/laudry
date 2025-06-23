import { Request, Response } from "express";

import {
  getStocks,
  updateStock,
  createStock,
  deleteStock,
  getSingleStock,
  restock,
  searchStock,
  getAllStocks,
  getTopStocks,
} from "../Entities/Stock";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchStocks = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    const stocks = await getStocks(page ? parseInt(page.toString()) : 1);
    return res.json(customPayloadResponse(true, stocks)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const addStock = async (req: Request, res: Response) => {
  try {
    const { name, date, qty, unitCost, unitSell, categoryId, warningAt } =
      req.body;
    await createStock(
      name,
      date,
      qty,
      unitCost,
      unitSell,
      categoryId,
      warningAt
    );
    return res
      .json(customPayloadResponse(true, "Stock Added"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const modifyStock = async (req: Request, res: Response) => {
  try {
    const { id, name, date, qty, unitCost, unitSell, categoryId, warningAt } =
      req.body;
    if (!name) {
      return res
        .json(customPayloadResponse(false, "Stock Required"))
        .status(200)
        .end();
    }
    if (!id) {
      return res
        .json(customPayloadResponse(false, "Stock Id Required"))
        .status(200)
        .end();
    }
    const stockUpdate = await getSingleStock(id);
    if (stockUpdate) {
      await updateStock(
        id,
        name,
        date,
        qty,
        unitCost,
        unitSell,
        categoryId,
        warningAt
      );
      return res
        .json(customPayloadResponse(true, "Stock Updated"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Stock not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const removeStock = async (req: Request, res: Response) => {
  try {
    const stockId = parseInt(req.params.id);
    const stockToDelete = await getSingleStock(stockId);
    if (stockToDelete) {
      await deleteStock(stockId);
      return res
        .json(customPayloadResponse(true, "Stock Deleted"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Stock not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const handleResctock = async (req: Request, res: Response) => {
  try {
    console.log("id here");
    const { id, qty, unitCost, unitSell, date } = req.body;
    if (!id) {
      return res
        .json(customPayloadResponse(false, "Stock Id Required"))
        .status(200)
        .end();
    }

    if (!qty) {
      return res
        .json(customPayloadResponse(false, "Stock Qty Required"))
        .status(200)
        .end();
    }

    if (!unitCost) {
      return res
        .json(customPayloadResponse(false, "Stock Unit Cost Required"))
        .status(200)
        .end();
    }

    if (!unitSell) {
      return res
        .json(customPayloadResponse(false, "Stock Unit Sell Required"))
        .status(200)
        .end();
    }

    if (!date) {
      return res
        .json(customPayloadResponse(false, "Stock Date Required"))
        .status(200)
        .end();
    }

    const stock = await restock(
      parseInt(id),
      parseInt(qty),
      parseInt(unitCost),
      parseInt(unitSell),
      date
    );

    return res.json(customPayloadResponse(true, stock)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const handleSearchStock = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    if (!search) {
      return res
        .json(customPayloadResponse(false, "Search Required"))
        .status(200)
        .end();
    }
    const stocks = await searchStock(search.toString());
    return res.json(customPayloadResponse(true, stocks)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const handleGetAllStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await getAllStocks();
    return res.json(customPayloadResponse(true, stocks)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const handleGetTopStocks = async (req: Request, res: Response) => {
  try {
    console.log("here");
    const stocks = await getTopStocks();
    return res.json(customPayloadResponse(true, stocks)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

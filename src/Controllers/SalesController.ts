import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers";
import { getSales, createSale, getSalesByDate, searchSales, getSalesAndExpenses } from "../Entities/Sales";


export const getSalesController = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;

    const sales = await getSales(
      page ? parseInt(page.toString()) : 1
    );
    return res.json(customPayloadResponse(true, sales)).status(200).end();
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}


export const createSalesController = async (req: Request, res: Response) => {
  try {
    const {sales, customerId, paymentDate} = req.body;
    if (!sales) {
      return res
        .json(customPayloadResponse(false, "Sales Required"))
        .status(200)
        .end();
    }
    if (!Array.isArray(sales)) {
      return res
        .json(customPayloadResponse(false, "Sales must be an array"))
        .status(200)
        .end();
    }
    for (const sale of sales) {
      const {date, quantity, stockId} = sale;
      if (!date || !quantity || !stockId) {
        continue
      }
      await createSale(date, quantity, stockId, customerId, paymentDate);
    }

    return res
      .json(customPayloadResponse(true, "Sales Added"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}

export const getSalesByDateController = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .json(customPayloadResponse(false, "Date Required"))
        .status(200)
        .end();
    }
    const sales = await getSalesByDate(date.toString());

    return res
      .json(customPayloadResponse(true, sales))
      .status(200)
      .end();
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}

export const searchSalesController = async (req: Request, res: Response) => {
  try {
    const { search, startDate, endDate } = req.query;
    
    const sales = await searchSales(
      search ? search.toString() : null,
      startDate ? startDate.toString() : null,
      endDate ? endDate.toString() : null,
    );

    return res
      .json(customPayloadResponse(true, sales))
      .status(200)
      .end();
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}

export const getSalesAndExpensesController = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    const sales = await getSalesAndExpenses(
      startDate ? startDate.toString() : null,
      endDate ? endDate.toString() : null,
    );

    return res
      .json(customPayloadResponse(true, sales))
      .status(200)
      .end();
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Internal Server Error")).status(500).end();
  }
}
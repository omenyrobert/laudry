import { Request, Response } from "express";
import {
  TransactionType,
  createTransactionType,
  getTransTypesForSelectType,
  updateTransactionType,
  deleteTransactionType,
  getTransactionTypes as getTransactionTypesFromDB
} from "../Entities/TransactionType"
import { customPayloadResponse } from "../Helpers/Helpers";


export const addTransactionType = async (req: Request, res: Response) => {
  try {
    const { type, name } = req.body;
    if (!type || !name) {
      return res
        .json(customPayloadResponse(false, "Please provide all fields"))
        .status(400)
        .end();
    }
    const transactionType = await createTransactionType({ type, name });
    return res.json(customPayloadResponse(true, transactionType)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const getTransactionTypes = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    if (!type) {
      return res
        .json(customPayloadResponse(false, "Please provide all fields"))
        .status(400)
        .end();
    }
    const transactionTypes = await getTransTypesForSelectType(type as TransactionType["type"]);
    return res.json(customPayloadResponse(true, transactionTypes)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const updateTransactionTypeController = async (req: Request, res: Response) => {
  try {
    const { type, name, id } = req.body;
    if (!type || !name || !id) {
      return res
        .json(customPayloadResponse(false, "Please provide all fields"))
        .status(400)
        .end();
    }
    const transactionType = await updateTransactionType({ type, name, id });
    return res.json(customPayloadResponse(true, transactionType)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const deleteTransactionTypeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .json(customPayloadResponse(false, "Please provide all fields"))
        .status(400)
        .end();
    }
    const transactionType = await deleteTransactionType(parseInt(id));
    return res.json(customPayloadResponse(true, transactionType)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const getTransactionTypesController = async (req: Request, res: Response) => {
  try {
    const transactionTypes = await getTransactionTypesFromDB();
    return res.json(customPayloadResponse(true, transactionTypes)).status(200).end();
  } catch (error) {
    console.log(error)
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}


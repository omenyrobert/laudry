import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers";
import {
  getTransactions,
  updateTransaction,
  createTransaction,
  deleteTransaction,
} from "../Entities/Transaction"

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const {
      title,
      amount,
      description,
      transactionCategory,
      account,
      debit_amount,
      credit_amount,
      balance,
      receivedBy,
      contacts,
      receipt,
      transactionTypeID
    } = req.body;

    console.log(req.body)

    const file = req.file ? req.file.filename : null;

    if (!title || !amount || !description || !transactionCategory || !account) {
      return res
        .json(customPayloadResponse(false, "Please provide all fields"))
        .status(400)
        .end();
    }

    const transaction = await createTransaction(
      title,
      amount,
      description,
      transactionCategory,
      account,
      debit_amount,
      credit_amount,
      balance,
      receivedBy,
      contacts,
      file,
      receipt,
      transactionTypeID
    )

    return res.json(customPayloadResponse(true, transaction)).status(200).end();
  } catch (error) {
    console.log(error)
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const getTransactionsController = async (req: Request, res: Response) => {
  try {
    const transactions = await getTransactions();
    return res.json(customPayloadResponse(true, transactions)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}


export const updateTransactionController = async (req: Request, res: Response) => {
  try {
    const {
      title,
      amount,
      description,
      transactionCategory,
      account,
      debit_amount,
      credit_amount,
      balance,
      receivedBy,
      contacts,
      receipt,
      transactionTypeID,
      id
    } = req.body;

    const file = req.file ? req.file.filename : null;

    if (!title || !amount || !description || !transactionCategory || !account || !id) {
      return res
        .json(customPayloadResponse(false, "Please provide all fields"))
        .status(400)
        .end();
    }

    const transaction = await updateTransaction(
      id,
      title,
      amount,
      description,
      transactionCategory,
      account,
      debit_amount,
      credit_amount,
      balance,
      receivedBy,
      contacts,
      file,
      receipt,
      transactionTypeID
    )

    return res.json(customPayloadResponse(true, transaction)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

export const deleteTransactionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .json(customPayloadResponse(false, "Please provide all fields"))
        .status(400)
        .end();
    }
    const transaction = await deleteTransaction(parseInt(id));
    return res.json(customPayloadResponse(true, transaction)).status(200).end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}


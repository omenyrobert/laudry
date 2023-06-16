import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers";
import {
  getTransactions,
  updateTransaction,
  deleteTransaction,
  createTransactionDoubleEntry,
  getTransactionsByAccountId
} from "../Entities/Transaction"

export const addTransaction = async (req: Request, res: Response) => {
  try {
    
    const {
      title,
      amount,
      description,
      transactionCategory,
      accountToDebit,
      accountToCredit,
      receivedBy,
      contacts,
      receipt,
      transactionTypeID,
    } = req.body;

    const file = req.file ? req.file.filename : null;

    if (!title) {
      return res
        .json(customPayloadResponse(false, "Title is required"))
        .status(400)
        .end();
    }

    if (!amount) {
      return res
        .json(customPayloadResponse(false, "Amount is required"))
        .status(400)
        .end();
    }


    if (!transactionCategory) {
      return res
        .json(customPayloadResponse(false, "Transaction Category is required"))
        .status(400)
        .end();
    }

    if (!accountToDebit) {
      return res
        .json(customPayloadResponse(false, "Account to debit is required"))
        .status(400)
        .end();
    }

    if (!accountToCredit) {
      return res
        .json(customPayloadResponse(false, "Account to credit is required"))
        .status(400)
        .end();
    }

    

    const transaction = await createTransactionDoubleEntry(
      title,
      parseInt(amount),
      description,
      transactionCategory,
      accountToDebit,
      accountToCredit,
      receivedBy,
      contacts,
      file,
      receipt,
      parseInt(transactionTypeID)
    )

    return res.json(customPayloadResponse(true, transaction)).status(200).end();

  } catch (error) {
    console.log(error);
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

export const getTransactionsByAccountIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { accountId } = req.params;
    if (!accountId) {
      return res
        .json(customPayloadResponse(false, "Please provide an account ID"))
        .status(400)
        .end();
    }

    const transactions = await getTransactionsByAccountId(parseInt(accountId));
    return res
      .json(customPayloadResponse(true, transactions))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
};


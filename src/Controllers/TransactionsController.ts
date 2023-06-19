import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers";
import {
  getTransactions,
  //updateTransaction,
  deleteTransaction,
  getTransactionsByAccountId,
  createTransactionDoubleEntry,
  updateTransactionDoubleEntry,
  deleteTransactionDoubleEntry,
  getTransactionsByTransId,
  getTransactionsByTransactionType
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



export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const {
      transactionId,
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
    } = req.body
    const file = req.file ? req.file.filename : null;

    if (!transactionId) {
      return res
        .json(customPayloadResponse(false, "Title is required"))
        .status(400)
        .end();
    }

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

    const transaction = await updateTransactionDoubleEntry(
      transactionId,
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


export const getTransactionsByTransIDController = async (req: Request, res: Response) => {
  try{
    const {transactionId} = req.params

    const transactions = await getTransactionsByTransId(transactionId)

    return res.json(customPayloadResponse(true, transactions)).status(200).end();

  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}


export const deleteTransactionsByTransIDController = async (req: Request, res: Response) => {
  try{
    const {transactionId} = req.params
    console.log("Delete Transaction", transactionId)

    await deleteTransactionDoubleEntry(transactionId)

    return res.json(customPayloadResponse(true, "SuccessFully deleted Transaction")).status(200).end();

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

export const getTransactionsByTransactionTypeController = async (req: Request, res: Response) => {
  try{
    const {transactionType} = req.params

    const transactions = await getTransactionsByTransactionType(transactionType)

    return res.json(customPayloadResponse(true, transactions)).status(200).end();

  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occured"))
      .status(500)
      .end();
  }
}

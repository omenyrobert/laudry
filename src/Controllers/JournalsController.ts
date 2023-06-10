import { Request, Response } from "express";
import {
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal,
  getSingleJournal,
} from "../Entities/Journal";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchJournals = async (req: Request, res: Response) => {
  try {
    const journals = await getJournals();
    return res
      .json(customPayloadResponse(true, journals))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const addJournal = async (req: Request, res: Response) => {
  try {
    const {
      date,
      debit,
      credit,
      debitAccount,
      debitAccountId,
      creditAccountId,
      creditAccount,
      transactionType,
    } = req.body;

    await createJournal(
      date,
      debit,
      credit,
      debitAccount,
      creditAccount,
      debitAccountId,
      creditAccountId,
      transactionType,
    );
        
    return res
      .json(customPayloadResponse(true, "Journal Added"))
      .status(200)
      .end();
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const modifyJournal = async (req: Request, res: Response) => {
  try {
    const {
      id,
      date,
      debit,
      credit,
      debitAccount,
      creditAccount,
      transactionType,
      balance1,
      balance2
    } = req.body;

    const journalId = id;

    if (!journalId) {
      return res
        .json(customPayloadResponse(false, "Journal ID Required"))
        .status(200)
        .end();
    }

    const journalToModify = await getSingleJournal(journalId);

    if (journalToModify) {
      await updateJournal(journalId, {
        date,
        debit,
        credit,
        transactionType,
        balance1,
        balance2
      });

      return res
        .json(customPayloadResponse(true, "Journal Modified"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Journal Not Found"))
        .status(200)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

export const removeJournal = async (req: Request, res: Response) => {
  try {
    const journalId = parseInt(req.params.id);

    if (!journalId) {
      return res
        .json(customPayloadResponse(false, "Journal ID Required"))
        .status(200)
        .end();
    }

    const journalToDelete = await getSingleJournal(journalId);

    if (journalToDelete) {
      await deleteJournal(journalId);
      return res
        .json(customPayloadResponse(true, "Journal Deleted"))
        .status(200)
        .end();
    } else {
      return res
        .json(customPayloadResponse(false, "Journal Not Found"))
        .status(400)
        .end();
    }
  } catch (error) {
    return res
      .json(customPayloadResponse(false, "An Error Occurred"))
      .status(500)
      .end();
  }
}

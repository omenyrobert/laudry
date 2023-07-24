import { Request, Response } from "express";

import {
  getTerms,
  updateTerm,
  createTerm,
  deleteTerm,
  getSingleTerm,
  getTermBySelect,
} from "../Entities/Term";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchTerms = async (req: Request, res: Response) => {
  try {
    const terms = await getTerms();
    return res.json(customPayloadResponse(true, terms)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const addTerm = async (req: Request, res: Response) => {
  try {
    const { from, to, term, selected } = req.body;
    if (!from) {
      return res
        .json(customPayloadResponse(false, "From Required"))
        .status(200)
        .end();
    }
    if (!to) {
      return res
        .json(customPayloadResponse(false, "To Required"))
        .status(200)
        .end();
    }
    if (!term) {
      return res
        .json(customPayloadResponse(false, "Term Required"))
        .status(200)
        .end();
    }
    await createTerm(from, to, term, selected);
    return res
      .json(customPayloadResponse(true, "Term Added"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const modifyTerm = async (req: Request, res: Response) => {
  try {
    const { termId, to, from, term, selected } = req.body;
    if (!from) {
      return res
        .json(customPayloadResponse(false, "From Required"))
        .status(200)
        .end();
    }
    if (!to) {
      return res
        .json(customPayloadResponse(false, "To Required"))
        .status(200)
        .end();
    }
    if (!term) {
      return res
        .json(customPayloadResponse(false, "Term Required"))
        .status(200)
        .end();
    }
    if (!termId) {
      return res
        .json(customPayloadResponse(false, "Term Id Required"))
        .status(200)
        .end();
    }
    if (selected === 1) {
      const selectedTerm = await getTermBySelect();
      if (selectedTerm === null) {
        await updateTerm(termId, to, from, term, selected);
      } else {
        await updateTerm(
          selectedTerm.id,
          selectedTerm.to,
          selectedTerm.from,
          selectedTerm.term,
          0
        );
        await updateTerm(termId, to, from, term, selected);
      }
    }

    return res
      .json(customPayloadResponse(true, "Term Updated"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};

export const removeTerm = async (req: Request, res: Response) => {
  try {
    const termId = parseInt(req.params.id);
    const termToDelete = await getSingleTerm(termId);
    if (termToDelete) {
      await deleteTerm(termId);
      return res
        .json(customPayloadResponse(true, "Term Deleted"))
        .status(200)
        .end();
    }
    return res
      .json(customPayloadResponse(false, "Term not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};


// get selected term
export const getSelectedTerm = async (req: Request, res: Response) => {
  try {
    const term = await getTermBySelect();
    if (term) {
      return res.json(customPayloadResponse(true, term)).status(200).end();
    }
    return res
      .json(customPayloadResponse(false, "Term not Found"))
      .status(200)
      .end();
  } catch (error) {
    console.log(error);
  }
};


        

import { Request, Response } from "express";

import {
  getStocks,
  updateStock,
  createStock,
  deleteStock,
  getSingleStock
} from "../Entities/Stock";

import { customPayloadResponse } from "../Helpers/Helpers";

export const fetchStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await getStocks();
    return res.json(customPayloadResponse(true, stocks)).status(200).end();
  } catch (error) {
    console.log(error);
  }
};

export const addStock = async (req: Request, res: Response) => {
  try {
    const { 
      name,
      date,
      qty,
      unitCost,
      unitSell,
      categoryId,
      warningAt } = req.body;
    // if (!name) {
    //   return res
    //     .json(customPayloadResponse(false, "name Required"))
    //     .status(200)
    //     .end();
    // }
    // if (!date) {
    //   return res
    //     .json(customPayloadResponse(false, "To Required"))
    //     .status(200)
    //     .end();
    // }
    // if (!qty) {
    //   return res
    //     .json(customPayloadResponse(false, "qty Required"))
    //     .status(200)
    //     .end();
    // }
    await createStock(
      name,
      date,
      qty,
      unitCost,
      unitSell,
      categoryId,
      warningAt);
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
    const {
      id,
      name,
      date,
      qty,
      unitCost,
      unitSell,
      categoryId,
      warningAt, } = req.body;
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
      await updateStock(id,
        name,
        date,
        qty,
        unitCost,
        unitSell,
        categoryId,
        warningAt,);
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
// export const modifyStock = async (req: Request, res: Response) => {
//   try {
//     const {
//       stockId,
//       name,
//       date,
//       qty,
//       unitCost,
//       unitSell,
//       categoryId,
//       warningAt, } = req.body;
//     if (!name) {
//       return res
//         .json(customPayloadResponse(false, "name Required"))
//         .status(200)
//         .end();
//     }
//     if (!date) {
//       return res
//         .json(customPayloadResponse(false, "date Required"))
//         .status(200)
//         .end();
//     }
//     if (!qty) {
//       return res
//         .json(customPayloadResponse(false, "qty Required"))
//         .status(200)
//         .end();
//     }
//     if (!stockId) {
//       return res
//         .json(customPayloadResponse(false, "Term Id Required"))
//         .status(200)
//         .end();
//     }
//     if (selected === 1) {
//       const selectedTerm = await getTermBySelect();
//       if (selectedTerm === null) {
//         await updateTerm(stockId, to, from, term, selected);
//       } else {
//         await updateTerm(
//           selectedTerm.id,
//           selectedTerm.to,
//           selectedTerm.from,
//           selectedTerm.term,
//           0
//         );
//         await updateTerm(stockId, to, from, term, selected);
//       }
//     }

//     return res
//       .json(customPayloadResponse(true, "Term Updated"))
//       .status(200)
//       .end();
//   } catch (error) {
//     console.log(error);
//   }
// };

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


// get selected term
// export const getSelectedTerm = async (req: Request, res: Response) => {
//   try {
//     const term = await getTermBySelect();
//     if (term) {
//       return res.json(customPayloadResponse(true, term)).status(200).end();
//     }
//     return res
//       .json(customPayloadResponse(false, "Term not Found"))
//       .status(200)
//       .end();
//   } catch (error) {
//     console.log(error);
//   }
// };




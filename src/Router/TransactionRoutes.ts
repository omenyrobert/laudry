import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import {
  getTransactionsController,
  addTransaction,
  //updateTransactionController,
  getTransactionsByAccountIdController,
  getTransactionsByTransIDController,
  updateTransaction,
  deleteTransactionsByTransIDController,
  getTransactionsByTransactionTypeController,
} from "../Controllers/TransactionsController";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "useruploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const fileUpload = upload.single("file");

export default (router: Router) => {
  const transactionPrefix = "/transactions";
  router.get(`${transactionPrefix}`, JWTAuthMiddleWare, getTransactionsController);
  router.post(`${transactionPrefix}`, fileUpload, JWTAuthMiddleWare, addTransaction);
  //router.put(`${transactionPrefix}`, fileUpload, JWTAuthMiddleWare, updateTransactionController);
  //router.delete(`${transactionPrefix}/:id`, JWTAuthMiddleWare, deleteTransactionController);
  router.get(`${transactionPrefix}/accounts/:accountId`, JWTAuthMiddleWare, getTransactionsByAccountIdController);
  router.get(`${transactionPrefix}/:transactionId`, JWTAuthMiddleWare, getTransactionsByTransIDController);
  router.put(`${transactionPrefix}`, fileUpload, JWTAuthMiddleWare, updateTransaction);
  router.delete(`${transactionPrefix}/:transactionId`, JWTAuthMiddleWare, deleteTransactionsByTransIDController);
  router.get(`${transactionPrefix}/type/:transactionType`, JWTAuthMiddleWare, getTransactionsByTransactionTypeController);

}



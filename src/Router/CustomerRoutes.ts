import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import {
  createCustomerController,
  getCustomersController
} from "../Controllers/CustomersController";


export default (router: Router) => {
  const customerPrefix = "/customers";
  router.get(`${customerPrefix}`, JWTAuthMiddleWare, getCustomersController);
  router.post(`${customerPrefix}`, JWTAuthMiddleWare, createCustomerController);
}
import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import {
  createCustomerController,
  getCustomersController,
  deleteCustomerController,
  updateCustomerController
} from "../Controllers/CustomersController";


export default (router: Router) => {
  const customerPrefix = "/customers";
  router.get(`${customerPrefix}`, JWTAuthMiddleWare, getCustomersController);
  router.post(`${customerPrefix}`, JWTAuthMiddleWare, createCustomerController);
  router.delete(`${customerPrefix}/:id`, JWTAuthMiddleWare, deleteCustomerController);
  router.put(`${customerPrefix}`, JWTAuthMiddleWare, updateCustomerController);
}
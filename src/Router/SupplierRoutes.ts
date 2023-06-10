import { Router } from "express";
import {
  fetchSuppliers,
  addSupplier,
  modifySupplier,
  removeSupplier,
} from "../Controllers/SuppliersController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const supplierPrefix = "/suppliers";
  router.get(`${supplierPrefix}`, JWTAuthMiddleWare, fetchSuppliers);
  router.post(`${supplierPrefix}`, JWTAuthMiddleWare, addSupplier);
  router.put(`${supplierPrefix}`, JWTAuthMiddleWare, modifySupplier);
  router.delete(`${supplierPrefix}/:id`, JWTAuthMiddleWare, removeSupplier);
};

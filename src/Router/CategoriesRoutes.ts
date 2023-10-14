import { Router } from "express";
import {
  fetchCategories,
  modifyCategories,
  removeCategories,
  createCategories,
} from "../Controllers/CategoriesController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const categoryPrefix = "/categories";
  router.get(`${categoryPrefix}`, JWTAuthMiddleWare, fetchCategories);
  router.post(`${categoryPrefix}`, JWTAuthMiddleWare, createCategories);
  router.put(`${categoryPrefix}`, JWTAuthMiddleWare, modifyCategories);
  router.delete(`${categoryPrefix}/:id`, JWTAuthMiddleWare, removeCategories);
};

import { Router } from "express";
import {
  fetchHouses,
  addHouseController,
  deleteHouseController,
  updateHouseController,
  getHouseByIdController
} from "../Controllers/HouseController";


import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";


export default (router: Router) => {
  const houseRoutePrefix = "/houses";
  router.get(`${houseRoutePrefix}`, JWTAuthMiddleWare, fetchHouses);
  router.post(`${houseRoutePrefix}`, JWTAuthMiddleWare, addHouseController);
  router.delete(`${houseRoutePrefix}/:id`, JWTAuthMiddleWare, deleteHouseController);
  router.put(`${houseRoutePrefix}/:id`, JWTAuthMiddleWare, updateHouseController);
}
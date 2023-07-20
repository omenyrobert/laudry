import { Router } from "express";
import {fetchDate,addDate} from "../Controllers/SystemController";


export default (router: Router) => {
  const systemPrefix = "/system";
  router.get(`${systemPrefix}`, fetchDate);
  router.post(`${systemPrefix}`, addDate);
}


import express from "express";

import ItemController from "../controllers/item.controller";
import JWTCheckMiddleware from "../middlewares/jwtCheckToken";

const paiement = express.Router();

// Groupe de route express :
paiement.post("/", JWTCheckMiddleware.verify_token, ItemController.set_oneItem);

export default paiement;

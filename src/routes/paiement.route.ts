import express from "express";
import { Request, Response, NextFunction } from "express";

import JWTCheckMiddleware from "../middlewares/jwtCheckToken";
import PaiementController from "../controllers/paiement.controller";

const paiement = express.Router();

// Groupe de route express :
paiement
  .route("/order")
  .get(JWTCheckMiddleware.verify_token, PaiementController.get_commande)
  .all((req: Request, res: Response, next: NextFunction) => next(405));

paiement
  .route("/")
  .post(JWTCheckMiddleware.verify_token, PaiementController.set_paiement)
  .all((req: Request, res: Response, next: NextFunction) => next(405));

export default paiement;

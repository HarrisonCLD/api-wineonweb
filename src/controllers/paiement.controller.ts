import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import PaiementDAO from "../daos/paiement.dao";
import { CustomRequest } from "../interfaces/request.interface";

export default class PaiementController {
  private constructor() {}

  // SCHEMA
  static async get_simplyData(
    method: () => Promise<any>,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await method();
      result ? res.json(result) : next(500);
    } catch (error) {
      console.error(error);
      next(410);
    }
  }
  static async set_simplyData(
    method: () => Promise<any>,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await method();
      result
        ? res.status(200).json({ code: 1, status: "success", message: "Commande créée !" })
        : next(500);
    } catch (error) {
      console.error(error);
      next(410);
    }
  }

  // GETTER
  static async get_commande(req: CustomRequest, res: Response, next: NextFunction) {
    const id = req.token.data[0].id;
    return PaiementController.get_simplyData(() => PaiementDAO.get_commande(id), req, res, next);
  }

  // SETTER
  static async set_paiement(req: CustomRequest, res: Response, next: NextFunction) {
    const cart = req.body;
    const id = req.token.data[0].id;
    return PaiementController.set_simplyData(
      () => PaiementDAO.set_paiement(id, cart),
      req,
      res,
      next
    );
  }
}

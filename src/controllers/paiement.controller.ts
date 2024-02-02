import { Response, Request } from "express";

export default class PaiementController {
  constructor() {}

  static async registration(req: Request, res: Response): Promise<Response> {
    try {
    } catch (error) {
      return res.status(500).json({ error: "Une erreur s'est produite." });
    }
  }
}

import { Response, Request } from "express";

import AuthDAO from "../daos/auth.dao";

import { User } from "../interfaces/user.interface";

import { CustomRequest } from "../interfaces/request.interface";

export default class AuthController {
  constructor() {}

  static async registration(req: Request, res: Response): Promise<Response> {
    try {
      const data: User = req.body;
      console.error(data);
      const result = await AuthDAO.registration(data);
      if (result) {
        return res.status(201).json({message: "Inscription réussie"});
      } else {
        return res.status(401).json({message: "Inscription échoué"});
      }
    } catch (error) {
      return res.status(500).json({ error: "Une erreur s'est produite." });
    }
  }

  static async authentification(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const data = req.body;
      // AuthValidator.validatAuthValidator(data);
      const result = await AuthDAO.authentification(data.email, data.password);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Une erreur s'est produite." });
    }
  }

  static async profil_user(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.token.data;
      const result = await AuthDAO.profileUser(id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Une erreur s'est produite." });
    }
  }
}

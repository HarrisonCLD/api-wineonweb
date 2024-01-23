import { Response, Request } from "express";

import AuthDAO from "../daos/auth.dao";

import { User } from "../interfaces/user.interface";

import { CustomRequest } from "../interfaces/request.interface";

export default class AuthController {
  constructor() {}

  static async registration(req: Request, res: Response): Promise<Response> {
    try {
      const data: User = req.body;
      const result = await AuthDAO.registration(data);
      return res.status(201).json();
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
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Une erreur s'est produite." });
    }
  }

  static async profil_user(
    req: CustomRequest,
    res: Response
  ): Promise<Response> {
    try {
      const id = req.token;
      const result = await AuthDAO.profileUser(id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: "Une erreur s'est produite." });
    }
  }
}

import { Response, Request, NextFunction } from "express";

import AuthDAO from "../daos/auth.dao";

import { User } from "../interfaces/user.interface";

import { CustomRequest } from "../interfaces/request.interface";
import { jsonToUser } from "../entities/transformers/user.transformer";
import AuthValidator from "../entities/validators/auth.validator";

export default class AuthController {
  private constructor() {}

  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const data = jsonToUser(req.body);
      data.id_role = 4;
      AuthValidator.validate_auth_validator(data, req, next);
      const result = await AuthDAO.registration(data);
      result ? res.status(201).json({ message: "Inscription réussie" }) : next(500);
    } catch (error) {
      console.error(error);
    }
  }

  static async authentification(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await AuthDAO.authentification(data.email, data.password);
      result ? res.status(200).json(result) : next(500);
    } catch (error) {
      console.error(error);
      next(410);
    }
  }

  static async profil_user(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const id = req.token.data[0].id;
      const result = await AuthDAO.profileUser(id);
      result ? res.status(200).json(result) : next(500);
    } catch (error) {
      console.error(error);
      next(410);
    }
  }
}

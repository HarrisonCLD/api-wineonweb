import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { CustomRequest } from "../interfaces/request.interface";

export default class JWTCheckMiddleware {
  private constructor() {}

  static verify_token(req: Request, res: Response, next: NextFunction
  ) {
    dotenv.config();
    const secretKey = process.env.SECRET_KEY as string;

    const BearerToken = req.headers.authorization;
    if (!BearerToken) {
      return res.status(401).json({ error: "Header d'autorisation manquant" });
    }

    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Token inexistant" });
    }

    const decoded = jwt.verify(token, secretKey);
    (req as CustomRequest).token = decoded;

    next();
  }
}

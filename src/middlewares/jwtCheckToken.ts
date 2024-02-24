import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

import jwt, { TokenExpiredError } from "jsonwebtoken";

import { CustomRequest } from "../interfaces/request.interface";

export default class JWTCheckMiddleware {
  private constructor() {}

  static verify_token(req: Request, res: Response, next: NextFunction) {
    dotenv.config();
    try {
      const secretKey = process.env.SECRET_KEY as string;
      const BearerToken = req.headers.authorization;
      if (!BearerToken) {
        return next(498);
      }
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        return next(498);
      }
      const decoded = jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          next(498);
        }
        if (decoded) {
          (req as CustomRequest).token = decoded;
          next();
        }
      });
    } catch (error) {
      next(500);
    }
  }
}

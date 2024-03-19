import express from "express";
import { Request, Response, NextFunction } from "express";

import AuthController from "../controllers/auth.controller";
import JWTCheckMiddleware from "../middlewares/jwtCheckToken";
import AuthValidator from "../entities/validators/auth.validator";

const auth = express.Router();

// Groupe de route express :
auth
  .route("/signup")
  .post(AuthValidator.validate_auth_validator, AuthController.registration)
  .all((req: Request, res: Response, next: NextFunction) => next(405));

auth
  .route("/signin")
  .post(AuthController.authentification)
  .all((req: Request, res: Response, next: NextFunction) => next(405));

auth
  .route("/profile")
  .post(JWTCheckMiddleware.verify_token, AuthController.profil_user)
  .all((req: Request, res: Response, next: NextFunction) => next(405));

auth
  .route("/token")
  .post(JWTCheckMiddleware.verify_token, (req: Request, res: Response) => {
    res.status(200).json({ status: "accepted" });
  })
  .all((req: Request, res: Response, next: NextFunction) => next(405));

export default auth;

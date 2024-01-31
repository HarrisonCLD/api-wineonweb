import express from "express";

import AuthController from "../controllers/auth.controller";
import JWTCheckMiddleware from "../middlewares/jwtCheckToken";
import AuthValidator from "../validators/auth.validator";

const auth = express.Router();

// Groupe de route express :
auth.post("/signup", AuthController.registration);
auth.get("/user/profile", JWTCheckMiddleware.verify_token, AuthController.profil_user);
auth.post("/signin", AuthController.authentification);

export default auth;

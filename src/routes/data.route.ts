import express from "express";
import { Request, Response, NextFunction } from "express";

import DataController from "../controllers/data.controller";
import JWTCheckMiddleware from "../middlewares/jwtCheckToken";

const data = express.Router();

// Groupe de route express :
data
  .route("/datasignup")
  .get(DataController.get_data_signup)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
data
  .route("/dataitem")
  .get(DataController.get_data_item)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
data
  .route("/dataform")
  .get(DataController.get_data_form)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
data
  .route("/region")
  .get(DataController.get_region)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
data
  .route("/pays")
  .get(DataController.get_pays)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
data
  .route("/optionattribut")
  .get(DataController.get_optionAttribut)
  .post(JWTCheckMiddleware.verify_token, DataController.set_optionAttribut)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
data
  .route("/categorie")
  .get(DataController.get_category)
  .post(JWTCheckMiddleware.verify_token, DataController.set_category)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
data
  .route("/attribut")
  .get(DataController.get_attribut)
  .post(JWTCheckMiddleware.verify_token, DataController.set_attribut)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
data
  .route("/fournisseur")
  .get(DataController.get_fournisseur)
  .post(JWTCheckMiddleware.verify_token, DataController.set_fournisseur)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
data
  .route("/images")
  .get(DataController.get_images)
  .all((req: Request, res: Response, next: NextFunction) => next(405));

export default data;

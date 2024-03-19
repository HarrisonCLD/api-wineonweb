import express from "express";
import { Request, Response, NextFunction } from "express";

import ItemController from "../controllers/item.controller";
import JWTCheckMiddleware from "../middlewares/jwtCheckToken";

const item = express.Router();

// Groupe de route express :

item
  .route("/private/items")
  .get(JWTCheckMiddleware.verify_token, ItemController.get_itemsStock)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
item
  .route("/all")
  .get(ItemController.get_items)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
item
  .route("/add")
  .post(JWTCheckMiddleware.verify_token, ItemController.set_item)
  .all((req: Request, res: Response, next: NextFunction) => next(405));
item
  .route("/:id")
  .get(ItemController.get_item)
  .post(JWTCheckMiddleware.verify_token, ItemController.set_item)
  .all((req: Request, res: Response, next: NextFunction) => next(405));

export default item;

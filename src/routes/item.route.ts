import express from "express";

import ItemController from "../controllers/item.controller";
import JWTCheckMiddleware from "../middlewares/jwtCheckToken";

const item = express.Router();

// Groupe de route express :
item.get("/view/:id", ItemController.get_oneItem);
item.get("/news", ItemController.get_newsItems);
item.get("/filterproducts", ItemController.get_filterItems);
item.post(
  "/additem",
  JWTCheckMiddleware.verify_token,
  ItemController.set_oneItem
);
item.get(
  "/dataform/additem",
  JWTCheckMiddleware.verify_token,
  ItemController.set_oneItem
);
item.get("/", ItemController.get_allItems);

export default item;

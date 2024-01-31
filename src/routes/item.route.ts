import express from "express";

import ItemController from "../controllers/item.controller";
import JWTCheckMiddleware from "../middlewares/jwtCheckToken";

const item = express.Router();

// Groupe de route express :
item.get("/view/:id", ItemController.get_oneItem);
item.post("/additem", JWTCheckMiddleware.verify_token, ItemController.set_oneItem);
item.get("/dataform/additem", JWTCheckMiddleware.verify_token, ItemController.set_oneItem);
item.get("/stock", JWTCheckMiddleware.verify_token, ItemController.get_allItemsStock);
item.post("/categorie", JWTCheckMiddleware.verify_token, ItemController.set_categorie);
item.post("/attribut", JWTCheckMiddleware.verify_token, ItemController.set_categorie);
item.post("/optionattribut", JWTCheckMiddleware.verify_token, ItemController.set_categorie);
item.get("/", ItemController.get_allItems);

export default item;

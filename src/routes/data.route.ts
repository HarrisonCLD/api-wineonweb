import express from "express";

import DataController from "../controllers/data.controller";
import JWTCheckMiddleware from "../middlewares/jwtCheckToken";

const data = express.Router();

// Groupe de route express :
data.get("/dataform/optionitem", DataController.get_dataOptionItem);
data.post("/categorie", DataController.set_oneCategorie);
data.post("/optionattribut", DataController.set_someOptionAttribut);
data.post("/attribut", DataController.set_someAttribut);
data.get("/fournisseur", DataController.get_allForFournisseur);
data.get("/images", DataController.get_allForImages);
data.get("/", DataController.get_allData);

export default data;

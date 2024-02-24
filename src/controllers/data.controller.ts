import { NextFunction, Request, Response } from "express";

import DataDAO from "../daos/data.dao";
import { CustomRequest } from "../interfaces/request.interface";

export default class DataController {
  private constructor() {}

  // SCHEMA
  static async get_simplyData(method: () => Promise<any>, req: Request, res: Response, next: NextFunction) {
    try {
      const result = await method();
      result ? res.json(result) : next(500);
    } catch (error) {
      console.error(error);
      next(410);
    }
  }
  static async set_simplyData(method: () => Promise<any>, req: Request, res: Response, next: NextFunction) {
    try {
      const result = await method();
      result ? res.status(200).json({ message: "Insertion réussie !" }) : next(500);
    } catch (error) {
      console.error(error);
      next(410);
    }
  }

  // GETTER
  static async get_data_signup(req: Request, res: Response, next: NextFunction) {
    try {
      const civilite = await DataDAO.get_civilite();
      const pays = await DataDAO.get_pays();
      res.status(200).json({ civilite, pays });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  static async get_data_item(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await DataDAO.get_category();
      const attributCategory = await DataDAO.get_attributCategory();
      const attribut = await DataDAO.get_attribut();
      const attributOptionAttribut = await DataDAO.get_attributOptionAttribut();
      const optionAttribut = await DataDAO.get_optionAttribut();
      res.status(200).json({
        category,
        attributCategory,
        attribut,
        attributOptionAttribut,
        optionAttribut,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  static async get_data_form(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const pays = await DataDAO.get_pays();
      const region = await DataDAO.get_region();
      const fournisseur = await DataDAO.get_fournisseur();
      const categorie = await DataDAO.get_category();
      const attributCategorie = await DataDAO.get_attributCategory();
      const attribut = await DataDAO.get_attribut();
      const attributOptionAttribut = await DataDAO.get_attributOptionAttribut();
      const optionAttribut = await DataDAO.get_optionAttribut();
      const images = await DataDAO.get_images();
      res.json({
        pays,
        region,
        fournisseur,
        categorie,
        attributCategorie,
        attribut,
        attributOptionAttribut,
        optionAttribut,
        images,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async get_images(req: Request, res: Response, next: NextFunction) {
    DataController.get_simplyData(DataDAO.get_images, req, res, next);
  }
  static async get_pays(req: Request, res: Response, next: NextFunction) {
    DataController.get_simplyData(DataDAO.get_pays, req, res, next);
  }
  static async get_region(req: Request, res: Response, next: NextFunction) {
    DataController.get_simplyData(DataDAO.get_region, req, res, next);
  }
  static async get_fournisseur(req: Request, res: Response, next: NextFunction) {
    DataController.get_simplyData(DataDAO.get_fournisseur, req, res, next);
  }
  static async get_category(req: Request, res: Response, next: NextFunction) {
    DataController.get_simplyData(DataDAO.get_category, req, res, next);
  }
  static async get_attributCategory(req: Request, res: Response, next: NextFunction) {
    DataController.get_simplyData(DataDAO.get_attributCategory, req, res, next);
  }
  static async get_attribut(req: Request, res: Response, next: NextFunction) {
    DataController.get_simplyData(DataDAO.get_attribut, req, res, next);
  }
  static async get_attributOptionAttribut(req: Request, res: Response, next: NextFunction) {
    DataController.get_simplyData(DataDAO.get_attributOptionAttribut, req, res, next);
  }
  static async get_optionAttribut(req: Request, res: Response, next: NextFunction) {
    DataController.get_simplyData(DataDAO.get_optionAttribut, req, res, next);
  }

  // SETTER
  static async set_fournisseur(req: Request, res: Response, next: NextFunction) {
    const category = req.body;
    DataController.set_simplyData(() => DataDAO.set_fournisseur(category), req, res, next);
  }
  static async set_category(req: Request, res: Response, next: NextFunction) {
    const category = req.body;
    DataController.set_simplyData(() => DataDAO.set_category(category), req, res, next);
  }
  static async set_attributCategory(req: Request, res: Response, next: NextFunction) {
    const attributCategory = req.body;
    DataController.set_simplyData(() => DataDAO.set_attributCategory(attributCategory), req, res, next);
  }
  static async set_attribut(req: Request, res: Response, next: NextFunction) {
    const attribut = req.body;
    DataController.set_simplyData(() => DataDAO.set_attribut(attribut), req, res, next);
  }
  static async set_optionAttribut(req: Request, res: Response, next: NextFunction) {
    const optionAttribut = req.body;
    DataController.set_simplyData(() => DataDAO.set_optionAttribut(optionAttribut), req, res, next);
  }
}

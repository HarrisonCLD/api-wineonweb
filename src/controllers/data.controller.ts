import { Request, Response } from "express";

import DataDAO from "../daos/data.dao";

import fs from "fs";
import path from "path";
import { CustomRequest } from "../interfaces/request.interface";

export default class DataController {
  constructor() {}

  static async getAll(req: Request, res: Response, getDataFunction: any) {
    try {
      const result = await getDataFunction();
      res.json(result);
    } catch (error) {
      res.status(500).json();
    }
  }

  static async get_allData(req: CustomRequest, res: Response) {
    try {
      const pays = await DataDAO.get_allPays();
      const region = await DataDAO.get_allRegion();
      const fournisseur = await DataDAO.get_allFournisseur();
      const categorie = await DataDAO.get_allCategorie();
      const attribut = await DataDAO.get_allAttribut();
      const attributCategorie = await DataDAO.get_allAttributCategorie();
      const attributOptionAttribut = await DataDAO.get_allAttributOptionAttribut();
      res.json({
        pays,
        region,
        fournisseur,
        categorie,
        attribut,
        attributOptionAttribut,
        attributCategorie,
      });
    } catch (error) {
      res.status(500).json();
    }
  }

  static async get_allForFournisseur(req: Request, res: Response) {
    try {
      const region = await DataDAO.get_allRegion();
      const pays = await DataDAO.get_allPays();
      res.json({ region, pays });
    } catch (error) {
      res.status(500).json();
    }
  }

  static async get_allPays(req: Request, res: Response) {
    await this.getAll(req, res, DataDAO.get_allPays());
  }

  static async get_allRegion(req: Request, res: Response) {
    await this.getAll(req, res, DataDAO.get_allRegion());
  }

  static async get_allFournisseur(req: Request, res: Response) {
    await this.getAll(req, res, DataDAO.get_allFournisseur());
  }

  // static async get_allAttribut_optionAttribut(req: Request, res: Response) {
  //   await this.getAll(req, res, DataDAO.get_allAttribut_optionAttribut());
  // }

  // static async get_allAttribut_categorie(req: Request, res: Response) {
  //   await this.getAll(req, res, DataDAO.get_allAttribut_categorie());
  // }

  static async get_allForImages(req: Request, res: Response) {
    try {
      const images = await DataDAO.get_allImages();
      console.log(images);
      if (images) {
        res.json(images);
      }
    } catch (error) {
      console.error(error);
    }
  }
  static async set_oneCategorie(req: Request, res: Response) {
    try {
      const item = req.body;
      const categorie = await DataDAO.set_oneCategorie(item);
      if (categorie) {
        res.status(201).json();
      }
    } catch (error) {
      console.error(error);
    }
  }
  static async set_someAttribut(req: Request, res: Response) {
    try {
      const item = req.body;
      const categorie = await DataDAO.set_someAttribut(item);
      if (categorie) {
        res.status(201).json();
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async set_someOptionAttribut(req: Request, res: Response) {
    try {
      const item = req.body;
      const categorie = await DataDAO.set_someOptionAttribut(item);
      if (categorie) {
        res.status(201).json();
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async get_dataOptionItem(req: Request, res: Response) {
    try {
      const categorie = await DataDAO.get_allCategorie();
      const attributCategorie = await DataDAO.get_allAttributCategorie();
      const attribut = await DataDAO.get_allAttribut();
      const attributOptionAttribut = await DataDAO.get_allAttributOptionAttribut();
      const optionAttribut = await DataDAO.get_allOptionAttribut();
      res.json({
        categorie,
        attribut,
        attributOptionAttribut,
        attributCategorie,
        optionAttribut,
      });
    } catch (error) {
      res.status(500).json();
    }
  }
}

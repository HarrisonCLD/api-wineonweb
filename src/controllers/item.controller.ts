import { Request, Response } from "express";

import ItemDAO from "../daos/item.dao";

export default class ItemController {
  static async get_oneItem(req: Request, res: Response) {
    const itemId = req.params.id;
    try {
      const result = await ItemDAO.get_oneItem(itemId);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async get_allItems(req: Request, res: Response): Promise<Response> {
    try {
      const result = await ItemDAO.get_allItems();
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async get_allItemsStock(req: Request, res: Response): Promise<Response> {
    try {
      const result = await ItemDAO.get_allItems();
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async set_oneItem(req: Request, res: Response) {
    const item = req.body;
    try {
      const result = await ItemDAO.set_item(item);
      if (result) {
        res.status(201).json();
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  static async set_categorie(req: Request, res: Response): Promise<Response> {
    try {
      const item = req.body;
      const result = await ItemDAO.set_categorie(item);
      if (result) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({ error: "Non autorisé." });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async set_attribut(req: Request, res: Response): Promise<Response> {
    try {
      const item = req.body;
      const result = await ItemDAO.set_categorie(item);
      if (result) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({ error: "Non autorisé." });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async set_optionAttribut(req: Request, res: Response): Promise<Response> {
    try {
      const item = req.body;
      const result = await ItemDAO.set_categorie(item);
      if (result) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({ error: "Non autorisé." });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

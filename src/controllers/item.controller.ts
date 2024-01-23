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

  static async get_filterItems(req: Request, res: Response) {
    const filter = req.query.searchTerm;
    try {
      const result = await ItemDAO.get_filterItems(filter);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async set_oneItem(req: Request, res: Response){
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
  static async get_newsItems(req: Request, res: Response) {
    try {
      const result = await ItemDAO.get_newsItems();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  // static async get_dataformAddItem(req: Request, res: Response) {
  //   try {
  //     const result = await ItemDAO.get_dataformAddItem();
  //     res.json(result);
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }
}

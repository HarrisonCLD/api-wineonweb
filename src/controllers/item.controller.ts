import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

import ItemDAO from "../daos/item.dao";

export default class ItemController {
  private constructor() {}

  // SCHEMA
  static async get_simplyData(method: () => Promise<any>, req: Request, res: Response, next: NextFunction) {
    try {
      const result = await method();
      result ? res.json({code:1,status: "success", message:result}) : next(500);
    } catch (error) {
      console.error(error);
      next(410);
    }
  }
  static async set_simplyData(method: () => Promise<any>, req: Request, res: Response, next: NextFunction) {
    try {
      const result = await method();
      result ? res.status(200).json({code:1,status: "success", message: "Insertion réussie !" }) : next(500);
    } catch (error) {
      console.error(error);
      next(410);
    }
  }

  // GETTER
  static async get_item(req: Request, res: Response, next: NextFunction) {
    const itemId = req.params.id;
    ItemController.get_simplyData(() => ItemDAO.get_item(itemId), req, res, next);
  }
  static async get_items(req: Request, res: Response, next: NextFunction) {
    ItemController.get_simplyData(ItemDAO.get_items, req, res, next);
  }
  static async get_itemsStock(req: Request, res: Response, next: NextFunction) {
    ItemController.get_simplyData(ItemDAO.get_items, req, res, next);
  }
  // static async get_stock_items(req: Request, res: Response, next: NextFunction) {
  //   ItemController.get_simplyData(ItemDAO.get_stock_items, req, res, next);
  // }

  // SETTER
  static async set_item(req: Request, res: Response, next: NextFunction) {
    const item = req.body;
    ItemController.set_simplyData(() => ItemDAO.set_item(item), req, res, next);
  }
}

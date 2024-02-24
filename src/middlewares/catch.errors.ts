import { Request, Response, NextFunction } from "express";

export const Errors = (err: number, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  switch (err) {
    case 400:
      res.status(200).json();
      break;
    case 405:
      res.status(200).json({ status: "error", message: "Method Not Allowed" });
      break;
    case 410:
      res.status(200).json({ status: "error", message: "Données invalides !" });
      break;
    case 411:
      res.status(200).json({ status: "error", message: "Information(s) manquante(s) !" });
      break;
    case 498:
      res.status(200).json({ status: "error", message: "Token indisponible" });
      break;
    case 499:
      res.status(200).json({ status: "error", message: "Token expiré" });
      break;
    case 500:
      res.status(200).json({ status: "error", message: "Une erreur est survenue !" });
      break;
  }
};

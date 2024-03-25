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
      res.status(200).json({ code: 0, status: "error", message: "Method Not Allowed" });
      break;
    case 406:
      res.status(200).json({ code: 0, status: "error", message: "Error in insertion" });
    case 410:
      res.status(200).json({ code: 0, status: "error", message: "Email ou mot de passe invalide(s) !" });
      break;
    case 411:
      res.status(200).json({ code: 0, status: "error", message: "Information(s) manquante(s) !" });
      break;
    case 412:
      res.status(200).json({
        code: 0,
        status: "error",
        message: "Un compte avec cette adresse e-mail existe déjà.",
      });
      break;
    case 498:
      res.status(200).json({ code: 0, status: "error", message: "Token indisponible" });
      break;
    case 499:
      res.status(200).json({ code: 0, status: "error", message: "Token expiré" });
      break;
    case 500:
      res.status(200).json({ code: 0, status: "error", message: "Une erreur est survenue !" });
      break;
  }
};

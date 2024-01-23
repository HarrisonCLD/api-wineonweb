import { Request, Response, NextFunction } from "express";

export default class AuthValidator {
  private constructor() {}

  static validate_auth_validator(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data = req.body;
    console.error(data);
    if (typeof data !== "object") {
      throw new Error("Les données envoyées ne sont pas de type objet");
    }
    if (
      !data.hasOwnProperty("id_civilite") &&
      !data.hasOwnProperty("nom") &&
      !data.hasOwnProperty("prenom") &&
      !data.hasOwnProperty("password") &&
      !data.hasOwnProperty("adresse") &&
      !data.hasOwnProperty("id_region") &&
      !data.hasOwnProperty("id_pays") &&
      !data.hasOwnProperty("ville") &&
      !data.hasOwnProperty("code_postal") &&
      !data.hasOwnProperty("email") &&
      !data.hasOwnProperty("date_de_naissance") &&
      !data.hasOwnProperty("telephone") 
    ) {
      throw new Error(
        "Les clés de l'objet envoyé ne sont pas celles attendues"
      );
    }
    next();
  }
}

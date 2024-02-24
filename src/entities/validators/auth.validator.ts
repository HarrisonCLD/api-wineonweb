import { Request, Response, NextFunction } from "express";
import { User } from "../../interfaces/user.interface";

export default class AuthValidator {
  private constructor() {}

  static validate_auth_validator(data: User, req: Request, next: NextFunction) {
    if (typeof data !== "object") {
      throw new Error("Les données envoyées ne sont pas de type objet");
    }

    const requiredFields = [
      "id_civilite",
      "nom",
      "prenom",
      "password",
      "adresse",
      "id_pays",
      "ville",
      "code_postal",
      "email",
      "date_de_naissance",
      "telephone",
    ];

    const missingFields = requiredFields.filter((field) => !data.hasOwnProperty(field));

    if (missingFields.length > 0) {
      next(411);
    }

    if (
      typeof data.id_civilite !== "number" ||
      typeof data.id_pays !== "number" ||
      typeof data.id_role !== "number" ||
      typeof data.code_postal !== "string" ||
      typeof data.nom !== "string" ||
      typeof data.prenom !== "string" ||
      typeof data.adresse !== "string" ||
      typeof data.email !== "string" ||
      typeof data.telephone !== "string" ||
      typeof data.date_de_naissance !== "string"
    ) {
      next(410);
    }

    next();
  }
}

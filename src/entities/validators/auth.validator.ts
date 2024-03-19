import { Request, Response, NextFunction } from "express";
import { User } from "../../interfaces/user.interface";

export default class AuthValidator {
  private constructor() {}

  static validate_auth_validator(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    console.log(data);
    if (typeof data !== "object") {
      next(411);
    }

    const requiredFields = [
      "civilite",
      "nom",
      "prenom",
      "email",
      "password",
      "code_postal",
      "date_de_naissance",
      "adresse",
      "ville",
      "pays",
      "telephone",
    ];

    const missingFields = requiredFields.filter((field) => !data.hasOwnProperty(field));

    console.log(missingFields);

    if (missingFields.length > 0) {
      next(411);
    }

    if (
      typeof data.civilite !== "number" ||
      typeof data.nom !== "string" ||
      typeof data.prenom !== "string" ||
      typeof data.email !== "string" ||
      typeof data.code_postal !== "string" ||
      typeof data.date_de_naissance !== "string" ||
      typeof data.adresse !== "string" ||
      typeof data.ville !== "string" ||
      typeof data.pays !== "number" ||
      typeof data.telephone !== "string"
    ) {
      next(410);
    }

    next();
  }
}

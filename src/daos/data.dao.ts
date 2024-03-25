import Supabase from "../entities/supabase.entities";

// import * as fs from "fs";
import * as path from "path";
import * as fs from "fs/promises"; // Utilisez la version promisifiée de fs

export default class DataDAO {
  private constructor() {}

  // SCHEMA
  static async get_data(tableName: string, columns: string) {
    const supabase = Supabase.get_instance();
    try {
      const { data } = await supabase.from(`${tableName}`).select(`${columns}`);
      return data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  static async set_data(tableName: string, insert: object) {
    const supabase = Supabase.get_instance();
    try {
      const { data } = await supabase.from(tableName).insert([insert]).select();
      if (data) {
        return true;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // GETTER
  static async get_images() {
    try {
      const directoryPath: string = path.join(__dirname, "../../../frontend-wineonweb/src/assets/images/");

      const files: string[] = await fs.readdir(directoryPath);

      const regex = /^\d{4}-\d{2}-\d{2}_.*\.png$/;

      const pngFiles = files
        .filter((file: string) => path.extname(file) === ".png" && !regex.test(file))
        .map((file: string) => path.basename(file, ".png"));

      return pngFiles;
    } catch (err) {
      console.error("Une erreur s'est produite : ", err);
      throw err;
    }
  }

  static async get_pays() {
    return DataDAO.get_data("pays", "id, nom");
  }
  static async get_region() {
    return DataDAO.get_data("region", "id, nom");
  }
  static async get_fournisseur() {
    return DataDAO.get_data("fournisseur", "id, nom");
  }
  static async get_category() {
    return DataDAO.get_data("categorie", "id, nom");
  }
  static async get_attributCategory() {
    return DataDAO.get_data("attribut_categorie", "id_categorie, id_attribut(id, nom)");
  }
  static async get_attribut() {
    return DataDAO.get_data("attribut", "id, nom");
  }
  static async get_attributOptionAttribut() {
    return DataDAO.get_data("attribut_option_attribut", "id_attribut, id_option_attribut(id, nom)");
  }
  static async get_optionAttribut() {
    return DataDAO.get_data("option_attribut", "id, nom");
  }
  static async get_civilite() {
    return DataDAO.get_data("civilite", "id, nom");
  }

  // SETTER
  static async set_fournisseur(fournisseur: any) {
    return DataDAO.set_data("fournisseur", fournisseur);
  }
  static async set_category(category: any) {
    return DataDAO.set_data("categorie", category);
  }
  static async set_attributCategory(attributCategory: any) {
    return DataDAO.set_data("attribut_categorie", attributCategory);
  }
  static async set_attribut(attribut: any) {
    return DataDAO.set_data("attribut", attribut);
  }
  static async set_optionAttribut(optionAttribut: any) {
    return DataDAO.set_data("option_attribut", optionAttribut);
  }
}

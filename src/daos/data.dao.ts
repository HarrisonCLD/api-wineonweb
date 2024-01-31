import Supabase from "../entities/supabase.entities";

export default class DataDAO {
  private constructor() {}

  static async getAll(tableName: any, columns: any) {
    const supabase = Supabase.get_instance();
    try {
      const { data, error } = await supabase.from(tableName).select(columns);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  static async get_allImages() {
    return await this.getAll("produit", "image");
  }

  static async get_allPays() {
    return await this.getAll("pays", "id, nom");
  }

  static async get_allRegion() {
    return await this.getAll("region", "id, nom");
  }

  static async get_allFournisseur() {
    return await this.getAll("fournisseur", "id, nom");
  }

  static async get_allCategorie() {
    return await this.getAll("categorie", "id, nom");
  }

  static async get_allAttribut() {
    return await this.getAll("attribut", "id, nom");
  }

  static async get_allAttributCategorie() {
    return await this.getAll("attribut_categorie", "id_categorie, id_attribut(id, nom)");
  }
  static async get_allAttributOptionAttribut() {
    return await this.getAll("attribut_option_attribut", "id_attribut, id_option_attribut(id, nom)");
  }
  static async get_allOptionAttribut() {
    return await this.getAll("option_attribut", "id, nom");
  }
  static async set_oneCategorie(item: any) {
    const supabase = Supabase.get_instance();
    try {
      const { data, error } = await supabase.from("categorie").insert([
        {
          nom: item.nom,
        },
      ]);
      return true;
    } catch (error) {
      console.error(error);
    }
  }
  static async set_someAttribut(item: any) {
    const supabase = Supabase.get_instance();
    try {
      if (Array.isArray(item.id_attribut)) {
        for (let i = 0; item.id_attribut.length > i; i++) {
          const { data, error } = await supabase.from("attribut_categorie").insert([
            {
              id_attribut: item.id_attribut[i],
              id_categorie: item.id_categorie,
            },
          ]);
        }
        return true;
      } else {
        const { data, error } = await supabase.from("attribut_categorie").insert([
          {
            id_attribut: item.id_atribut,
            id_categorie: item.id_categorie,
          },
        ]);
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
  static async set_someOptionAttribut(item: any) {
    const supabase = Supabase.get_instance();
    try {
      if (Array.isArray(item.id_option_attribut)) {
        for (let i = 0; item.id_option_attribut.length > i; i++) {
          const { data, error } = await supabase.from("attribut_option_attribut").insert([
            {
              id_option_attribut: item.id_option_attribut[i],
              id_attribut: item.id_attribut,
            },
          ]);
        }
        return true;
      } else {
        const { data, error } = await supabase.from("attribut_option_attribut").insert([
          {
            id_option_attribut: item.id_option_attribut,
            id_attribut: item.id_attribut,
          },
        ]);
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

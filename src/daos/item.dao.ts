import Supabase from "../entities/supabase.entities";

import { Item } from "../interfaces/item.interface";
import { Price } from "../interfaces/price.interface";

export default class ItemDAO {
  static get_formatedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    // Format AAAA-MM-JJ
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  static async get_oneItem(itemId: any) {
    const supabase = Supabase.get_instance();
    try {
      const { data: itemData, error: itemsError } = await supabase.from("produit").select("nom, description, image, id_region(nom), id_pays(nom), id_fournisseur(nom)").eq("id", itemId).single();

      const { data: priceItems, error: priceError } = await supabase.from("prix").select("prix, id_option_attribut(nom)").eq("id_produit", itemId);

      // const formattedPrices = priceItems.map((el) => ({
      //   // prix: el.prix,
      //   // contenance: el.id_option_attribut.nom,
      // }));

      const ItemView = {
        // nom: itemData.nom,
        // description: itemData.description,
        // region: itemData.id_region.nom,
        // pays: itemData.id_pays.nom,
        // fournisseur: itemData.id_fournisseur.nom,
        // image: itemData.image,
        // options: formattedPrices,
      };
      return ItemView;
    } catch (error) {
      console.error(error);
    }
  }

  static async get_allItems() {
    const supabase = Supabase.get_instance();
    try {
      const { data: itemData, error: itemsError } = await supabase.from("produit").select("id, nom, description, image, id_region(nom), id_pays(nom), id_fournisseur(nom)").returns<Item[]>();

      const { data: priceItems, error: priceError } = await supabase.from("prix").select("prix, id_option_attribut(nom), id_produit").returns<Price[]>();

      priceItems &&
        priceItems.forEach((price) => {
          itemData &&
            itemData.forEach((item) => {
              if (price.id_produit === item.id) {
                if (!item.prix) item.prix = [];

                if (!item.option_attribut) item.option_attribut = [];

                item.prix.push(price.prix);

                if (price.id_option_attribut && price.id_option_attribut.nom) item.option_attribut.push(price.id_option_attribut.nom);
              }
            });
        });
      return itemData;
    } catch (error) {
      console.error(error);
    }
  }

  static async set_item(item: any) {
    const supabase = Supabase.get_instance();
    try {
      const date = ItemDAO.get_formatedDate();
      const { data: addInProduit, error: ErrorInProduit } = await supabase
        .from("produit")
        .insert([
          {
            nom: item.nom,
            description: item.description,
            id_pays: parseInt(item.pays),
            id_region: parseInt(item.region),
            id_fournisseur: parseInt(item.fournisseur),
            reference: item.reference,
            image: item.image,
          },
        ])
        .select();
      const { data: addInPrix, error: ErrorInPrix } = await supabase
        .from("prix")
        .insert([
          {
            // prix: parseInt(item.prix),
            // id_produit: addInProduit[0].id,
            // id_option_attribut: parseInt(item.optionAttribut),
          },
        ])
        .select();
      const { data: addInStock, error: ErrorInStock } = await supabase
        .from("stock")
        .insert([
          {
            // id_produit: addInProduit[0].id,
            // quantite_stock: parseInt(item.qte_stock),
            // date_maj: date,
            // seuil_notif: parseInt(item.seuil_notif),
            // seuil_restock: parseInt(item.seuil_restock),
            // restock_auto: item.restock_auto ? true : false,
            // id_prix: addInPrix[0].id,
          },
        ])
        .select();
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  static async set_categorie(item: any): Promise<boolean> {
    const supabase = Supabase.get_instance();
    try {
      const { data } = await supabase.from("categorie").insert([item]);
      return true;
    } catch (error: any) {
      return false;
    }
  }
  static async set_attribut(item: any): Promise<boolean> {
    const supabase = Supabase.get_instance();
    try {
      const { data } = await supabase.from("attribut").insert([item]);
      return true;
    } catch (error: any) {
      return false;
    }
  }
  static async set_optionAttribut(item: any): Promise<boolean> {
    const supabase = Supabase.get_instance();
    try {
      const { data } = await supabase.from("option_attribut").insert([item]);
      return true;
    } catch (error: any) {
      return false;
    }
  }
}

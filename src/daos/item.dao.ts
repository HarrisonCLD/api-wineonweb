import Supabase from "../entities/supabase.entities";

import { Item } from "../interfaces/item.interface";
import { Price } from "../interfaces/price.interface";
import item from "../routes/item.route";

export default class ItemDAO {
  private constructor() {}

  // GETTER
  static async get_item(itemId: any) {
    const supabase = Supabase.get_instance();
    try {
      const { data } = await supabase
        .from("produit")
        .select("id, nom, description, image, id_region(nom), id_pays(nom), id_fournisseur(nom)")
        .eq("id", itemId)
        .returns<Item[]>();

      const { data: price } = await supabase.from("prix").select("prix, id_option_attribut(nom)").eq("id_produit", itemId).returns<Price[]>();

      const { data: stock } = await supabase.from("stock").select("quantite_stock").eq("id_produit", itemId).single();

      if (data && price && stock) {
        data.map((row) => {
          row.prix = [];
          row.option_attribut = [];
        });
        price.map((row) => {
          data[0].prix?.push(row.prix);
          data[0].option_attribut?.push(row.id_option_attribut.nom);
        });
        const item: Item = {
          id: data[0].id,
          nom: data[0].nom,
          description: data[0].description,
          region: data[0].id_region?.nom,
          pays: data[0].id_pays?.nom,
          fournisseur: data[0].id_fournisseur?.nom,
          image: data[0].image,
          prix: data[0].prix,
          option_attribut: data[0].option_attribut,
          stock: stock.quantite_stock,
        };
        return item;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  static async get_items() {
    const supabase = Supabase.get_instance();
    try {
      const { data: produit } = await supabase
        .from("produit")
        .select("id, nom, description, image, id_region(nom), id_pays(nom), id_fournisseur(nom), forward")
        .returns<Item[]>();
      const { data: price } = await supabase.from("prix").select("prix, id_option_attribut(nom), id_produit").returns<Price[]>();
      if (produit && price) {
        produit.map((row) => {
          row.prix = [];
          row.option_attribut = [];
        });
        for (let i = 0; i < price.length; i++) {
          produit.map((row) => {
            if (price[i].id_produit === row.id) {
              row.prix?.push(price[i].prix);
              row.option_attribut?.push(price[i].id_option_attribut.nom);
            }
          });
        }
        const { data: stock } = await supabase.from("stock").select("id_produit, quantite_stock");
        if (stock) {
          for (let k = 0; k < stock.length; k++) {
            produit.map((row) => {
              if (stock[k].id_produit === row.id) {
                row.stock = stock[k].quantite_stock;
              }
            });
          }
        }
        const items: Item[] = [];
        produit.map((row) => {
          items.push({
            id: row.id,
            nom: row.nom,
            description: row.description,
            region: row.id_region.nom,
            pays: row.id_pays.nom,
            fournisseur: row.id_fournisseur.nom,
            image: row.image,
            prix: row.prix,
            option_attribut: row.option_attribut,
            forward: row.forward,
            stock: row.stock,
          });
        });
        return items;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // SETTER
  static async set_item(item: any) {
    const supabase = Supabase.get_instance();
    try {
      const { data: product } = await supabase
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
      if (product) {
        const { data: price } = await supabase
          .from("prix")
          .insert([
            {
              prix: parseInt(item.prix),
              id_produit: product[0].id,
              id_option_attribut: parseInt(item.optionAttribut),
            },
          ])
          .select();
        const { data: produitCategorie } = await supabase.from("produit_categorie").insert([
          {
            id_produit: product[0].id,
            id_categorie: parseInt(item.categorie),
          },
        ]);
        if (price) {
          const { data: stock } = await supabase
            .from("stock")
            .insert([
              {
                id_produit: product[0].id,
                quantite_stock: parseInt(item.qte_stock),
                date_maj: new Date().toISOString().slice(0, 10),
                seuil_notif: parseInt(item.seuil_notif),
                seuil_restock: parseInt(item.seuil_restock),
                restock_auto: item.restock_auto ? true : false,
                id_prix: price[0].id,
              },
            ])
            .select();
          if (stock) {
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

import Supabase from "../entities/supabase.entities";
import { Stock } from "../interfaces/stock.interface";

export default class PaiementDAO {
  private constructor() {}

  private static generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return randomNumber;
  }

  // GETTER

  static async get_commande(id: number) {
    const supabase = Supabase.get_instance();
    const details: Array<any> = [];
    try {
      const { data: order } = await supabase
        .from("commande")
        .select("*")
        .eq("id_utilisateur", id)
        .returns<Array<any>>();
      if (order) {
        order.map((row: any) => {
          row.produit = [];
        });
        await Promise.all(
          order.map(async (row: any) => {
            const { data: detailOrder } = await supabase
              .from("detail_commande")
              .select("id_commande, id_produit(nom), qte_commande")
              .eq("id_commande", row.id)
              .returns<any>();
            const index = order.findIndex((line: any) => {
              return line.id === detailOrder[0].id_commande;
            });
            if (index != -1) {
              order[index].produit &&
                order[index].produit.push({
                  nom: detailOrder[0].id_produit.nom,
                  qte: detailOrder[0].qte_commande,
                });
            }
          })
        );
        return order;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  // SETTER
  static async set_paiement(id: number, body: any) {
    const supabase = Supabase.get_instance();
    try {
      const error: { status: string; content: any[] } = {
        status: "error",
        content: [],
      };
      const success: { status: string; content: any[] } = {
        status: "success",
        content: [],
      };
      if (body.cart) {
        const { data: commandeData } = await supabase
          .from("commande")
          .insert([
            {
              id_utilisateur: id,
              numero_commande: PaiementDAO.generateRandomNumber(),
              prix_commande: body.price,
              mode_reglement: body.reglementation,
              date_commande: new Date(),
              id_statut: 1,
            },
          ])
          .select();

        if (commandeData && commandeData[0] && commandeData[0].id) {
          const orderId: number = commandeData[0].id;

          for (const row of body.cart) {
            const { data: stockData } = await supabase
              .from("stock")
              .select("id_produit, quantite_stock")
              .eq("id_produit", row.id)
              .single();

            if (stockData) {
              const newStock: number = stockData.quantite_stock - row.quantite;
              if (newStock < 0) {
                error.content.push({ code: "stock", content: stockData });
                return false;
              }
              const { data: detail_commande } = await supabase
                .from("detail_commande")
                .insert([
                  {
                    qte_commande: parseInt(row.quantite),
                    id_commande: orderId,
                    prix: parseInt(row.prix),
                    id_produit: parseInt(row.id),
                  },
                ])
                .select();
              if (detail_commande) {
                const { data: reduceStock } = await supabase
                  .from("stock")
                  .update({ quantite_stock: newStock })
                  .eq("id_produit", parseInt(row.id))
                  .select();
                if (reduceStock) {
                  success.content.push(reduceStock);
                }
              }
            }
          }
        }
      }
      if (error.content.length > 0) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

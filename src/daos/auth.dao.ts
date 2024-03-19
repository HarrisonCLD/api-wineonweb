import Supabase from "../entities/supabase.entities";

import JWTConfig from "../configs/jwt.config";
import { User } from "../interfaces/user.interface";
import { jsonToUser } from "../entities/transformers/user.transformer";

export default class AuthDAO {
  private constructor() {}

  static async registration(user: User) {
    const supabase = Supabase.get_instance();
    try {
      const { data: email } = await supabase
        .from("utilisateur")
        .select("email")
        .eq("email", user.email)
        .returns<User[]>();
      if (email && email.length > 0) {
        return {
          code: 1,
          status: "error",
          message: "Un compte avec cette adresse e-mail existe déjà.",
        };
      }
      const { data } = await supabase.from("utilisateur").insert([user]).select().returns<User[]>();
      if (data && data[0].id) {
        return {
          code: 3,
          status: "success",
          message: "Inscription réussie.",
        };
      } else {
        return {
          code: 0,
          status: "error",
          message: "Une erreur est survenue",
        };
      }
    } catch (err) {
      return {
        code: 2,
        status: "error",
        message: "Une erreur est survenue",
      };
    }
  }
  static async authentification(email: string, pass: string) {
    const supabase = Supabase.get_instance();
    try {
      const { data: username } = await supabase
        .from("utilisateur")
        .select("id")
        .eq("email", email)
        .returns<User[]>();
      if (username && username.length > 0) {
        const { data: password } = await supabase
          .from("utilisateur")
          .select(" nom, prenom, id_role")
          .eq("id", username[0].id)
          .eq("password", pass)
          .returns<User[]>();
        if (password && password.length > 0) {
          const jwt = new JWTConfig();
          const token = jwt.get_token([{ id: username[0].id, role: username[0].id_role }]);
          return { token };
        }
        return "Invalid";
      } else {
        return "Invalid";
      }
    } catch (err) {
      return false;
    }
  }
  static async profileUser(id: any) {
    const supabase = Supabase.get_instance();
    try {
      const { data } = await supabase
        .from("utilisateur")
        .select(
          "id_civilite( id, nom), nom, prenom, adresse, ville, id_pays(nom), code_postal, id_role( id, nom), date_de_naissance, telephone"
        )
        .eq("id", id)
        .returns<User[]>();
      if (data) {
        const user = {
          civilite: data[0].id_civilite.nom,
          nom: data[0].nom,
          prenom: data[0].prenom,
          date_naissance: data[0].date_de_naissance,
          adresse: data[0].adresse,
          ville: data[0].ville,
          pays: data[0].id_pays.nom,
          code_postal: data[0].code_postal,
          telephone: data[0].telephone,
          role: data[0].id_role.id,
          status: data[0].id_role.nom,
        };
        return user;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

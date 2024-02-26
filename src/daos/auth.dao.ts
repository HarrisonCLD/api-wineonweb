import Supabase from "../entities/supabase.entities";

import JWTConfig from "../configs/jwt.config";
import { User } from "../interfaces/user.interface";
import { jsonToUser } from "../entities/transformers/user.transformer";

export default class AuthDAO {
  private constructor() {}

  static async registration(data: User): Promise<boolean> {
    const supabase = Supabase.get_instance();
    try {
      const res = await supabase.from("utilisateur").insert([data]);
      if (res.status === 201 && res.statusText === "Created") {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  static async authentification(email: string, pass: string) {
    const supabase = Supabase.get_instance();
    try {
      const { data: username } = await supabase.from("utilisateur").select("id").eq("email", email).returns<User[]>();
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
        .select("nom, prenom, adresse, ville, id_pays(nom) code_postal, id_civilite( id, nom), id_role( id, nom), date_de_naissance, telephone")
        .eq("id", id)
        .returns<User[]>();
      if (data) {
        const user = {
          civilite: data[0].civilite,
          nom: data[0].nom,
          prenom: data[0].prenom,
          date_naissance: data[0].date_de_naissance,
          adresse: data[0].adresse,
          ville: data[0].ville,
          pays: data[0].pays,
          code_postal: data[0].code_postal,
          telephone: data[0].telephone,
          role: data[0].id_role,
          status: data[0].role,
        };
        return user;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

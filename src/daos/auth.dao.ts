import Supabase from "../entities/supabase.entities";

import JWTConfig from "../configs/jwt.config";
import { User } from "../interfaces/user.interface";

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
  static async authentification(email: string, password: string) {
    const supabase = Supabase.get_instance();
    try {
      const { data } = await supabase.from("utilisateur").select("id, nom, prenom, id_role").eq("password", password).returns<User[]>();
      if (data) {
        const user: User[] = data;
        const jwt = new JWTConfig();
        const token = jwt.get_token([{ id: user[0].id, role: user[0].id_role }]);
        return { token };
      }
    } catch (err) {
      console.error(err);
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

import Supabase from "../entities/supabase.entities";

import JWTConfig from "../configs/jwt.config";
import { User } from "../interfaces/user.interface";

export default class AuthDAO {
  private constructor() {}

  static async registration(data: User): Promise<boolean> {
    const supabase = Supabase.get_instance();
    try {
      await supabase.from("utilisateur").insert([data]);
      return true;
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
      const { data } = await supabase.from("utilisateur").select("nom, prenom, adresse, ville, code_postal, id_civilite( id, nom), id_role( id, nom)").eq("id", id).returns<User[]>();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

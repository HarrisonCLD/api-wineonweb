import { Response } from "express";

import Supabase from "../entities/supabase.entities";
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js'

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
    const { data } = await supabase
      .from("utilisateur")
      .select("id, nom, prenom, id_role")
      .eq("password", password).returns<User[]>();
    if (data) {
        const user: User[] = data;
        const jwt = new JWTConfig();
        const token = jwt.get_token([user[0].id, user[0].id_role]);
        return { token };
    }
  }
  static async profileUser(id: any) {
    const supabase = Supabase.get_instance();
    const { data: userData, error: userError } = await supabase
      .from("utilisateur")
      .select("nom, prenom, adresse, ville, code_postal, id_civilite, id_role")
      .eq("id", id);
    // const informations = {
    //   civilite: userData[0].id_civilite,
    //   nom: userData[0].nom,
    //   prenom: userData[0].prenom,
    //   adresse: userData[0].adresse,
    //   code_postal: userData[0].code_postal,
    //   ville: userData[0].ville,
    //   role: userData[0].id_role,
    // };
    // const { data: civiliteData, error: civiliteError } = await supabase
    //   .from("civilite")
    //   .select("nom")
    //   .eq("id", informations.civilite);
    // informations.civilite = civiliteData[0].nom;
    // if (userData && civiliteData) {
    //   return informations;
    // }
  }
}

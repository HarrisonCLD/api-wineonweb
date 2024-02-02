import Supabase from "../entities/supabase.entities";

export default class PaiementDAO {
  private constructor() {}

  static async registration(): Promise<boolean> {
    const supabase = Supabase.get_instance();
    try {
    } catch (err) {
      return false;
    }
  }
}

import { SupabaseClient, createClient } from "@supabase/supabase-js";

import * as dotenv from "dotenv";

export default class Supabase {
  static instance: SupabaseClient<any> | null = null;

  private constructor() {}

  static get_instance(): SupabaseClient<any> {
    if (!Supabase.instance) {
      Supabase.instance = createClient(process.env.API_URL as string, process.env.API_KEY as string);
    }
    return Supabase.instance;
  }
}
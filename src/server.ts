import * as dotenv from "dotenv";

import express from "express";

import cors from "cors";
import helmet from "helmet";

import Item from "./routes/item.route";
import Auth from "./routes/auth.route";
import Data from "./routes/data.route";
import Paiement from "./routes/paiement.route";

import { createClient } from "@supabase/supabase-js";
import { Database } from "./entities/database.entitie";
import { Errors } from "./middlewares/catch.errors";

dotenv.config();

const PORT = parseInt(process.env.PORT_NODE as string);

// Initialisation de Express :
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Initialisation de Supabase :
const supabase = createClient<Database>(process.env.API_URL as string, process.env.API_KEY as string);

// Utilisation des routes
app.use("/items", Item);
app.use("/authentification", Auth);
app.use("/data", Data);
app.use("/paiement", Paiement);
app.use(Errors);

app.listen(PORT, () => {
  console.log(`Serveur Node.js démarré sur le port ${PORT}`);
});

export interface User {
  id?: number;
  id_civilite?: number;
  civilite?: string;
  nom?: string;
  prenom?: string;
  password?: string;
  id_role?: number;
  role?: string;
  adresse?: string;
  id_pays?: number;
  pays?: string;
  ville?: string;
  code_postal?: string;
  email?: string;
  date_de_naissance?: any;
  telephone?: number;
  token?: any;
}

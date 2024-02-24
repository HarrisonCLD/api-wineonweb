import { User } from "../../interfaces/user.interface";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const jsonToUser = (data: any): User => {
  return {
    id_civilite: parseInt(data?.civilite),
    nom: data?.nom,
    prenom: data?.prenom,
    password: data?.password,
    email: data?.email,
    adresse: data?.adresse,
    ville: data?.ville,
    code_postal: data?.code_postal,
    date_de_naissance: formatDate(new Date(data?.date_de_naissance)),
    id_pays: parseInt(data?.pays),
    telephone: data?.telephone,
  };
};

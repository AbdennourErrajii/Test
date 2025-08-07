export interface Produit {
  id?: number;
  nom: string;
  prix: number;
  categorie: string;
  reference?: string;
  matricule?: string;
  dateExpiration?: string;
  fichier?: string;
}

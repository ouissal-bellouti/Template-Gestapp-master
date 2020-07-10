
import { Categorie } from 'src/app/pages/categorie'
import { Stock } from './stock';

export class Produit {
  Id: string;
  Categorie: Categorie;
  Image: HTMLImageElement;
  Stock: Stock;
}

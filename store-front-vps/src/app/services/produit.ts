import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Produit} from '../models/produit';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8090/produits';

  constructor(private http: HttpClient) { }

  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  createProduit(produit: Produit, file?: File): Observable<Produit> {
    const formData = new FormData();

    // La partie JSON
    formData.append('produit', new Blob([JSON.stringify(produit)], {
      type: 'application/json'
    }));

    // La partie fichier, si elle existe
    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.post<Produit>(this.apiUrl, formData);
  }

  // UPDATE
  updateProduit(id: number, produit: Produit, file?: File): Observable<Produit> {
    const formData = new FormData();
    formData.append('produit', new Blob([JSON.stringify(produit)], { type: 'application/json' }));

    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.put<Produit>(`${this.apiUrl}/${id}`, formData);
  }

  // DELETE
  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

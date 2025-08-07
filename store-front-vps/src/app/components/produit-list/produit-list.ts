import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../../models/produit';
import {ProduitService} from '../../services/produit';

// Déclaration pour que TypeScript reconnaisse l'objet global 'bootstrap'
declare var bootstrap: any;

@Component({
  selector: 'app-produit-list',
  standalone: false,
  templateUrl: './produit-list.html',
  styleUrls: ['./produit-list.css']
})
export class ProduitList implements OnInit, AfterViewInit {

  produits: Produit[] = [];
  editForm: FormGroup;
  selectedFile: File | null = null;
  currentProduitId: number | null = null;
  editModal: any;

  constructor(
    private produitService: ProduitService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      nom: ['', Validators.required],
      prix: [null, [Validators.required, Validators.min(0)]],
      categorie: ['', Validators.required],
      reference: [''],
      matricule: [''],
      dateExpiration: ['']
    });
  }

  ngOnInit(): void {
    this.loadProduits();
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('editProduitModal');
    if (modalElement) {
      this.editModal = new bootstrap.Modal(modalElement);
    }
  }

  loadProduits(): void {
    this.produitService.getAllProduits().subscribe((data: Produit[]) => {
      this.produits = data;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  openEditModal(produit: Produit): void {
    if (!produit.id) return;
    this.currentProduitId = produit.id;
    this.editForm.patchValue(produit);
    this.editModal.show();
  }

  onUpdate(): void {
    if (this.editForm.invalid || !this.currentProduitId) {
      this.editForm.markAllAsTouched(); // Montre les erreurs de validation
      return;
    }

    const updatedProduit = this.editForm.value;
    const fileToUpload = this.selectedFile || undefined;

    this.produitService.updateProduit(this.currentProduitId, updatedProduit, fileToUpload).subscribe({
      next: () => {
        alert('Produit mis à jour avec succès !');
        this.editModal.hide();
        this.loadProduits();
        this.resetModalForm();
      },
      error: (err: any) => {
        alert(`Erreur lors de la mise à jour : ${err.error?.message || 'Erreur inconnue'}`);
      }
    });
  }

  resetModalForm(): void {
    this.selectedFile = null;
    const fileInput = document.getElementById('editFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  deleteProduit(id?: number): void {
    if (!id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.produitService.deleteProduit(id).subscribe({
        next: () => {
          alert('Produit supprimé avec succès !');
          this.loadProduits();
        },
        error: (err: any) => {
          alert(`Erreur lors de la suppression : ${err.error?.message || 'Erreur inconnue'}`);
        }
      });
    }
  }
}

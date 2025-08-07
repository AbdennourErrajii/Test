import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProduitService} from '../../services/produit';
import {Router} from '@angular/router';

@Component({
  selector: 'app-produit-form',
  standalone: false,
  templateUrl: './produit-form.html',
  styleUrl: './produit-form.css'
})


export class ProduitForm implements OnInit {

  produitForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private router: Router
  ) {
    // Définition de la structure du formulaire
    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      prix: [null, [Validators.required, Validators.min(0)]],
      categorie: ['', Validators.required],
      reference: [''],
      matricule: [''],
      dateExpiration: ['']
    });
  }

  ngOnInit(): void { }

  // Méthode pour récupérer le fichier sélectionné par l'utilisateur
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Méthode appelée à la soumission du formulaire
  onSubmit(): void {
    this.errorMessage = null; // Réinitialiser le message d'erreur

    if (this.produitForm.invalid) {
      // Marquer tous les champs comme "touchés" pour afficher les erreurs de validation
      this.produitForm.markAllAsTouched();
      return;
    }

    const produitData = this.produitForm.value;
    const fileToUpload = this.selectedFile ? this.selectedFile : undefined;

    this.produitService.createProduit(produitData, fileToUpload).subscribe({
      next: () => {
        alert('Produit créé avec succès !');
        this.router.navigate(['/produits']); // Rediriger vers la liste
      },
      error: (err: any) => {
        // Afficher le message d'erreur venant du backend
        this.errorMessage = err.error?.message || 'Une erreur est survenue lors de la création.';
        console.error(err);
      }
    });
  }
}

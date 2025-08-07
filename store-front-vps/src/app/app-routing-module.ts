// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProduitList} from './components/produit-list/produit-list';
import {ProduitForm} from './components/produit-form/produit-form';


const routes: Routes = [


  { path: 'produits', component: ProduitList },
  { path: 'produits/nouveau', component: ProduitForm },
  { path: '', redirectTo: '/produits', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

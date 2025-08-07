package com.example.store_back_vps.controller;
import com.example.store_back_vps.model.Produit;
import com.example.store_back_vps.service.ProduitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/produits")
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    @GetMapping
    public List<Produit> getAllProduits() {
        return produitService.getAll();
    }


    @PostMapping
    public ResponseEntity<Produit> createProduit(@RequestPart("produit") Produit dto,
                                                 @RequestPart(value = "file", required = false) MultipartFile file) {
        // Le `required = false` est la clé pour rendre le fichier optionnel !
        return ResponseEntity.ok(produitService.create(dto, file));
    }

    // --- MODIFICATION ICI ---
    @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id,
                                                 @RequestPart("produit") Produit produit,
                                                 @RequestPart(value = "file", required = false) MultipartFile file) {
        return ResponseEntity.ok(produitService.update(id, produit, file));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        produitService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
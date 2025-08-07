package com.example.store_back_vps.service;

import com.example.store_back_vps.exception.InvalidProduitException;
import com.example.store_back_vps.model.Produit;
import com.example.store_back_vps.repository.ProduitRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ProduitServiceImpl implements ProduitService {

    private final ProduitRepository produitRepository;
    private final String uploadDir = "uploads/";

    public ProduitServiceImpl(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Override
    public List<Produit> getAll() {
        return produitRepository.findAll();
    }

    @Override
    public Produit create(Produit produit, MultipartFile file) {
        validateFields(produit);

        if (file != null && !file.isEmpty()) {
            String fileName = saveFile(file);
            produit.setFichier(fileName);
        }

        return produitRepository.save(produit);
    }

    @Override
    public Produit update(Long id, Produit produit, MultipartFile file) {
        Produit existing = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));

        validateFields(produit);

        existing.setNom(produit.getNom());
        existing.setPrix(produit.getPrix());
        existing.setCategorie(produit.getCategorie());
        existing.setReference(produit.getReference());
        existing.setMatricule(produit.getMatricule());
        existing.setDateExpiration(produit.getDateExpiration());

        if (file != null && !file.isEmpty()) {
            String fileName = saveFile(file);
            existing.setFichier(fileName);
        }

        return produitRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        produitRepository.deleteById(id);
    }

    private void validateFields(Produit produit) {
        String category = produit.getCategorie();

        if (category == null || category.isBlank()) {
            throw new InvalidProduitException("Le champ 'categorie' est obligatoire.");
        }

        switch (category.toLowerCase()) {
            case "informatique" -> {
                if (produit.getReference() == null || produit.getReference().isBlank()) {
                    throw new InvalidProduitException("Champ 'reference' est requis pour la catégorie Informatique.");
                }
            }
            case "véhicule" -> {
                if (produit.getMatricule() == null || produit.getMatricule().isBlank()) {
                    throw new InvalidProduitException("Champ 'matricule' est requis pour la catégorie Véhicule.");
                }
            }
            case "alimentaire" -> {
                if (produit.getDateExpiration() == null) {
                    throw new InvalidProduitException("Champ 'dateExpiration' est requis pour la catégorie Alimentaire.");
                }
            }
        }
    }


    private String saveFile(MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'enregistrement du fichier");
        }
    }
}

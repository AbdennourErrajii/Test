package com.example.store_back_vps.service;

import com.example.store_back_vps.model.Produit;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProduitService {
    List<Produit> getAll();
    Produit create(Produit dto, MultipartFile file);
    Produit update(Long id, Produit dto, MultipartFile file);
    void delete(Long id);
}

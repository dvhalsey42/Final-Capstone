package com.techelevator.controller;

import com.techelevator.dao.IngredientDao;
import com.techelevator.model.Ingredient;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
public class IngredientController {

    private IngredientDao ingredientDao;

    public IngredientController(IngredientDao ingredientDao) {
        this.ingredientDao = ingredientDao;
    }

    @GetMapping("/ingredients/all")
    public List<Ingredient> getAllIngredients() {
        return ingredientDao.getIngredients();
    }

    @PostMapping("/ingredients/create")
    public boolean createIngredient(@Valid @RequestBody Ingredient ingredient) {
        return ingredientDao.createIngredient(ingredient);
    }
}

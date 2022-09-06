package com.techelevator.controller;

import com.techelevator.dao.RecipeDao;
import com.techelevator.model.Recipe;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
public class RecipeController {

    private RecipeDao recipeDao;

    public RecipeController(RecipeDao recipeDao) {
        this.recipeDao = recipeDao;
    }

    @GetMapping("/recipes/all")
    public List<Recipe> getAllRecipes() { return recipeDao.getAllRecipes(); }

    @RequestMapping(path="/myrecipes/{userId}", method= RequestMethod.GET)
    public List<Recipe> getMyRecipes(@PathVariable int userId) {
        return recipeDao.getUserRecipes(userId);
    }

    @PostMapping("/recipes/create")
    public boolean addNewRecipe(@Valid @RequestBody Recipe newRecipe) {
        return recipeDao.addNewRecipe(newRecipe);
    }
}

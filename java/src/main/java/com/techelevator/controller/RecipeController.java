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

    @GetMapping("/myrecipes")
    public List<Recipe> getAllRecipes() { return recipeDao.getAllRecipes(); }

//    @RequestMapping(path="/myrecipes/{userId}", method= RequestMethod.GET) // change this to be with recipe id
//    public List<Recipe> getMyRecipes(@PathVariable int userId) {
//        return recipeDao.getUserRecipes(userId);
//    }

    // TODO: ASK IF THIS SHOULD BE JUST /recipes/{recipeId} TO REMOVE AMBIGUITY
    @GetMapping(path="/myrecipes/{recipeId}")
    public Recipe getRecipe(@PathVariable int recipeId) {
        return recipeDao.getRecipeById(recipeId);
    }

    @PostMapping("/recipes/create")
    public boolean addNewRecipe(@Valid @RequestBody Recipe newRecipe) {
        return recipeDao.addNewRecipe(newRecipe);
    }

    @RequestMapping(path="/myrecipes/{recipeId}/update", method=RequestMethod.POST)
    public boolean editRecipe(@PathVariable int recipeId, @RequestBody @Valid Recipe updatedRecipe) {
        return recipeDao.editRecipe(recipeId, updatedRecipe);
    }

    @DeleteMapping(path="/myrecipes/{recipeId}/delete")
    public boolean deleteRecipe(@PathVariable int recipeId) {
        return recipeDao.deleteRecipe(recipeId);
    }
}

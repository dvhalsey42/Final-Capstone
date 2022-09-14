package com.techelevator.dao;

import com.techelevator.model.Ingredient;
import com.techelevator.model.Recipe;

import java.util.List;

public interface RecipeDao {

    List<Recipe> getAllRecipes();



    //create recipe
    Recipe addNewRecipe(Recipe recipe);
    boolean addIngredientToRecipe(int recipe_id, Ingredient ingredient);
    //get recipe by name, id, user
    Recipe getRecipeByName(String name); // certain recipes might be able to go by the same name, maybe return a list?

    Recipe getRecipeById(int id);

    List<Recipe> getUserRecipes(int userId);

    //edit or something
    boolean editRecipe(int recipeId, Recipe updatedRecipe);

    boolean deleteRecipe(int recipeId);

}

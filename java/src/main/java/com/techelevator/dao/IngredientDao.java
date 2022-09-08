package com.techelevator.dao;

import com.techelevator.model.Ingredient;

import java.util.List;

public interface IngredientDao {

    List<Ingredient> getIngredients();

    // this also could be changed to recipe object, but that seems unnecessary
    List<Ingredient> getIngredientByRecipe(int recipe_id);

    boolean createIngredient(Ingredient ingredient);

    Ingredient getIngredientById();

    List<Ingredient> getIngredientsByCategory();
}

package com.techelevator.dao;

import com.techelevator.model.Ingredient;

import java.util.List;

public interface IngredientDao {

    List<Ingredient> getIngredients();

    List<Ingredient> getIngredientByRecipe();

    boolean createIngredient(Ingredient ingredient);

    Ingredient getIngredientById();

    List<Ingredient> getIngredientsByCategory();
}

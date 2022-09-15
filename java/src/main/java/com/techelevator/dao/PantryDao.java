package com.techelevator.dao;

import com.techelevator.model.Ingredient;
import com.techelevator.model.Pantry;


import java.util.List;

public interface PantryDao {

    Pantry getPantryByUserId(int userId);

    //boolean createPantry(int userId);

    List<Ingredient> getPantryIngredients(int pantryId);

    boolean addIngredient(int pantryId, int ingredientId);

    boolean addIngredientToPantry(int userId, Pantry pantry);

    boolean deletePantryItem(int pantryId, int itemId);
}

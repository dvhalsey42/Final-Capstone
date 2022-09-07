package com.techelevator.dao;

import com.techelevator.model.Ingredient;
import com.techelevator.model.Pantry;


import java.util.List;

public interface PantryDao {

    boolean createPantry(int userId);

    List<Ingredient> getPantryIngredients();

    boolean addIngredient();

}

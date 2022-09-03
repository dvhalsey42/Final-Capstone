package com.techelevator.dao;

import com.techelevator.model.Recipe;

import java.util.List;

public interface RecipeDao {

    List<Recipe> getAllRecipes();

    List<Recipe> getUserRecipes(int userId);


}

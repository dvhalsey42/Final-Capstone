package com.techelevator.dao;

import com.techelevator.model.Meal;

import java.util.List;

public interface MealDao {
    List<Meal> getMyMeals(int userId);
    Meal getMealByMealId(int mealId);

    boolean editMeal(int meal_id, Meal updatedMeal);
    boolean createMeal(Meal newMeal);
    boolean deleteMeal(int mealId);
    boolean deleteRecipeInMeal(int mealId, int recipeId);
}

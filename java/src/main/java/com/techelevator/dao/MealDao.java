package com.techelevator.dao;

import com.techelevator.model.Meal;

import java.util.List;

public interface MealDao {
    List<Meal> getMyMeals(int userId);
    Meal getMealByMealId(int mealId);
}

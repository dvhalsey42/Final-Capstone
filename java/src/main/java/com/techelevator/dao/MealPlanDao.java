package com.techelevator.dao;

import com.techelevator.model.Ingredient;
import com.techelevator.model.MealPlan;

import java.util.List;

public interface MealPlanDao {

    boolean createMealPlan(MealPlan mealPlan);

    List<MealPlan> getUserMealPlans(int user_id); // could probably change this to be all, just setting up for user id first
    List<MealPlan> getAllMealPlans();
    MealPlan getMealPlan(int mealPlan_id);

    boolean editMealPlan(int mealPlan_id, MealPlan editedPlan);

    boolean deleteMealPlan(int mealPlan_id);

    List<Ingredient> groceryList(int mealPlan_id, int user_id);
}

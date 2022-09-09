package com.techelevator.controller;

import com.techelevator.dao.MealDao;
import com.techelevator.model.Meal;
import com.techelevator.model.Recipe;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
public class MealController {

    private MealDao mealDao;

    public MealController(MealDao mealDao) {
        this.mealDao = mealDao;
    }


    @GetMapping("/mymeals")
    public List<Meal> getMyMeals(int userId) {
        return mealDao.getMyMeals(userId);
    }

    @GetMapping("/mymeal/{mealId}")
    public Meal getMealByMealId(@RequestBody Meal meal, @PathVariable int mealId){
        return mealDao.getMealByMealId(mealId);
    }

    @PostMapping("/mymeal/create")
    public boolean createNewMeal(@RequestBody Meal meal) {
        return mealDao.createMeal(meal);
    }

    @PostMapping("/mymeal/{meal_id}/edit")
    public boolean editMeal(@PathVariable int meal_id, @RequestBody @Valid Meal editedMeal) {
        return mealDao.editMeal(meal_id, editedMeal);
    }

    @DeleteMapping("/mymeal/{meal_id}/delete")
    public boolean deleteMeal(@PathVariable int meal_id) {
        return mealDao.deleteMeal(meal_id);
    }

    @DeleteMapping("/mymeal/{meal_id}/delete/{recipe_id}")
    public boolean deleteRecipeInMeal(@PathVariable int meal_id, @PathVariable int recipe_id) {
        return mealDao.deleteRecipeInMeal(meal_id, recipe_id);
    }

}

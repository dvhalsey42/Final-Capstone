package com.techelevator.controller;

import com.techelevator.dao.MealDao;
import com.techelevator.model.Meal;
import com.techelevator.model.Recipe;
import org.springframework.web.bind.annotation.*;

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

}

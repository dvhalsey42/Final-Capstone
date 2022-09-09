package com.techelevator.controller;

import com.techelevator.dao.MealPlanDao;
import com.techelevator.model.Ingredient;
import com.techelevator.model.MealPlan;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
public class MealPlanController {

    private MealPlanDao mealPlanDao;

    public MealPlanController(MealPlanDao mealPlanDao) { this.mealPlanDao = mealPlanDao; }

    @PostMapping("/mealplan/create")
    public boolean createMealPlan(@RequestBody @Valid MealPlan mealPlan) {
        return mealPlanDao.createMealPlan(mealPlan);
    }

//    @GetMapping("/mymealplans/{user_id}")
//    public List<MealPlan> getUserMealPlans(@PathVariable int user_id) {
//        return mealPlanDao.getUserMealPlans(user_id);
//    }

    @GetMapping("/mymealplans")
    public List<MealPlan> getAllMealPlans() {
        return mealPlanDao.getAllMealPlans();
    }

    @GetMapping("/mymealplans/{plan_id}")
    public MealPlan getMealPlan(@PathVariable int plan_id) {
        return mealPlanDao.getMealPlan(plan_id);
    }

    @PostMapping("/mymealplans/{plan_id}/edit")
    public boolean editMealPlan(@PathVariable int plan_id, @RequestBody MealPlan plan) {
        return mealPlanDao.editMealPlan(plan_id, plan);
    }

    @DeleteMapping("/mymealplan/{plan_id}/delete")
    public boolean deleteMealPlan(@PathVariable int plan_id) {
        return mealPlanDao.deleteMealPlan(plan_id);
    }

    @GetMapping("/grocerylist/{plan_id}/{user_id}")
    public List<Ingredient> getGroceryList(@PathVariable int plan_id, @PathVariable int user_id) {
        return mealPlanDao.groceryList(plan_id, user_id);
    }
}

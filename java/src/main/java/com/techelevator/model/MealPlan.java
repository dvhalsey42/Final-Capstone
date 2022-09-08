package com.techelevator.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

public class MealPlan {


    private int plan_id;
    @NotBlank
    private String meal_plan_name;
    @NotNull
    private int user_id;

    private List<Meal> meals;


    public MealPlan(){};

    public MealPlan(int plan_id, String meal_plan_name, int user_id) {
        this.plan_id = plan_id;
        this.meal_plan_name = meal_plan_name;
        this.user_id = user_id;
    }

    public MealPlan(int plan_id, String meal_plan_name, int user_id, List<Meal> meals) {
        this.plan_id = plan_id;
        this.meal_plan_name = meal_plan_name;
        this.user_id = user_id;
        this.meals = meals;
    }


    public int getPlan_id() {
        return plan_id;
    }

    public void setPlan_id(int plan_id) {
        this.plan_id = plan_id;
    }

    public String getMeal_plan_name() {
        return meal_plan_name;
    }

    public void setMeal_plan_name(String meal_plan_name) {
        this.meal_plan_name = meal_plan_name;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public List<Meal> getMeals() {
        return meals;
    }

    public void setMeals(List<Meal> meals) {
        this.meals = meals;
    }

    @Override
    public String toString() {
        return "MealPlan{" +
                "plan_id=" + plan_id +
                ", meal_plan_name='" + meal_plan_name + '\'' +
                ", user_id=" + user_id +
                '}';
    }

}

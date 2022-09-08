package com.techelevator.model;

import java.util.List;

public class Meal {


    private int meal_id;
    private String meal_name;
    private int user_id;

    List<Recipe> recipes; // THIS LINE WAS ADDED FOR FUNCTIONALITY ON 9/8/2022 BY DEVIN

    public Meal() { };

    public Meal(int meal_id, String meal_name, int user_id){
        this.meal_id = meal_id;
        this.meal_name = meal_name;
        this.user_id = user_id;
    }

    public int getMeal_id() {
        return meal_id;
    }
    public void setMeal_id(int meal_id) {
        this.meal_id = meal_id;
    }
    public String getMeal_name() {
        return meal_name;
    }
    public void setMeal_name(String meal_name) {
        this.meal_name = meal_name;
    }
    public int getUser_id() {
        return user_id;
    }
    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }
    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }

    @Override
    public String toString() {
        return "Meal{" +
                "meal_id=" + meal_id +
                ", meal_name='" + meal_name + '\'' +
                ", user_id='" + user_id + '\'' +
                '}';
    }

}

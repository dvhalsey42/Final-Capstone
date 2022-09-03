package com.techelevator.model;

import java.util.Arrays;

public class Recipe {

    private int recipe_id;
    private int user_id;
    private String recipe_name;
    private String[] instructions_list;
    private String[] categories;

    public Recipe() { }

    public Recipe(int recipe_id, int user_id, String recipe_name, String[] instructions_list, String[] categories) {
        this.recipe_id = recipe_id;
        this.user_id = user_id;
        this.recipe_name = recipe_name;
        this.instructions_list = instructions_list;
        this.categories = categories;
    }

    public int getRecipe_id() {
        return recipe_id;
    }
    public void setRecipe_id(int recipe_id) {
        this.recipe_id = recipe_id;
    }
    public int getUser_id() {
        return user_id;
    }
    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
    public String getRecipe_name() {
        return recipe_name;
    }
    public void setRecipe_name(String recipe_name) {
        this.recipe_name = recipe_name;
    }
    public String[] getInstructions_list() {
        return instructions_list;
    }
    public void setInstructions_list(String[] instructions_list) {
        this.instructions_list = instructions_list;
    }
    public String[] getCategories() {
        return categories;
    }
    public void setCategories(String[] categories) {
        this.categories = categories;
    }

    @Override
    public String toString() {
        return "Recipe{ " +
                "recipe_id=" + recipe_id +
                " user_id=" + user_id +
                " recipe_name=" + recipe_name +
                " instructions_list=" + Arrays.toString(instructions_list) +
                " categories=" + Arrays.toString(categories) + " }";
    }
}

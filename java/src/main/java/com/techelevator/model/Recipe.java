package com.techelevator.model;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

public class Recipe {

    private int recipe_id;
    @NotNull
    private int user_id;
    @NotBlank
    private String recipe_name;
    @NotBlank
    private String instructions_list;

    private List<Ingredient> ingredients;

    public Recipe() { }

    public Recipe(int recipe_id, int user_id, String recipe_name, String instructions_list) {
        this.recipe_id = recipe_id;
        this.user_id = user_id;
        this.recipe_name = recipe_name;
        this.instructions_list = instructions_list;
    }

    public Recipe(int recipe_id, int user_id, String recipe_name, String instructions_list, List<Ingredient> ingredients) {
        this.recipe_id = recipe_id;
        this.user_id = user_id;
        this.recipe_name = recipe_name;
        this.instructions_list = instructions_list;
        this.ingredients = ingredients;
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
    public String getInstructions_list() {
        return instructions_list;
    }
    public void setInstructions_list(String instructions_list) {
        this.instructions_list = instructions_list;
    }

    public List<Ingredient> getIngredients() { return this.ingredients; }
    public void setIngredients(List<Ingredient> ingredients) { this.ingredients = ingredients; }

    @Override
    public String toString() {
        return "Recipe{ " +
                "recipe_id=" + recipe_id +
                " user_id=" + user_id +
                " recipe_name=" + recipe_name +
                " instructions_list=" + instructions_list + " }";
    }


}

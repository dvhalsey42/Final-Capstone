package com.techelevator.model;

import javax.validation.constraints.NotNull;

public class Ingredient {

    private int ingredient_id;
    @NotNull
    private String ingredient_name;
    @NotNull
    private String category;

    public Ingredient() { }

    public Ingredient(int ingredient_id, String ingredient_name, String category) {
        this.ingredient_id = ingredient_id;
        this.ingredient_name = ingredient_name;
        this.category = category;
    }

    public int getIngredient_id() {
        return ingredient_id;
    }

    public void setIngredient_id(int ingredient_id) {
        this.ingredient_id = ingredient_id;
    }

    public String getIngredient_name() {
        return ingredient_name;
    }

    public void setIngredient_name(String ingredient_name) {
        this.ingredient_name = ingredient_name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Ingredient{" +
                "ingredient_id=" + ingredient_id +
                ", ingredient_name='" + ingredient_name + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}

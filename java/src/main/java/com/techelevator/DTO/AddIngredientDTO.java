package com.techelevator.DTO;

import com.techelevator.model.Ingredient;

import java.util.List;

public class AddIngredientDTO {

    private int userId;
    private int pantryId;
    private List<Ingredient> ingredients;

    public AddIngredientDTO() {};

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }




}

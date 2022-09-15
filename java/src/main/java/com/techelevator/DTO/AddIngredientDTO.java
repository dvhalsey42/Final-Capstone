package com.techelevator.DTO;

public class AddIngredientDTO {

    private int pantryId;
    private int ingredientId;

   public AddIngredientDTO() {};

    public int getPantryId() {
        return pantryId;
    }

    public void setPantryId(int pantryId) {
        this.pantryId = pantryId;
    }

    public int getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(int ingredientId) {
        this.ingredientId = ingredientId;
    }
}

package com.techelevator.model;

import java.util.List;

public class Pantry {

    private int pantry_id;
    private int user_id;

    List<Ingredient> ingredientList;

    public int getPantry_id() {
        return pantry_id;
    }

    public void setPantry_id(int pantry_id) {
        this.pantry_id = pantry_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public List<Ingredient> getIngredientList() {
        return ingredientList;
    }

    public void setIngredientList(List<Ingredient> ingredientList) {
        this.ingredientList = ingredientList;
    }

    public Pantry(){};

    public Pantry(int pantry_id, int user_id) {
        this.pantry_id = pantry_id;
        this.user_id = user_id;
    }


    @Override
    public String toString() {
        return "Pantry{" +
                "pantry_id=" + pantry_id +
                ", user_id=" + user_id +
                '}';
    }

}

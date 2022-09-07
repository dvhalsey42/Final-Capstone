package com.techelevator.model;

public class Pantry {

    private int pantry_id;
    private int user_id;

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

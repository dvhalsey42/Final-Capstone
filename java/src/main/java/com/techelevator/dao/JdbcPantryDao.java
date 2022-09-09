package com.techelevator.dao;

import com.techelevator.model.Ingredient;
import com.techelevator.model.Pantry;
import com.techelevator.model.User;
import io.jsonwebtoken.lang.Collections;
import com.techelevator.dao.JdbcIngredientDao;
import org.springframework.data.relational.core.sql.SQL;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import javax.sql.rowset.serial.SerialArray;
import javax.sql.rowset.serial.SerialException;
import javax.xml.transform.Result;
import java.io.*;
import java.sql.*;
import java.util.*;

@Service
public class JdbcPantryDao implements PantryDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcPantryDao(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }



    @Override
    public boolean createPantry(int userId){
        String sql = "INSERT INTO pantries (user_id) VALUES(?) RETURNING pantry_id";
        int pantryId=0;
        try {
            Connection conn = Objects.requireNonNull(jdbcTemplate.getDataSource()).getConnection();
            pantryId = jdbcTemplate.queryForObject(sql, int.class, userId);
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        return pantryId > 0;
    }

    @Override
    public Pantry getPantryByUserId(int userId){
        Pantry pantry = new Pantry();
        String sql = "SELECT * FROM pantries WHERE user_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            if (results.next()) {
                pantry = mapRowToPantry(results);
            }
        }catch(Exception e){
            System.err.println(e.getMessage());
        }

        return pantry;
    }

    @Override
    public List<Ingredient> getPantryIngredients(int pantryId) {
        List<Ingredient> ingredients = new ArrayList<>();
        String sql = "SELECT * FROM ingredients " +
                "JOIN pantries_ingredients USING ingredient_id" +
                "WHERE pantry_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, pantryId);
        while(results.next()){
            ingredients.add(mapRowToIngredient(results));
        }
        return ingredients;
    }

    @Override
    public boolean addIngredient(int pantryId, int ingredientId) {
        boolean isComplete = false;
        String sql = "INSERT INTO pantries_ingredients(pantry_id, ingredient_id) VALUES(?,?)";
        try {
            Connection conn = Objects.requireNonNull(jdbcTemplate.getDataSource()).getConnection();
            isComplete = jdbcTemplate.update(sql, pantryId, ingredientId) == 1;
        }catch (SQLException e) {
            System.err.println(e.getMessage());
        }

        return isComplete;
    }

    @Override
    public boolean deletePantryItem(int pantryId, int itemId) {
        String sql = "DELETE FROM pantries_ingredients WHERE pantry_id = ? AND ingredient_id = ?";
        jdbcTemplate.update(sql, pantryId, itemId);
        return true;
    }

    private Ingredient mapRowToIngredient(SqlRowSet rs) {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredient_id(rs.getInt("ingredient_id"));
        ingredient.setIngredient_name(rs.getString("ingredient_name"));
        ingredient.setCategory(rs.getString("category"));

        return ingredient;
    }

    private Pantry mapRowToPantry(SqlRowSet rs){
        Pantry pantry = new Pantry();
        pantry.setPantry_id(rs.getInt("pantry_id"));
        pantry.setUser_id(rs.getInt("user_id"));

        return pantry;
    }


}

package com.techelevator.dao;

import com.techelevator.model.Ingredient;
import com.techelevator.model.Pantry;
import com.techelevator.model.User;
import io.jsonwebtoken.lang.Collections;
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
    public List<Ingredient> getPantryIngredients() {
        return null;
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


}

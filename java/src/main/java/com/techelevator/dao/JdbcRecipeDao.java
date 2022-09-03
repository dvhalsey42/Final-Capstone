package com.techelevator.dao;

import com.techelevator.model.Recipe;
import io.jsonwebtoken.lang.Collections;
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
public class JdbcRecipeDao implements RecipeDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcRecipeDao(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public List<Recipe> getAllRecipes() {
        List<Recipe> recipes = new ArrayList<>();
        String sql = "SELECT * FROM recipes";
        try {
            Connection conn = Objects.requireNonNull(jdbcTemplate.getDataSource()).getConnection();
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                Recipe recipe = mapToRecipe(rs);
                recipes.add(recipe);
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }

        return recipes;
    }

    @Override
    public List<Recipe> getUserRecipes(int userId) {
        List<Recipe> recipes = new ArrayList<>();
        String sql = "SELECT * FROM recipes WHERE user_id = ?";
        try {
            Connection conn = Objects.requireNonNull(jdbcTemplate.getDataSource()).getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, String.valueOf(userId));
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Recipe recipe = mapToRecipe(rs);
                recipes.add(recipe);
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }

        return recipes;
    }

    private Recipe mapToRecipe(ResultSet rs) throws SQLException {
        Recipe recipe = new Recipe();
        recipe.setRecipe_id(rs.getInt("recipe_id"));
        recipe.setUser_id(rs.getInt("user_id"));
        recipe.setRecipe_name(rs.getString("recipe_name"));
        recipe.setInstructions_list(rs.getString("instructions_list"));

        return recipe;
    }
}

package com.techelevator.dao;

import com.techelevator.model.Ingredient;
import com.techelevator.model.Recipe;
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

    @Override
    public Recipe getRecipeByName(String name) {
        String sql = "SELECT * FROM recipes WHERE recipe_name = ?";
        return jdbcTemplate.queryForObject(sql, Recipe.class, name);
    }

    @Override
    public Recipe getRecipeById(int id) {
        String sql = "SELECT * FROM recipes WHERE recipe_id = ?";
        return jdbcTemplate.queryForObject(sql, Recipe.class, id);
    }


    @Override
    public boolean addNewRecipe(Recipe newRecipe) {

        String sqlForRecipesTable = "INSERT INTO recipes (user_id, recipe_name, instructions_list) VALUES (?,?,?) RETURNING recipe_id";
        String sqlForJoiner = "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?,?)";
        int recipe_id = 0;
        try {
            Connection conn = Objects.requireNonNull(jdbcTemplate.getDataSource()).getConnection();
            recipe_id = jdbcTemplate.queryForObject(sqlForRecipesTable, int.class, newRecipe.getUser_id(), newRecipe.getRecipe_name(), newRecipe.getInstructions_list());
            if (recipe_id > 0) {
                //basically make sure the recipe can even be added to database, then worry about adding ingredients to the recipe
                if (newRecipe.getIngredients() != null) {
                    Ingredient[] ingredients = newRecipe.getIngredients();
                    for (int i = 0; i < ingredients.length; i++) {
                        jdbcTemplate.update(sqlForJoiner, recipe_id, ingredients[i].getIngredient_id());
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }

        return recipe_id > 0;
    }

    @Override
    public boolean editRecipe(Recipe updatedRecipe) {
        if (getRecipeById(updatedRecipe.getRecipe_id()) != null) {
            //idk update everything, figure it out
        }
        return false;
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

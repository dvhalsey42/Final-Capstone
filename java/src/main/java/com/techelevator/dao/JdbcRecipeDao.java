package com.techelevator.dao;

import com.techelevator.model.Ingredient;
import com.techelevator.model.Recipe;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

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
        if (!recipeExists(id)) return null;
        String sql = "SELECT * FROM recipes WHERE recipe_id = ?";
        Recipe recipe = new Recipe();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, id);
        while (rs.next()) {
            recipe = mapToRecipe(rs);
        }

        sql = "SELECT * FROM recipe_ingredients WHERE recipe_id = ?";
        SqlRowSet ingRs = jdbcTemplate.queryForRowSet(sql, id);
        List<Ingredient> ingredients = new ArrayList<>();
        while (ingRs.next()) {
            ingredients.add(mapRowToIngredient(ingRs));
        }
        recipe.setIngredients(ingredients);
        return recipe;
    }


    @Override
    public Recipe addNewRecipe(Recipe newRecipe) {

        String sqlForRecipesTable = "INSERT INTO recipes (user_id, recipe_name, instructions_list) VALUES (?,?,?) RETURNING recipe_id";
        String sqlForJoiner = "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?,?)";
        int recipe_id = 0;
        try {
            Connection conn = Objects.requireNonNull(jdbcTemplate.getDataSource()).getConnection();
            recipe_id = jdbcTemplate.queryForObject(sqlForRecipesTable, int.class, newRecipe.getUser_id(), newRecipe.getRecipe_name(), newRecipe.getInstructions_list());
            if (recipe_id > 0) {
                //basically make sure the recipe can even be added to database, then worry about adding ingredients to the recipe
                if (newRecipe.getIngredients() != null) {
                    List<Ingredient> ingredients = newRecipe.getIngredients();
                    for (int i = 0; i < ingredients.size(); i++) {
                        jdbcTemplate.update(sqlForJoiner, recipe_id, ingredients.get(i).getIngredient_id());
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }

        newRecipe.setRecipe_id(recipe_id);

        return newRecipe;
    }

    @Override
    public boolean editRecipe(int id, Recipe updatedRecipe) {
        if (!recipeExists(id)) return false; // this is just in case the recipe does not exist

        String ingredientsSql = "SELECT * FROM recipe_ingredients " +
                "JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.ingredient_id " +
                "WHERE recipe_id = ?";

        List<Ingredient> ingredients = new ArrayList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(ingredientsSql, id);

        while (rs.next()) {
            Ingredient ingredient = mapRowToIngredient(rs);
            ingredients.add(ingredient);
        }

        String removerSql = "DELETE FROM recipe_ingredients WHERE recipe_id = ? AND ingredient_id = ?";
        for (int i = 0; i < updatedRecipe.getIngredients().size(); i++) {
            for (int a = 0; a < ingredients.size(); a++) {
                if (updatedRecipe.getIngredients().get(i).getIngredient_id() == ingredients.get(a).getIngredient_id()) {
                    // remove ingredient from database
                    jdbcTemplate.update(removerSql, id, updatedRecipe.getIngredients().get(i).getIngredient_id());
                }
            }
        }

        String sqlForJoiner = "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?,?)";
        for (Ingredient ingredient : updatedRecipe.getIngredients()) {
            jdbcTemplate.update(sqlForJoiner, id, ingredient.getIngredient_id());
        }

        String sql = "UPDATE recipes " +
                        "SET user_id = ?, recipe_name = ?, instructions_list = ? " +
                        "WHERE recipe_id = ?";

        jdbcTemplate.update(sql, updatedRecipe.getUser_id(), updatedRecipe.getRecipe_name(), updatedRecipe.getInstructions_list(), id);
        return true;
    }

    @Override
    public boolean addIngredientToRecipe(int recipe_id, Ingredient ingredient) {
        if (!recipeExists(recipe_id)) return false;

        String sql = "INSERT INTO recipe_ingredients (ingredient_id, recipe_id) VALUES (?,?)";
        jdbcTemplate.update(sql, ingredient.getIngredient_id(), recipe_id);
        return true;
    }

    @Override
    public boolean deleteRecipe(int id) { // TODO: IMPLEMENT ID CHECK SO USER CAN ONLY DELETE THEIR OWN RECIPES
        if (getRecipeById(id) == null) return false;
        String sql = "DELETE FROM recipe_ingredients WHERE recipe_id = ?";
        jdbcTemplate.update(sql, id);
        sql = "DELETE FROM meal_recipes WHERE recipe_id = ?";
        jdbcTemplate.update(sql, id);
        sql = "DELETE FROM recipes WHERE recipe_id = ?";
        jdbcTemplate.update(sql, id);
        return true;
    }

    public boolean recipeExists(int id) {
        String sql = "SELECT COUNT(1) FROM recipes WHERE recipe_id = ?";
        int i = jdbcTemplate.queryForObject(sql, int.class, id);
        return i>=1; // if there are 1 or more recipes with this id (shouldn't be possible but edge cases) then it exists!
    }

    public List<Ingredient> getIngredientsByRecipeId(int recipe_id) {
        String sql = "SELECT * FROM recipe_ingredients JOIN ingredients ON ingredients.ingredient_id = recipe_ingredients.ingredient_id WHERE recipe_id = ?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, recipe_id);
        List<Ingredient> ingredients = new ArrayList<>();
        while (rs.next()) {
            ingredients.add(mapRowToIngredient(rs));
        }

        return ingredients;
    }

    private Recipe mapToRecipe(ResultSet rs) throws SQLException {
        Recipe recipe = new Recipe();
        recipe.setRecipe_id(rs.getInt("recipe_id"));
        recipe.setUser_id(rs.getInt("user_id"));
        recipe.setRecipe_name(rs.getString("recipe_name"));
        recipe.setInstructions_list(rs.getString("instructions_list"));
        recipe.setIngredients(getIngredientsByRecipeId(rs.getInt("recipe_id")));
        return recipe;
    }

    public Recipe mapToRecipe(SqlRowSet rs) {
        Recipe recipe = new Recipe();
        recipe.setRecipe_id(rs.getInt("recipe_id"));
        recipe.setUser_id(rs.getInt("user_id"));
        recipe.setRecipe_name("recipe_name");
        recipe.setInstructions_list(rs.getString("instructions_list"));
        recipe.setIngredients(getIngredientsByRecipeId(rs.getInt("recipe_id")));

        return recipe;
    }

    private Ingredient mapRowToIngredient(SqlRowSet rs) {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredient_id(rs.getInt("ingredient_id"));
        ingredient.setIngredient_name(rs.getString("ingredient_name"));
        ingredient.setCategory(rs.getString("category"));

        return ingredient;
    }
}

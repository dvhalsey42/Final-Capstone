package com.techelevator.dao;

import com.techelevator.model.Ingredient;
import com.techelevator.model.Meal;
import com.techelevator.dao.MealDao;
import com.techelevator.model.Recipe;
import io.jsonwebtoken.lang.Collections;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import javax.naming.NoPermissionException;
import javax.sql.rowset.serial.SerialArray;
import javax.sql.rowset.serial.SerialException;
import javax.xml.transform.Result;
import java.io.*;
import java.sql.*;
import java.util.*;


@Service
public class JdbcMealDao implements MealDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcMealDao(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public List<Meal> getMyMeals(int userId) {
        List<Meal> meals = new ArrayList<Meal>();
        String sql = "SELECT * FROM meals WHERE user_id = ?";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while(results.next()){
                meals.add(mapRowToMeal(results));
            }
        }
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
        for (Meal meal : meals) {
            meal.setRecipes(getRecipesFromMealId(meal.getMeal_id()));
        }
        return meals;
    }

    public Meal getMealByMealId(int mealId){
        Meal meal = new Meal();
        String sql = "SELECT * FROM meals WHERE meal_id = ?";
        try{
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, mealId);
            if(results.next()){
                meal = mapRowToMeal(results);
            }
        }
        catch(Exception e){
            System.err.println(e.getMessage());
        }

        return meal;
    }

    @Override
    public boolean createMeal(Meal newMeal) {
        String sql = "INSERT INTO meals (user_id, meal_name) VALUES (?,?) RETURNING meal_id";
        int newMeal_id = 0;
        newMeal_id = jdbcTemplate.queryForObject(sql, int.class, newMeal.getUser_id(), newMeal.getMeal_name());

        String sqlAddRecipes = "INSERT INTO meal_recipes (meal_id, recipe_id) VALUES (?,?)";
        try {
            if (newMeal_id > 0 && newMeal.getRecipes().size() > 0) {
                for (Recipe recipe : newMeal.getRecipes()) {
                    jdbcTemplate.update(sqlAddRecipes, newMeal_id, recipe.getRecipe_id());
                }
            }
        } catch (NullPointerException e) {
            //user didn't include any recipes
        }

        return newMeal_id > 0;
    }

    @Override
    public boolean editMeal(int meal_id, Meal updatedMeal) {
        if (!mealExists(meal_id)) return false;

        String recipesSql = "SELECT * FROM meal_recipes " +
                "JOIN recipes ON recipes.recipe_id = meal_recipes.recipe_id " +
                "WHERE meal_id = ?";

        List<Recipe> recipes = new ArrayList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(recipesSql, meal_id);

        while (rs.next()) {
            Recipe recipe = mapRowToRecipe(rs);
            recipes.add(recipe);
        }

        String deleteSql = "DELETE FROM meal_recipes WHERE meal_id = ?";
        jdbcTemplate.update(deleteSql, meal_id);

//        String removeSql = "DELETE FROM meal_recipes WHERE recipe_id = ? AND meal_id = ?";
//        for (int i = 0; i < updatedMeal.getRecipes().size(); i++) {
//            for (int a = 0; a < recipes.size(); a++) {
//                if (updatedMeal.getRecipes().get(i).getRecipe_id() == recipes.get(a).getRecipe_id()) {
//                    jdbcTemplate.update(removeSql, updatedMeal.getRecipes().get(i).getRecipe_id(), meal_id);
//                }
//            }
//        }

        String sqlForJoiner = "INSERT INTO meal_recipes (meal_id, recipe_id) VALUES (?,?)";
        for (Recipe recipe : updatedMeal.getRecipes()) {
            jdbcTemplate.update(sqlForJoiner, meal_id, recipe.getRecipe_id());
        }

        String sql = "UPDATE meals " +
                "SET user_id = ?, meal_name = ?" +
                "WHERE meal_id = ?";
        jdbcTemplate.update(sql, updatedMeal.getUser_id(), updatedMeal.getMeal_name(), meal_id);
        return true;
    }

    @Override
    public boolean deleteMeal(int meal_id) {
        String sql = "DELETE FROM meal_recipes WHERE meal_id = ?";
        jdbcTemplate.update(sql, meal_id);
        sql = "DELETE FROM plan_meals WHERE meal_id =?";
        jdbcTemplate.update(sql, meal_id);
        sql = "DELETE FROM meals WHERE meal_id = ?";
        jdbcTemplate.update(sql, meal_id);
        return true;
    }

    @Override
    public boolean deleteRecipeInMeal(int meal_id, int recipe_id) {
        String sql = "DELETE FROM meal_recipes WHERE meal_id = ? AND recipe_id = ?";
        jdbcTemplate.update(sql, meal_id, recipe_id);
        return true;
    }

    private List<Recipe> getRecipesFromMealId(int meal_id) {
        String sql = "SELECT recipes.recipe_id, recipes.user_id, recipes.recipe_name, recipes.instructions_list FROM meals JOIN meal_recipes ON meals.meal_id = meal_recipes.meal_id JOIN recipes ON recipes.recipe_id = meal_recipes.recipe_id WHERE meals.meal_id = ?";
        List<Recipe> recipes = new ArrayList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, meal_id);
        while (rs.next()) {
            recipes.add(mapRowToRecipe(rs));
        }
        return recipes;
    }

    private boolean mealExists(int id) {
        String sql = "SELECT COUNT(1) FROM meals WHERE meal_id = ?";
        int i = jdbcTemplate.queryForObject(sql, int.class, id);
        return i>=1;
    }

    private Recipe mapRowToRecipe(SqlRowSet rs) {
        Recipe recipe = new Recipe();
        recipe.setRecipe_id(rs.getInt("recipe_id"));
        recipe.setUser_id(rs.getInt("user_id"));
        recipe.setRecipe_name(rs.getString("recipe_name"));
        recipe.setInstructions_list(rs.getString("instructions_list"));
        recipe.setIngredients(getIngredientsByRecipeId(rs.getInt("recipe_id")));

        return recipe;
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

    private Ingredient mapRowToIngredient(SqlRowSet rs) {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredient_id(rs.getInt("ingredient_id"));
        ingredient.setIngredient_name(rs.getString("ingredient_name"));
        ingredient.setCategory(rs.getString("category"));

        return ingredient;
    }

    private Meal mapRowToMeal(SqlRowSet rowSet){
        Meal meal = new Meal();
        meal.setMeal_id(rowSet.getInt("meal_id"));
        meal.setMeal_name(rowSet.getString("meal_name"));
        meal.setUser_id(rowSet.getInt("user_id"));

        return meal;
    }
}

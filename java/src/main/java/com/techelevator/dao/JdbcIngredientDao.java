package com.techelevator.dao;

import com.techelevator.model.Ingredient;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JdbcIngredientDao implements IngredientDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcIngredientDao(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }


    @Override
    public List<Ingredient> getIngredients() {
        List<Ingredient> ingredients = new ArrayList<>();
        String sql = "SELECT * FROM ingredients";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql);
        while (rs.next()) {
            Ingredient ingredient = mapRowToIngredient(rs);
            ingredients.add(ingredient);
        }

        return ingredients;
    }

    @Override
    public List<Ingredient> getIngredientByRecipe(int recipe_id) {
        List<Ingredient> ingredients = new ArrayList<>();
        String sql = "SELECT * FROM recipe_ingredients WHERE recipe_id = ?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, recipe_id);
        while (rs.next()) {
            Ingredient ingredient = mapRowToIngredient(rs);
            ingredients.add(ingredient);
        }
        return ingredients;
    }

    @Override
    public boolean createIngredient(Ingredient newIngredient) {
        String sql = "INSERT INTO ingredients (ingredient_name, category) " +
                "VALUES (?,?) RETURNING ingredient_id";
        Integer newIngredientId;
        try {
            newIngredientId = jdbcTemplate.queryForObject(sql, Integer.class, newIngredient.getIngredient_name(), newIngredient.getCategory());
        } catch (DataAccessException e) {
            return false;
        }

        return true;
    }

    @Override
    public Ingredient getIngredientById() {
        return null;
    }

    @Override
    public List<Ingredient> getIngredientsByCategory() {
        return null;
    }

    private Ingredient mapRowToIngredient(SqlRowSet rs) {
        Ingredient ingredient = new Ingredient();
        ingredient.setIngredient_id(rs.getInt("ingredient_id"));
        ingredient.setIngredient_name(rs.getString("ingredient_name"));
        ingredient.setCategory(rs.getString("category"));

        return ingredient;
    }
}

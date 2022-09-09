package com.techelevator.dao;

import com.techelevator.model.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class JdbcMealPlanDao implements MealPlanDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcMealPlanDao(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    @Override
    public boolean createMealPlan(MealPlan mealPlan) {
        String sql = "INSERT INTO meal_plans (user_id, meal_plan_name) VALUES (?,?) RETURNING plan_id";
        int newMealPlan_id = 0;
        newMealPlan_id = jdbcTemplate.queryForObject(sql, int.class, mealPlan.getUser_id(), mealPlan.getMeal_plan_name());

        String sqlAddMeals = "INSERT INTO plan_meals (plan_id, meal_id) VALUES (?,?)";
        if (newMealPlan_id > 0 && mealPlan.getMeals().size() > 0) {
            for (Meal meal : mealPlan.getMeals()) {
                jdbcTemplate.update(sqlAddMeals, newMealPlan_id, meal.getMeal_id());
            }
        }

        return newMealPlan_id > 0;
    }

    @Override
    public List<MealPlan> getUserMealPlans(int user_id) {
        String sql = "SELECT * FROM meal_plans WHERE user_id = ?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, user_id);
        List<MealPlan> mealPlans = new ArrayList<>();

        while (rs.next()) {
            MealPlan mealPlan = mapRowToMealPlan(rs);
            mealPlans.add(mealPlan);
        }
        return mealPlans;
    }

    public List<Meal> getMealsByPlanId(int plan_id) {
        String sql = "SELECT meals.meal_id, meals.user_id, meals.meal_name " +
                "FROM plan_meals JOIN meals ON plan_meals.meal_id = meals.meal_id " +
                "WHERE plan_id = ?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, plan_id);
        List<Meal> meals = new ArrayList<>();
        while (rs.next()) {
            meals.add(mapRowToMeal(rs));
        }

        return meals;
    }

    @Override
    public List<MealPlan> getAllMealPlans() {
        String sql = "SELECT * FROM meal_plans";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql);
        List<MealPlan> mealPlans = new ArrayList<>();

        while (rs.next()) {
            MealPlan mealPlan = mapRowToMealPlan(rs);
            mealPlans.add(mealPlan);
        }

        return mealPlans;
    }

    @Override
    public MealPlan getMealPlan(int mealPlan_id) {
        String sql = "SELECT * FROM meal_plans WHERE plan_id = ?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, mealPlan_id);
        MealPlan plan = new MealPlan();
        while (rs.next()) {
            plan = mapRowToMealPlan(rs);
        }
        return plan;
    }

    @Override
    public boolean editMealPlan(int mealPlan_id, MealPlan editedPlan) {
        if (!mealPlanExists(mealPlan_id)) return false;

        String mealsSql = "SELECT * FROM plan_meals JOIN meals ON meals.meal_id = plan_meals.meal_id WHERE plan_id = ?";
        List<Meal> knownMeals = new ArrayList<>();
        SqlRowSet rs = jdbcTemplate.queryForRowSet(mealsSql, mealPlan_id);

        while (rs.next()) {
            Meal meal = mapRowToMeal(rs);
            knownMeals.add(meal);
        }

        String removingSql = "DELETE FROM plan_meals WHERE plan_id = ? AND meal_id = ?";
        for (int i = 0; i < editedPlan.getMeals().size(); i++) {
            for (int a = 0; a < knownMeals.size(); a++) {
                if (editedPlan.getMeals().get(i).getMeal_id() == knownMeals.get(a).getMeal_id()) {
                    // remove meal from database
                    jdbcTemplate.update(removingSql, mealPlan_id, editedPlan.getMeals().get(i).getMeal_id());
                }
            }
        }

        String addNewMeals = "INSERT INTO plan_meals (plan_id, meal_id) VALUES (?,?)";
        for (Meal meal : editedPlan.getMeals()) {
            jdbcTemplate.update(addNewMeals, mealPlan_id, meal.getMeal_id());
        }

        String sql = "UPDATE meal_plans SET user_id = ?, meal_plan_name = ? WHERE plan_id = ?";
        jdbcTemplate.update(sql, editedPlan.getUser_id(), editedPlan.getMeal_plan_name(), mealPlan_id);
        return true;
    }

    @Override
    public boolean deleteMealPlan(int mealPlan_id) {
        String sql = "DELETE FROM plan_meals WHERE plan_id = ?";
        jdbcTemplate.update(sql, mealPlan_id);
        sql = "DELETE FROM meal_plans WHERE plan_id = ?";
        jdbcTemplate.update(sql, mealPlan_id);
        return true;
    }

    @Override
    public List<Ingredient> groceryList(int mealPlan_id, int user_id) {
        Pantry userPantry = getUserPantry(user_id);
        List<Ingredient> needed = new ArrayList<>();
        List<Ingredient> have = userPantry.getIngredientList();

        MealPlan mealPlan = getMealPlan(mealPlan_id);
        List<Meal> mealsFromPlan = mealPlan.getMeals();
        List<List<Recipe>> recipesFromMeals = new ArrayList<>();
        List<List<Ingredient>> ingredientsFromRecipes = new ArrayList<>();

        for (Meal meal : mealsFromPlan) {
            recipesFromMeals.add(getRecipesFromMealId(meal.getMeal_id()));
        }
        for (List<Recipe> recipeList : recipesFromMeals) {
            for (Recipe recipe : recipeList) {
                ingredientsFromRecipes.add(recipe.getIngredients());
            }
        }
        for (List<Ingredient> ingredientList : ingredientsFromRecipes) {
            needed.addAll(ingredientList);
        }
        List<Ingredient> updatedNeeded = new ArrayList<>();
        System.out.println("needed: " + needed);
        //compare with ingredients from user's pantry
//        needed.removeIf(have::contains);
        for (int i = 0; i < needed.size(); i++) {
            for (int a = 0; a < have.size(); a++) {
                if (needed.get(i).getIngredient_id() == have.get(a).getIngredient_id()) {
                    needed.get(i).setIngredient_id(0);
                }
            }
        }
        needed.removeIf(ingredient -> ingredient.getIngredient_id() == 0);
        System.out.println("have: " + have);

        return needed;
    }

    private boolean mealPlanExists(int plan_id) {
        String sql = "SELECT COUNT(1) FROM meal_plans WHERE plan_id = ?";
        int i = jdbcTemplate.queryForObject(sql, int.class, plan_id);
        return i>=1; // if there are 1 or more meal plans with this id, it exists
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

    private Recipe mapRowToRecipe(SqlRowSet rs) {
        Recipe recipe = new Recipe();
        recipe.setRecipe_id(rs.getInt("recipe_id"));
        recipe.setUser_id(rs.getInt("user_id"));
        recipe.setRecipe_name("recipe_name");
        recipe.setInstructions_list(rs.getString("instructions_list"));
        recipe.setIngredients(getIngredientsByRecipeId(rs.getInt("recipe_id")));

        return recipe;
    }

    private List<Ingredient> getIngredientsByRecipeId(int recipe_id) {
        String sql = "SELECT ingredients.ingredient_id, ingredients.ingredient_name, ingredients.category FROM recipe_ingredients JOIN ingredients ON ingredients.ingredient_id = recipe_ingredients.ingredient_id WHERE recipe_id = ?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, recipe_id);
        List<Ingredient> ingredients = new ArrayList<>();
        while (rs.next()) {
            ingredients.add(mapRowToIngredient(rs));
        }

        return ingredients;
    }

    private Pantry getUserPantry(int user_id) {
        String sql = "SELECT * FROM pantries WHERE user_id = ?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, user_id);
        Pantry pantry = new Pantry();
        while (rs.next()) {
            pantry = mapRowToPantry(rs);
        }

        return pantry;
    }

    private Pantry mapRowToPantry(SqlRowSet rs) {
        Pantry pantry = new Pantry();
        pantry.setPantry_id(rs.getInt("pantry_id"));
        pantry.setUser_id(rs.getInt("user_id"));
        pantry.setIngredientList(getPantryIngredients(rs.getInt("pantry_id")));

        return pantry;
    }

    private List<Ingredient> getPantryIngredients(int pantry_id) {
        String sql = "SELECT ingredients.ingredient_id, ingredients.ingredient_name, ingredients.category FROM pantries_ingredients JOIN ingredients ON ingredients.ingredient_id = pantries_ingredients.ingredient_id WHERE pantry_id = ?";
        SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, pantry_id);
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

    private MealPlan mapRowToMealPlan(SqlRowSet rs) {
        MealPlan mealPlan = new MealPlan();
        mealPlan.setPlan_id(rs.getInt("plan_id"));
        mealPlan.setMeal_plan_name(rs.getString("meal_plan_name"));
        mealPlan.setUser_id(rs.getInt("user_id"));

        mealPlan.setMeals(getMealsByPlanId(rs.getInt("plan_id")));
        return mealPlan;
    }

    private Meal mapRowToMeal(SqlRowSet rs) {
        Meal meal = new Meal();
        meal.setMeal_id(rs.getInt("meal_id"));
        meal.setUser_id(rs.getInt("user_id"));
        meal.setMeal_name(rs.getString("meal_name"));

        return meal;
    }
}

package com.techelevator.dao;

import com.techelevator.model.Meal;
import com.techelevator.dao.MealDao;
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
public class JdbcMealDao implements MealDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcMealDao(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }

    public List<Meal> getMyMeals(int userId) {
        List<Meal> meals = new ArrayList<Meal>();
        String sql = "SELECT * FROM Meal WHERE user_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while(results.next()){
                meals.add(mapRowToMeal(results));
            }
        }
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return meals;
    }

    public Meal getMealByMealId(int mealId){
        Meal meal = new Meal();
        String sql = "SELECT * FROM Meal WHERE meal_id = ?";
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

    private Meal mapRowToMeal(SqlRowSet rowSet){
        Meal meal = new Meal();
        meal.setMeal_id(rowSet.getInt("meal_id"));
        meal.setMeal_name(rowSet.getString("meal_name"));
        meal.setUser_id(rowSet.getInt("user_id"));

        return meal;
    }
}

package com.techelevator.controller;

import com.techelevator.DTO.AddIngredientDTO;
import com.techelevator.dao.PantryDao;
import com.techelevator.dao.RecipeDao;
import com.techelevator.model.Pantry;
import com.techelevator.model.Recipe;
import com.techelevator.model.Ingredient;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
public class PantryController {
    private PantryDao pantryDao;

    public PantryController(PantryDao pantryDao) {
        this.pantryDao = pantryDao;
    }

    @RequestMapping(path="/pantry/get/{userId}", method= RequestMethod.GET)
    public Pantry getPantryByUserId(@PathVariable int userId){return pantryDao.getPantryByUserId(userId);}

    //@PostMapping("/pantry/create")
    //public boolean createPantry(@Valid @RequestBody int userId){ return pantryDao.createPantry(userId); }

    @PostMapping("/pantry/add")
    public boolean addIngredient(@Valid @RequestBody AddIngredientDTO addIngredientDTO){return pantryDao.;}

    @PostMapping("/pantry/addIngredient/{userId}")
    public boolean addIngredientToPantry(@PathVariable int userId, @Valid @RequestBody Pantry pantry) {
        return pantryDao.addIngredientToPantry(userId, pantry);
    }

    @RequestMapping(path="/mypantry/{pantryId}", method= RequestMethod.GET)
    public List<Ingredient> getPantryIngredients(@PathVariable int pantryId){return pantryDao.getPantryIngredients(pantryId);}

    @DeleteMapping("/mypantry/delete")
    public boolean deletePantryItem(@PathVariable int pantryId, @PathVariable int itemId) {
        return pantryDao.deletePantryItem(pantryId, itemId);
    }

}
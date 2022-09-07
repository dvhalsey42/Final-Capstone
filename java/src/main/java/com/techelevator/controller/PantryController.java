package com.techelevator.controller;

import com.techelevator.dao.PantryDao;
import com.techelevator.dao.RecipeDao;
import com.techelevator.model.Pantry;
import com.techelevator.model.Recipe;
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

    @PostMapping("/pantry/create")
    public boolean createPantry(@Valid @RequestBody int userId){ return pantryDao.createPantry(userId); }

    

}
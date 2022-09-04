BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS seq_user_id;
DROP TABLE IF EXISTS plan_meals;
DROP TABLE IF EXISTS meal_recipes;
DROP TABLE IF EXISTS meals;
DROP TABLE IF EXISTS meal_plans;
DROP TABLE IF EXISTS recipe_ingredients;
DROP TABLE IF EXISTS pantries_ingredients;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS pantries;
DROP TABLE IF EXISTS recipes;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE recipes (
	recipe_id int GENERATED ALWAYS AS IDENTITY,
	user_id int NOT NULL,
	recipe_name varchar(50) NOT NULL,
	instructions_list text,
	PRIMARY KEY(recipe_id),
	CONSTRAINT fk_user
		FOREIGN KEY(user_id)
			REFERENCES users(user_id)
);

CREATE TABLE meals (
	meal_id int GENERATED ALWAYS AS IDENTITY,
	user_id int NOT NULL,
	meal_name varchar(100) NOT NULL,
	PRIMARY KEY(meal_id),
	CONSTRAINT fk_user
		FOREIGN KEY(user_id)
			REFERENCES users(user_id)
);
-- CHANGE MEAL_PLANS IN ACCORDANCE TO NICK'S WORDS --
CREATE TABLE meal_plans (
	plan_id int GENERATED ALWAYS AS IDENTITY,
	user_id int NOT NULL,
	PRIMARY KEY(plan_id),
	CONSTRAINT fk_user
		FOREIGN KEY(user_id)
			REFERENCES users(user_id)
);

CREATE TABLE plan_meals(
	plan_id int,
	meal_id int,
	CONSTRAINT fk_plan_id
		FOREIGN KEY(plan_id)
			REFERENCES meal_plans(plan_id),
	CONSTRAINT fk_meal_id
		FOREIGN KEY(meal_id)
			REFERENCES meals(meal_id)
);

CREATE TABLE ingredients(
	ingredient_id int GENERATED ALWAYS AS IDENTITY,
	ingredient_name varchar(100) NOT NULL,
	category varchar(100),
	PRIMARY KEY(ingredient_id)
);

CREATE TABLE recipe_ingredients(
	recipe_id int NOT NULL,
	ingredient_id int NOT NULL,
	CONSTRAINT fk_recipe_id
		FOREIGN KEY(recipe_id)
			REFERENCES recipes(recipe_id),
		FOREIGN KEY(ingredient_id)
			REFERENCES ingredients(ingredient_id)
);

CREATE TABLE meal_recipes(
	meal_id int,
	recipe_id int,
	CONSTRAINT fk_recipe_id
		FOREIGN KEY(recipe_id)
			REFERENCES recipes(recipe_id),
	CONSTRAINT fk_meal_id
		FOREIGN KEY(meal_id)
			REFERENCES meals(meal_id)
);

CREATE TABLE pantries(
	pantry_id int GENERATED ALWAYS AS IDENTITY,
	user_id int NOT NULL,
	PRIMARY KEY(pantry_id),
	CONSTRAINT fk_user
		FOREIGN KEY(user_id)
			REFERENCES users(user_id)
);

CREATE TABLE pantries_ingredients(
	pantry_id int NOT NULL,
	ingredient_id int NOT NULL,
	CONSTRAINT fk_pantry_id
		FOREIGN KEY(pantry_id)
			REFERENCES pantries(pantry_id),
	CONSTRAINT fk_ingredient_id
		FOREIGN KEY(ingredient_id)
			REFERENCES ingredients(ingredient_id)
);

INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');


COMMIT TRANSACTION;

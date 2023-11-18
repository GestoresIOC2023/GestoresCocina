-- MySQL database initialization
USE gestores;

-- Taula d'usuaris
CREATE TABLE  user (
    user_id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    profile_picture VARCHAR(250),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Taula de categoria
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);
CREATE TABLE recipe_category (
    recipe_id INT,
    category_id INT,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);
INSERT INTO category (category_name) VALUES ('vegetarian');
INSERT INTO category (category_name) VALUES ('glutenFree');
INSERT INTO category (category_name) VALUES ('dairyFree');
INSERT INTO category (category_name) VALUES ('veryHealthy');

-- Taula de recepta
CREATE TABLE recipe (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    cook_time INT,
    servings INT,
    recipe_picture VARCHAR(250),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id VARCHAR(50), 
    FOREIGN KEY (user_id) REFERENCES user(user_id) 
);

-- Taula intermèdia per a la relació entre recepte i categoria


-- Taula d'ingredient
CREATE TABLE ingredient (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_name VARCHAR(100) NOT NULL
);

-- Taula de relació entre recepte i ingredient
CREATE TABLE recipe_ingredient (
    recipe_id INT,
    ingredient_id INT,
    quantity VARCHAR(50),
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id)
);

-- Taula de favorit
CREATE TABLE favorite (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    recipe_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

-- Taula de puntuació
CREATE TABLE rating (
    user_id VARCHAR(50) NOT NULL,
    recipe_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    PRIMARY KEY (recipe_id, user_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);
CREATE TABLE shoppingList (
  user_id VARCHAR(50) NOT NULL,
  recipe_id INT NOT NULL,
  ingredient VARCHAR(200) NOT NULL,
  done BOOLEAN NOT NULL DEFAULT FALSE, 
  PRIMARY KEY (recipe_id, user_id, ingredient),
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Inserts en recipe
INSERT INTO recipe (title, cook_time, servings, recipe_picture, description, user_id) VALUES
('Spaghetti Bolognese', 40, 4, 'https://assets.unileversolutions.com/recipes-v2/236933.jpg', 'Cook spaghetti. Sauté onion and garlic, add ground beef. Mix in tomato sauce and simmer. Combine with spaghetti.', '1'),
('Chicken Curry', 30, 4, 'https://kitchenofdebjani.com/wp-content/uploads/2023/04/easy-indian-chicken-curry-Recipe-for-beginners-Debjanir-rannaghar.jpg', 'Marinate chicken in spices. Sauté onions, add chicken and cook. Add tomato paste and cream. Simmer until done.', '2'),
('Vegetable Stir Fry', 15, 2, 'https://natashaskitchen.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry-2.jpg', 'Stir-fry assorted veggies in oil. Add soy sauce and serve over rice.', '2'),
('Beef Stroganoff', 50, 4, 'https://www.recipetineats.com/wp-content/uploads/2018/01/Beef-Stroganoff_2-1-1.jpg', 'Cook beef strips. Make sauce with onions, mushrooms, and cream. Mix beef into sauce and serve over rice.', '3'),
('Caesar Salad', 10, 2, 'https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg', 'Mix lettuce, croutons, and grilled chicken. Add Caesar dressing and toss.', '4'),
('Chicken Alfredo', 35, 4, 'https://hips.hearstapps.com/hmg-prod/images/chicken-alfredo-index-64ee1026c82a9.jpg?crop=0.9994472084024323xw:1xh;center,top&resize=1200:*', 'Cook fettuccine. Make Alfredo sauce with cream and Parmesan. Add cooked chicken and combine with pasta.', '5'),
('Tacos', 20, 4, 'https://www.pequerecetas.com/wp-content/uploads/2020/10/tacos-mexicanos.jpg', 'Cook meat with spices. Serve in tortillas with toppings like lettuce, cheese, and salsa.', '7'),
('Fish Tacos', 30, 2, 'https://hips.hearstapps.com/hmg-prod/images/fish-tacos-index-64ca974954d47.jpg?crop=0.7503703703703705xw:1xh;center,top&resize=1200:*', 'Grill fish and flake it. Serve in tortillas with cabbage slaw and a creamy sauce.', '9'),
('Pancakes', 15, 4, 'https://blog.elamasadero.com/wp-content/uploads/receta_pancakes.jpg', 'Mix batter and ladle onto hot griddle. Flip when bubbly. Serve with syrup.', '6'),
('Apple Pie', 80, 8, 'https://hips.hearstapps.com/hmg-prod/images/apple-pie-index-6425bd0363f16.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*', 'Place apple filling into pie crust. Cover with second crust. Bake until golden.', '1'),
('Banana Bread', 60, 6, 'https://www.simplyrecipes.com/thmb/tR-5eHAZ3lgNR6Yvu3yxdHMNpk8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Easy-Banana-Bread-LEAD-2-2-63dd39af009945d58f5bf4c2ae8d6070.jpg', 'Mix mashed bananas, flour, sugar, and eggs. Pour into a loaf pan and bake.', '2'),
('Sushi Rolls', 40, 2, 'https://recetas.lidl.es/var/site/storage/images/_aliases/960x540/9/0/3/3/2933309-1-spa-ES/41e0bc67e300-receta-sushi-rolls-1440x495.jpg', 'Place rice on seaweed sheet, add fish and veggies. Roll tightly and slice.', '3'),
('Veggie Burger', 30, 4, 'https://i.ytimg.com/vi/a19EY3YNStA/maxresdefault.jpg', 'Mash beans and mix with veggies and spices. Form into patties and grill. Serve in buns.', '4'),
('Shrimp Scampi', 20, 2, 'https://static01.nyt.com/images/2022/06/02/dining/ShrimpScampi_thumb/ShrimpScampi_thumb-threeByTwoMediumAt2X.jpg', 'Sauté shrimp in garlic and oil. Add lemon juice and parsley. Serve over pasta.', '5'),
('Falafel Wrap', 25, 2, 'https://static.toiimg.com/thumb/62708678.cms?width=1200&height=900', 'Make falafel from chickpeas. Place in tortilla with tahini and veggies.', '6'),
('Mushroom Risotto', 40, 4, 'https://www.skinnytaste.com/wp-content/uploads/2009/10/Mushroom-Risotto_1-4.jpg', 'Sauté mushrooms, add rice. Slowly add broth, stirring constantly until creamy.', '5'),
('Pad Thai', 30, 4, 'https://www.justspices.es/media/recipe/Sazonador_Asia_Pad_thai-4-2.jpg', 'Stir-fry rice noodles with shrimp and tofu. Add peanuts and lime juice.', '4'),
('Chicken Marsala', 45, 4, 'https://hips.hearstapps.com/hmg-prod/images/del069923-chicken-marsala-001-index-6494afc775070.jpg?crop=0.889215806464795xw:1xh;center,top&resize=1200:*', 'Cook chicken and remove. Sauté mushrooms, add Marsala wine and return chicken to pan.', '9'),
('Lemon Bars', 45, 12, 'https://preppykitchen.com/wp-content/uploads/2020/02/Lemon-bars-1x1-2-500x500.jpg', 'Make crust and bake. Add lemon filling and bake again. Chill and slice.', '8'),
('Tomato Soup', 30, 4, 'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/tomato-soup-recipe.jpg', 'Sauté onions and garlic, add tomatoes and broth. Blend and serve.', '4');

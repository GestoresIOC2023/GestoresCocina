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
CREATE TABLE recipe_category (
    recipe_id INT,
    category_id INT,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

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
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    recipe_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
>>>>>>> main
);
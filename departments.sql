DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  price DECIMAL(5,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, product_name, price, stock_quantity)
VALUES ("101", "Choclate chip cookie", 2.50, 400), 
("102", "Raspberry cookie", 2.50, 120),
("103", "Peanut butter cookie", 3.00, 150),
("104", "Sugar snap cookie", 2.99, 500),
("105", "Girl Scout cookie", 8.00, 300),
("106", "Mint choclate chip", 1.99, 350);
("107", "Snickerdoodle", 1.50, 100);
("108", "Oatmeal raisin cookie" 1.99, 250);
("109", "Black and white cookie", 1.99, 120);
("110", "Shortbread", 2.25, 180);


       

SELECT * FROM products;
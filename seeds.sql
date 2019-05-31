drop database if exists bamazon;

create database bamazon;

use bamazon;



create table products(
	item_id integer not null auto_increment,
    product_name varchar(50),
    department_name varchar(50),
    price decimal(10, 2),
    stock_quantity integer not null,
    primary key (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("cookies", "snacks", 14.50, 19),
("crackers", "snacks", 3.50, 25),
("stereo", "electronics", 149.99, 154),
("fork", "housewares", 75.00, 400),
("canoe", "outdoors", 8.15, 2),
("couch", "furniture", 400, 35),
("television", "electronics", 198.49, 100),
("chips", "snacks", 3.50, 25),
("nintendo", "electronics", 750.00, 999),
("table", "furniture", 45.45, 37);





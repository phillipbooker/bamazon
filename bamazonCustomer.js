var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
	
    connection.query("SELECT * from products", function(err, result, fields){
		if(err) throw err;
        // console.log(result);

        console.log("List of items==============\n");

        var outRow = "";
        var item_codes = [];

        result.forEach(row => {
            fields.forEach(col => {
                if(col.name === "item_id"){
                    item_codes.push(parseInt(row[col.name]));
                }
                outRow += col.name + ": " + row[col.name] + "\t";
            });
            outRow += "\n";
        });

        console.log(outRow);

        // Prompts for customer
        inquirer.prompt([
            {
                type: "list",
                name: "itemId",
                message: "What is the ID of the item you would like to purchase?",
                choices: item_codes
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to buy?"
            }
        ]).then(function(inventory) {
            console.log("ID number selected: " + inventory.itemId);
            console.log("Items to purchase: " + inventory.quantity);

            if(!isNaN(inventory.quantity) && (inventory.quantity > 0)){
                connection.query("SELECT * from products WHERE item_id = ?", [inventory.itemId], function(err, results, fields){
                    if(err) throw err;
    
                    var stock = results[0].stock_quantity;
                    var new_quantity = stock - inventory.quantity;
                    var total = inventory.quantity * results[0].price;
    
                    
    
                    if(new_quantity < 0){
                        console.log("Not enough in stock!");
                        connection.end();
                    } else{
                        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [new_quantity, inventory.itemId], function(err, result, fields){
                            console.log("Transaction total = " + total.toFixed(2));
                            connection.end();
                        });
                    }
    
                    // connection.end();
                });
            } else{
                console.log("Please enter a number greater than 0!");
                connection.end();
            }

            

        });

        // connection.end();
    });

    
});


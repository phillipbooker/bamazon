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
	
    connection.query("SELECT * from products", function(err, result){
		if(err) throw err;
        console.log(result);

        // Prompts for customer
        inquirer.prompt([
            {
                type: "list",
                name: "itemId",
                message: "What is the ID of the item you would like to purchase?",
                //sub for actual array of id numbers
                choices: [1, 2, 3]
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to buy?"
            }
        ]).then(function(inventory) {
            console.log("ID number selected: " + inventory.itemId);
            console.log("Items to purchase: " + inventory.quantity);
        });

        connection.end();
    });

    
});


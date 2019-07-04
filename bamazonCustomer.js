var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "abcd1234",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // console.log("Connected as item_id " + connection.threadId)
    displayProducts();

});

// variable for the selected item
var choices = [];

function displayProducts() {
    var query = connection.query("Select * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Product Name: " + res[i].product_name);
            console.log("Item Id: " + res[i].item_id);
            console.log("Price: " + res[i].price);
            console.log("Stock Quantity: " + res[i].stock_quantity);
            console.log("--------------------------------------")
            choices.push(res[i].item_id);
        }
        purchasePrompt();
    });
}

function purchasePrompt() {
    // prompt for info about the item wanting to purchse

    inquirer
        .prompt([{
                name: "item_id",
                type: "list",
                message: "Please select your choices.",
                choices: choices

            },
            {
                name: "Quantity",
                type: "input",
                message: "How many units would you like?",
                validate: function(value) {

                    // enter the input vaule as an integer
                    if ((isNaN(value) === false) && (value > 0) && (value % 1 === 0)) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            // query the database for all items selected
            var query = connection.query("Select * FROM products WHERE ?", { item_id: answer.item_id }, function(err, res) {
                if (err) throw err;
                console.log("Your item(s) has been added to the bag!")
                    // console.log(res);
                    // print the quantity the user want to purchase
                orderPlaced(res[0], answer.Quantity);

            })
        });
}

// create a new function with the selected item and the quantity as the parameters to check the stock quantity
function orderPlaced(product, Quantity) {
    if (Quantity > product.stock_quantity) {
        console.log("Insufficient quantity! Sorry, we do not have enough " + product.product_name + "to complete your order.")
    } else {
        updateProduct();
        var totalCost = product.price * Quantity
        console.log("Your total cost for " + Quantity + " units of " + product.product_name + " is " + totalCost + " Thank you!");
        // update the stock quantity for the item purchased 
        connection.query(
            "UPDATE products SET ? WHERE ?", [{
                stock_quantity: product.stock_quantity - Quantity
            }, {
                item_id: product.item_id
            }]
        )
    };
}

function updateProduct() {

};
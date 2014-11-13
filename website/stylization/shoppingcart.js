function $id(id) { return document.getElementById(id); } // Shorthands
function $tag(id) { return document.getElementsByTagName(id); }

var table = $id('shopping-cart-table'); // Get the table from HTML used to display shopping cart

// Get message element where error and confirmation messages are displayed
var messageElement = $id("display-message");
var messageText = document.createTextNode("");
messageElement.appendChild(messageText);

// Misc. variables
var PRODUCT_MAX_AMOUNT = 10; // Max amount pr. products
var identifier = "WEBTEKBOARD"; // Identifier for the session storage
var numberOfItemsInCart = 0; // Variable that holds number of distinct items in cart

// TODO Prevent this: javascript:sessionStorage.setItem("WEBTEKBOARD:Testspill", "Testspill,2");

for (var name in sessionStorage) { // Iterate all items in sessionStorage

    // Add valid items to shopping cart with picture, name and amount
    if (name.substring(0, identifier.length) == identifier) {
        var product = sessionStorage.getItem(name).split(",");

        var tableRow = document.createElement("tr");
        var tableData1 = document.createElement("td");
        var tableData2 = document.createElement("td");
        var tableData3 = document.createElement("td");
        tableRow.appendChild(tableData1);
        tableRow.appendChild(tableData2);
        tableRow.appendChild(tableData3);

        var image = document.createElement("img");
        image.src = "../images/agameofthrones.jpg"; // TODO Get correct image path for every product
        image.title = getProductName(product);
        tableData1.appendChild(image);

        var text = document.createTextNode(getProductName(product));
        tableData2.className = "name-column";
        tableData2.appendChild(text);

        var itemAmount = document.createElement("input");
        itemAmount.type = "text";
        itemAmount.id = "amount";
        itemAmount.name = getProductName(product);
        itemAmount.size = 10;
        itemAmount.value = getProductAmount(product);
        tableData3.appendChild(itemAmount);

        table.appendChild(tableRow);

        numberOfItemsInCart++; // Advance number of items in cart by 1
    }
}

isCartEmpty(); // Check if cart is empty

function getProductName(product) {
    return product[0];
}

function getProductAmount(product) {
    return product[1];
}

// If shopping cart is empty, display message
function isCartEmpty() {
    if (numberOfItemsInCart == 0) {
        printMessage("Shopping cart is empty.", "black");
    }
}

function printMessage(msg, color) {
    messageElement.style.color = color;
    messageText.nodeValue = msg;
}

function clearMessage() {
    messageText.nodeValue = "";
}

function rowsValid() {
    var rows = table.getElementsByTagName('tr'); // Get todo list
    var rowCount = rows.length;
    var isValid = true;

    for (i = 0; i < rowCount; i++) { // Go through todo's and see if checkbox is checked
        var row = rows[i]
        var amount = row.getElementsByTagName('input')[0];

        if (isNaN(amount.value)) { // Amount not a number
            printMessage("Product amount must be a number.", "red");
            isValid = false;
            break;
        }
        else if (amount.value < 0) { // Amount smaller than zero
            printMessage("Product amount must be greater than 0.", "red");
            isValid = false;
            break;
        }
        else if (amount.value > PRODUCT_MAX_AMOUNT) { // Amount higher than max amount
            printMessage("Maximum product amount is " + PRODUCT_MAX_AMOUNT + ".", "red");
            isValid = false;
            break;
        }
    }
    if (isValid) {
        clearMessage();
    }
    return isValid;
}

function updateRows() {
    if (numberOfItemsInCart > 0) {
        var rows = table.getElementsByTagName('tr'); // Get todo list
        var rowCount = rows.length;

        for (i = 0; i < rowCount; i++) { // Go through todo's and see if checkbox is checked
            var row = rows[i]
            var amount = row.getElementsByTagName('input')[0];

            if (amount.value == 0) {
                sessionStorage.removeItem(identifier + ":" + amount.name); // Remove from sessionStorage
                table.removeChild(row); // Remove row from table
                numberOfItemsInCart--; // Reduce number of items in cart
                i--; // Reduce for loop count, to prevent out of bounds error
                rowCount--; // Reduce row count, to prevent out of bounds error
                printMessage("Product was removed.", "green");
            }
            else {
                sessionStorage.setItem((identifier + ":" + amount.name), (amount.name + "," + amount.value));
                printMessage("Product amount was changed.", "green");
            }
        }
        isCartEmpty(); // Run a check to see if shopping cart has been emptied.
    }
}

// Event listeners
var updateButton = $id('update-button');
updateButton.addEventListener('click', function() { // Listeners for the buttons
    if (rowsValid()) { // Check if rows are valid
        updateRows(); // Update rows
    }
})

var checkoutButton = $id('checkout-button');
checkoutButton.addEventListener('click', function() { // Listeners for the buttons
    if (rowsValid()) { // Check if rows are valid
        alert("Thank you! Your order will be shipped as soon as possible.");
    }
    else {
        alert("Please correct errors before checking out.")
    }
})

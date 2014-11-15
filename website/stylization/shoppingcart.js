function $id(id) { return document.getElementById(id); } // Shorthands
function $tag(id) { return document.getElementsByTagName(id); }

var table = $id('shopping-cart-table'); // Get the table from HTML used to display shopping cart

// Get message element to display error and confirmation messages
var messageElement = $id("display-message");
var messageText = document.createTextNode("");
messageElement.appendChild(messageText);

// Misc. variables
var PRODUCT_MAX_AMOUNT = 10; // Max amount pr. products
var identifier = "WEBTEKBOARD"; // Identifier for the session storage
var numberOfItemsInCart = 0; // Variable that holds number of distinct items in cart
var totalSum = 0;

// TODO javascript:sessionStorage.setItem("WEBTEKBOARD:Testspill", "Testspill,2");

// Populate shopping cart from sessionStorage
for (var name in sessionStorage) { // Iterate all items in sessionStorage

    // Add valid items to shopping cart with picture, name, amount and price
    if (name.substring(0, identifier.length) == identifier) {
        var product = sessionStorage.getItem(name).split(",");

        var tableRow = document.createElement("tr");
        var tableData1 = document.createElement("td");
        var tableData2 = document.createElement("td");
        var tableData3 = document.createElement("td");
        var tableData4 = document.createElement("td");
        tableRow.appendChild(tableData1);
        tableRow.appendChild(tableData2);
        tableRow.appendChild(tableData3);
        tableRow.appendChild(tableData4);

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

        var price = document.createTextNode("");
        var productSum = getProductAmount(product) * getProductPrice(product);
        totalSum += productSum;
        price.nodeValue = productSum + ",-";
        tableData4.appendChild(price);

        table.appendChild(tableRow); // Finally, add tablerow to table
        numberOfItemsInCart++; // Advance number of items in cart by 1
    }
}

if (! isCartEmpty()) {
    var tableRow = document.createElement("tr");
    var tableData1 = document.createElement("td");
    var tableData2 = document.createElement("td");
    var tableData3 = document.createElement("td");
    var tableData4 = document.createElement("td");
    tableRow.appendChild(tableData1);
    tableRow.appendChild(tableData2);
    tableRow.appendChild(tableData3);
    tableRow.appendChild(tableData4);

    var totalSumText = document.createElement("b");
    var totalSumTextNode = document.createTextNode("Total:");
    totalSumText.appendChild(totalSumTextNode);
    tableData3.appendChild(totalSumText);

    var totalSumElement = document.createElement("b");
    var totalSumNode = document.createTextNode(totalSum + ",-");
    totalSumElement.appendChild(totalSumNode);
    tableData4.appendChild(totalSumElement);

    table.appendChild(tableRow);
}

function getProductName(product) {
    return product[0];
}

function getProductAmount(product) {
    return product[1];
}

function getProductPrice(product) {
    return 499; // TODO Get product price from XML
}

// If shopping cart is empty, display message
function isCartEmpty() {
    if (numberOfItemsInCart == 0) {
        printMessage("Shopping cart is empty.", "black");
        return true;
    }
    return false;
}

function printMessage(msg, color) {
    messageElement.style.color = color;
    messageText.nodeValue = msg;
}

function clearMessage() {
    messageText.nodeValue = "";
}

function rowsValid() {
    var rows = table.getElementsByTagName('tr');
    var rowCount = rows.length - 1; // Exclude last row, which contains sum etc.
    var isValid = true;

    for (i = 0; i < rowCount; i++) {
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

function updateRows() { // Update rows in shopping cart
    if (numberOfItemsInCart > 0) {
        var rows = table.getElementsByTagName('tr');
        var rowCount = rows.length - 1; // Exclude last row, which contains sum etc.

        for (i = 0; i < rowCount; i++) {
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

        if (! isCartEmpty()) {
            updatePrices();
        }
    }
}

function updatePrices() { // Update product prices and total sum
    totalSum = 0; // Reset total sum
    var rows = table.getElementsByTagName('tr');
    var rowCount = rows.length; // Exclude last row, which contains sum etc.

    for (i = 0; i < rowCount - 1; i++) { // Iterate through rows, except last row, which displays total sum
        var row = rows[i]
        var amount = row.getElementsByTagName('input')[0];
        var product = [row.getElementsByTagName('td')[1].childNodes[0].nodeValue, amount.value];
        var productSumNode = row.getElementsByTagName('td')[3].childNodes[0];

        var productSumNew = getProductAmount(product) * getProductPrice(product); // Calculate product sum
        totalSum += productSumNew; // Update total sum

        productSumNode.nodeValue = productSumNew + ",-";
    }

    var totalRow = rows[rowCount - 1]; // Get last row
    var totalSumNodeNew = totalRow.getElementsByTagName('td')[3].getElementsByTagName('b')[0].childNodes[0]; // Get total sum node
    totalSumNodeNew.nodeValue = totalSum + ",-"; // Update total sum
}

// Event listeners
var updateButton = $id('update-button'); // Get button element from HTML
updateButton.addEventListener('click', function() { // Listener for update button
    if (rowsValid()) { // Check if rows are valid
        updateRows(); // Update rows
    }
})

var checkoutButton = $id('checkout-button'); // Get button element from HTML
checkoutButton.addEventListener('click', function() { // Listener for checkout button
    if (rowsValid()) { // Check if rows are valid
        alert("Thank you! Your order will be shipped as soon as possible.");
    }
    else {
        alert("Please correct errors before checking out.")
    }
})

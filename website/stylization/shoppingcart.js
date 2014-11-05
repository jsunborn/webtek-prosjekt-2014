function $id(id) { return document.getElementById(id); } // Shorthand for getElementById
function $tag(id) { return document.getElementsByTagName(id); }

var table = $id('shopping-cart-table');

var PRODUCT_MAX_AMOUNT = 10;
var numberOfItemsInCart = 0;

var messageElement = $id("display-message");
var messageText = document.createTextNode("");
messageElement.appendChild(messageText);

for (var name in sessionStorage) { // Iterate all stored names

    if (name.substring(0, 12) == "WEBTEKBOARD:") {
        var product = sessionStorage.getItem(name).split(",");

        var tableRow = document.createElement("tr");
        var tableData1 = document.createElement("td");
        var tableData2 = document.createElement("td");
        tableRow.appendChild(tableData1);
        tableRow.appendChild(tableData2);
        tableData1.className = "name-column";

        var text = document.createTextNode(product[0]);
        tableData1.appendChild(text);

        var itemAmount = document.createElement("input");
        itemAmount.type = "text";
        itemAmount.id = "amount";
        itemAmount.name = product[0];
        itemAmount.size = 10;
        itemAmount.value = product[1];
        tableData2.appendChild(itemAmount);



        table.appendChild(tableRow);

        numberOfItemsInCart++;
    }
}

isCartEmpty(); // Check if cart is empty

// Event listeners
var updateButton = $id('update-button');
updateButton.addEventListener('click', function() { // Listeners for the buttons
    if (rowsValid()) { // Check if rows are valid
        updateRows(); // Update rows
    }
})

// If shopping cart is empty, display message
function isCartEmpty() {
    if (numberOfItemsInCart == 0) {
        printMessage("Handlekurven er tom.", "black");
    }
}

function printMessage(msg, color) {
    messageElement.style.color = color;
    messageText.nodeValue = msg;
}

function rowsValid() {
    if (numberOfItemsInCart > 0) {
        var rows = table.getElementsByTagName('tr'); // Get todo list
        var rowCount = rows.length;
        var valid = true;

        for (i = 0; i < rowCount; i++) { // Go through todo's and see if checkbox is checked
            var row = rows[i]
            var amount = row.getElementsByTagName('input')[0];

            if (isNaN(amount.value)) { // Amount not a number
                printMessage("Antall varer må være en tallverdi.", "red");
                valid = false;
                break;
            }
            else if (amount.value < 0) { // Amount smaller than zero
                printMessage("Antall varer må være større enn 0.", "red");
                valid = false;
                break;
            }
            else if (amount.value > PRODUCT_MAX_AMOUNT) { // Amount higher than max amount
                printMessage("Maks antall varer er " + PRODUCT_MAX_AMOUNT + ".", "red");
                valid = false;
                break;
            }
        }
        return valid;
    }
}

function updateRows() {
    if (numberOfItemsInCart > 0) {
        var rows = table.getElementsByTagName('tr'); // Get todo list
        var rowCount = rows.length;

        for (i = 0; i < rowCount; i++) { // Go through todo's and see if checkbox is checked
            var row = rows[i]
            var amount = row.getElementsByTagName('input')[0];

            if (amount.value == 0) {
                sessionStorage.removeItem(amount.name); // Remove from sessionStorage
                table.removeChild(row); // Remove row from table
                numberOfItemsInCart--; // Reduce number of items in cart
                printMessage("Produktet ble fjernet.", "green");
            }
            else {
                sessionStorage.setItem(("WEBTEKBOARD:" + amount.name), (amount.name + "," + amount.value));
                printMessage("Antall varer ble oppdatert.", "green");
            }
        }
        isCartEmpty(); // Run a check to see if shopping cart has been emptied.
    }
}

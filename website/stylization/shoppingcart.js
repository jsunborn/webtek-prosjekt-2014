function $id(id) { return document.getElementById(id); } // Shorthand for getElementById
function $tag(id) { return document.getElementsByTagName(id); }

var table = $id('shoppingcart');

sessionStorage.WEBTEKBOARDnavnpåspill = "navnpåspill,99";

var numberOfItemsInCart = 0;
var errorMessageElement = document.createElement("p");
var errorText = document.createTextNode("");
errorMessageElement.appendChild(errorText);
errorMessageElement.className = "error-msg";
table.appendChild(errorMessageElement);

for (var name in sessionStorage) { // Iterate all stored names

    if (name.substring(0, 11) == "WEBTEKBOARD") {
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
    updateRows();
})

// If shopping cart is empty, display message
function isCartEmpty() {
    if (numberOfItemsInCart == 0) {
        printError("Handlekurven er tom.")
    }
}

function printError(msg) {
    errorText.nodeValue = msg;

    // TODO: Fix error message displaying multiple times
}

function clearError() {
    errorText.nodeValue = null;
}

function updateRows() {
    if (numberOfItemsInCart > 0) {
        var rows = table.getElementsByTagName('tr'); // Get todo list
        var rowCount = rows.length;

        for (i = 0; i < rowCount; i++) { // Go through todo's and see if checkbox is checked
            var row = rows[i]
            var amount = row.getElementsByTagName('input')[0];

            if (isNaN(amount.value)) {
                printError("Vennligst skriv inn tallverdi");
            }
            else if (amount.value == 0) {
                sessionStorage.removeItem(amount.name);
                table.removeChild(row); // If checked, remove this todo
                numberOfItemsInCart--; // Reduce number of items in cart
                clearError(); // Clear errors (if any)
            }
            else if (amount.value > 0) {
                sessionStorage.setItem(("WEBTEKBOARD" + amount.name), (amount.name + "," + amount.value));
                clearError();
            }
            else {
                printError("Antall må være positiv!");
            }
        }
        isCartEmpty();
    }
}

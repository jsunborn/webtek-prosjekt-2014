function $id(id) { return document.getElementById(id); } // Shorthands
function $tag(id) { return document.getElementsByTagName(id); }

var table = $id('shopping-cart-table'); // Get the table from HTML used to display shopping cart

// Get message element to display error and confirmation messages
var messageElement = $id("display-message");
var messageText = document.createTextNode("");
messageElement.appendChild(messageText);

// Misc. variables
var identifier = "WEBTEKBOARD"; // Identifier for the session storage
var numberOfItemsInCart = 0; // Variable that holds number of distinct items in cart
var totalSum = 0;

// Populate shopping cart from sessionStorage
for (var name in sessionStorage) { // Iterate all items in sessionStorage

    // Add valid items to shopping cart with picture, name, amount and price
    if (name.substring(0, identifier.length) == identifier) {
        var product = sessionStorage.getItem(name).split(","); // Split string by commas

        if (isProductValid(product)) { // Check if product is valid
            var tableRow = document.createElement("tr");
            var tableData1 = document.createElement("td");
            var tableData2 = document.createElement("td");
            var tableData3 = document.createElement("td");
            var tableData4 = document.createElement("td");
            tableRow.appendChild(tableData1);
            tableRow.appendChild(tableData2);
            tableRow.appendChild(tableData3);
            tableRow.appendChild(tableData4);

            var imageLink = document.createElement("a");
            imageLink.href = getProductLink(product);
            var image = document.createElement("img");
            image.src = getProductImagePath(product);
            image.title = getProductName(product);
            imageLink.appendChild(image);
            tableData1.appendChild(imageLink);

            var textLink = document.createElement("a");
            textLink.href = getProductLink(product);
            var textNode = document.createTextNode(getProductName(product));
            tableData2.className = "name-column";
            textLink.appendChild(textNode)
            tableData2.appendChild(textLink);

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

function getProductImagePath(product) {
    var filetypes = ["jpg", "png"]; // Approved product image formats
    for (var i = 0; i < filetypes.length; i++) {
        if (UrlExists("../images/" + product[2] + "." + filetypes[i])) { // Does file exist?
            return "../images/" + product[2] + "." + filetypes[i]; // If yes, return path
        }
    }
    return "../images/notfound.png"; // If product image was not found, return "not found" image
}

function getProductLink(product) {
    return "../products/" + product[2] + ".html";
}

function getProductPrice(product) {
    var payment_info = loadXMLDoc("../product-info/payment_info.xml"); // Load product information from XML
    var productsNamesFromXML = payment_info.getElementsByTagName("name"); // Get all product names

    for(var i = 0; i < productsNamesFromXML.length; i++) { // Loop through names
        if ((productsNamesFromXML[i].textContent || productsNamesFromXML[i].innerText) == getProductName(product)) { // Check if name corresponds to this product
            return productsNamesFromXML[i].parentNode.getElementsByTagName("price")[0].textContent
            || productsNamesFromXML[i].parentNode.getElementsByTagName("price")[0].innerText; // Get parent element (product) and get the content of it's child element, price
        }
    }
}

// If shopping cart is empty, display message
function isCartEmpty() {
    if (numberOfItemsInCart == 0) {
        printMessage("Shopping cart is empty.", "black");
        if (table.getElementsByTagName("tr")[0]) { // Remove total sum row if exists
            table.removeChild(table.getElementsByTagName("tr")[0]);
        }
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

    for (var i = 0; i < rowCount; i++) {
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
    }
    if (isValid) {
        clearMessage();
    }
    return isValid;
}

function updateRows() { // Update rows in shopping cart
    if (numberOfItemsInCart > 0) {
        var rows = table.getElementsByTagName('tr');
        var rowCount = rows.length;

        for (var i = 0; i < rowCount - 1; i++) { // Iterate rows except last row, which contains sum etc.
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
                var oldSession = sessionStorage.getItem(identifier + ":" + amount.name).split(",");
                sessionStorage.setItem((identifier + ":" + amount.name), (amount.name + "," + amount.value + "," + oldSession[2]));
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

    for (var i = 0; i < rowCount - 1; i++) { // Iterate through rows, except last row, which displays total sum
        var row = rows[i];
        var amount = row.getElementsByTagName('input')[0];
        var product = [row.getElementsByTagName('a')[1].childNodes[0].nodeValue, amount.value];
        var productSumNode = row.getElementsByTagName('td')[3].childNodes[0];

        var productSumNew = getProductAmount(product) * getProductPrice(product); // Calculate product sum
        totalSum += productSumNew; // Update total sum

        productSumNode.nodeValue = productSumNew + ",-";
    }

    var totalRow = rows[rowCount - 1]; // Get last row
    var totalSumNodeNew = totalRow.getElementsByTagName('td')[3].getElementsByTagName('b')[0].childNodes[0]; // Get total sum node
    totalSumNodeNew.nodeValue = totalSum + ",-"; // Update total sum
}

function isProductValid(product) {
    var payment_info = loadXMLDoc("../product-info/payment_info.xml");
    var productsNamesFromXML = payment_info.getElementsByTagName("name");

    for(var i = 0; i < productsNamesFromXML.length; i++) {
        if ((productsNamesFromXML[i].textContent || productsNamesFromXML[i].innerText) == getProductName(product)) {
            return true;
        }
    }
    return false;
}

function loadXMLDoc(filename) { // Function for opening XML-file and retrieve it's contents
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp=new XMLHttpRequest();
    }
    else { // IE5 and IE6
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",filename,false);
    xhttp.send();
    return xhttp.responseXML;
}

function UrlExists(url) // Checks if url returns 404-error or not
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

function isFormValid() {
    var errors = [];

    var name = $id('form-name');
    var postal = $id('form-postal');
    var city = $id('form-city');
    var phone = $id('form-phone');
    var email = $id('form-email');
    var email2 = $id('form-email2');
    var accept = $id('form-accept');

    if (name.value.match(/\d+/g)) {
        name.className = "redborder";
        errors.push("Name cannot contain numbers");
    }
    var split_name = name.value.split(" "); // Split full name on spaces, to find how many there are
    if (split_name.length < 2) { // Full name has to contain at least two names (firstname and lastname)
        name.className = "redborder";
        errors.push("Name has contain both given name and surname");
    }
    if (isNaN(postal.value) || postal.value < 0) {
        postal.className = "redborder";
        errors.push("Postal code should be a number between 0 and 9999");
    }
    if (city.value.match(/\d+/g)) {
        city.className = "redborder";
        errors.push("City cannot contain numbers");
    }
    if (isNaN(phone.value)) {
        phone.className = "redborder";
        errors.push("Phone number should only consist of numbers");
    }
    if (!email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        email.className = "redborder";
        errors.push("E-mail is invalid");
    }
    if (!email2.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        email2.className = "redborder";
        errors.push("Verify e-mail is invalid");
    }
    if (!(email.value == email2.value)) {
        email.className = "redborder";
        email2.className = "redborder";
        errors.push("E-mail addresses doesn't match");
    }
    if (!accept.checked) {
        errors.push("To check out, you have to agree to the Terms of Use");
    }

    return errors;
}

function clearErrors() {
    var name = $id('form-name');
    var postal = $id('form-postal');
    var city = $id('form-city');
    var phone = $id('form-phone');
    var email = $id('form-email');
    var email2 = $id('form-email2');
    var accept = $id('form-accept');

    name.className = ""; // Set all input's classnames to none, to remove red border
    postal.className = "";
    city.className = "";
    phone.className = "";
    email.className = "";
    email2.className = "";
    accept.className = "";

    var errorMsgDiv = $id('form-message');
    while (errorMsgDiv.firstChild) { // Remove all error messages
        errorMsgDiv.removeChild(errorMsgDiv.firstChild);
    }
}

// Event listeners
var updateButton = $id('update-button'); // Get button element from HTML
updateButton.addEventListener('click', function() { // Listener for update button
    if (! isCartEmpty() && rowsValid()) { // Check if rows are valid
        updateRows(); // Update rows
        updateCart(); // Update sidebar cart
    }
})

var checkoutButton = $id('checkout-button'); // Get button element from HTML
checkoutButton.addEventListener('click', function() { // Listener for checkout button
    if (! isCartEmpty() && rowsValid()) { // Check if rows are valid
        clearErrors(); // Clear any red error borders
        var errors = isFormValid();
        if (errors.length == 0) { // Check if form is valid
            alert("Thanks! Your order will be delivered as soon as possible!");
        }
        else {
            var errorMsgDiv = $id('form-message'); // Get error message div
            for (var i = 0; i < errors.length; i++) { // Display errors
                var errorMsgParagraph = document.createElement("li");
                var errorMsgNode = document.createTextNode(errors[i]);
                errorMsgParagraph.appendChild(errorMsgNode);
                errorMsgDiv.appendChild(errorMsgParagraph);
            }
        }
    }
    else if (isCartEmpty()) {
        alert("Shopping cart is empty, cannot check out.");
    }
    else {
        alert("Please correct errors in shopping cart before checking out.")
    }
});
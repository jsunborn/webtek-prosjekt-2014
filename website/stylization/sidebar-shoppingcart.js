function $id(id) { return document.getElementById(id); } // Shorthands
function $tag(id) { return document.getElementsByTagName(id); }

var sidebarCart = $id('sidebar-shoppingcart'); // Get sidebar shopping cart from HTML

// Misc. variables
var identifier = "WEBTEKBOARD"; // Identifier for the session storage
var totalSum = 0;
var numberOfItemsInCart = 0;

// Populate sidebar shopping cart from sessionStorage
for (var name in sessionStorage) { // Iterate all items in sessionStorage

    // Add valid items to shopping cart
    if (name.substring(0, identifier.length) == identifier) {
        var product = sessionStorage.getItem(name).split(","); // Split string by commas

        if (isProductValid(product)) { // Check if product is valid
            var productSum = getProductAmount(product) * getProductPrice(product);
            totalSum += productSum;

            numberOfItemsInCart = parseInt(numberOfItemsInCart) + parseInt(getProductAmount(product)); // Advance number of items in cart by 1
        }
    }
}

if (numberOfItemsInCart == 1) {
    var totalSumNode = document.createTextNode(numberOfItemsInCart + " item: " + totalSum + ",-");
    sidebarCart.appendChild(totalSumNode);
}
else if (numberOfItemsInCart > 1) {
    var totalSumNode = document.createTextNode(numberOfItemsInCart + " items: " + totalSum + ",-");
    sidebarCart.appendChild(totalSumNode);
}

function getProductName(product) {
    return product[0];
}

function getProductAmount(product) {
    return product[1];
}

function getProductPrice(product) {
    var payment_info = loadXMLDoc("../product-info/payment_info.xml"); // Load product information from XML
    var productsNamesFromXML = payment_info.getElementsByTagName("name"); // Get all product names

    for(i = 0; i < productsNamesFromXML.length; i++) { // Loop through names
        if (productsNamesFromXML[i].innerHTML == getProductName(product)) { // Check if name corresponds to this product
            return productsNamesFromXML[i].parentNode.getElementsByTagName("price")[0].innerHTML; // Get parent element (product) and get the content of it's child element, price
        }
    }
}

function isProductValid(product) {
    var payment_info = loadXMLDoc("../product-info/payment_info.xml");
    var productsNamesFromXML = payment_info.getElementsByTagName("name");

    for(i = 0; i < productsNamesFromXML.length; i++) {
        if (productsNamesFromXML[i].innerHTML == getProductName(product)) {
            return true;
        }
    }
    return false;
}

function updateCart() {
    totalSum = 0;
    numberOfItemsInCart = 0;

    for (var name in sessionStorage) { // Iterate all items in sessionStorage

        // Add valid items to shopping cart
        if (name.substring(0, identifier.length) == identifier) {
            var product = sessionStorage.getItem(name).split(","); // Split string by commas

            if (isProductValid(product)) { // Check if product is valid
                var productSum = getProductAmount(product) * getProductPrice(product);
                totalSum += productSum;

                numberOfItemsInCart = parseInt(numberOfItemsInCart) + parseInt(getProductAmount(product)); // Advance number of items in cart by 1
            }
        }
    }

    var totalSumNode = sidebarCart.childNodes[0];

    if (numberOfItemsInCart == 1) {
        totalSumNode.nodeValue = numberOfItemsInCart + " item: " + totalSum + ",-";
    }
    else if (numberOfItemsInCart > 1) {
        totalSumNode.nodeValue = numberOfItemsInCart + " items: " + totalSum + ",-";
    }
    else {
        totalSumNode.nodeValue = "";
    }
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

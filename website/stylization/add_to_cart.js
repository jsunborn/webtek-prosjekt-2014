var AddToCart = (function() {
	function $id(x) {return document.getElementById(x);}
	function $tag(x) {return document.getElementsByTagName(x);}
	var identifier = "WEBTEKBOARD:";
	var stringsplit = ',';


	function loadXMLDoc(filename) {
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

	var payment_info = loadXMLDoc("../product-info/payment_info.xml");


	var getProductName = function() {
		var metas = $tag("meta");
		for(var i=0; i<metas.length; i++) {
			if (metas[i].getAttribute("name") == "product") {
				return metas[i].getAttribute("content");
			}
		}
		return "";
	}


	var calculateTotalSum = function() {
		var price = 0;
		var products = payment_info.getElementsByTagName("name");

		// Loop over all products in storage
		for(var i=0; i<sessionStorage.length; i++) {
			// Get one product
			var key = sessionStorage.key(i);
			// Check if ID comes from our webpage
			if (key.substring(0, 11) == identifier) {
				var product = sessionStorage.getItem(key).split(stringsplit);
				// Loop over all products in xml-file
				for(var j=0; j<products.length; j++) {
					// If (when) they match, get price and multiply by number of products
					if(products[i].innerHTML == product[0]) {
						console.log(product);
						var prodPrice = products[i].parentNode.getElementsByTagName("price")[0].innerHTML;
						price += (prodPrice * product[1])
						break;
					}
				}
			}
		}
	}

	var getLowerCaseName = function(productName) {
		var products = payment_info.getElementsByTagName("name");
		for (var i=0; i<products.length; i++) {
			if (products[i].innerHTML == productName) {
				return products[i].parentNode.getElementsByTagName("filename")[0].innerHTML;
			}
		}
		return "";
	}


	var addProduct = function() {
		var product = getProductName();
		var num = 1;

		if (product != "") {
			product = product.split(stringsplit);
			if (sessionStorage.getItem((identifier+product[0])) === null) {
				product.push(num);
			}
			else {
				product = sessionStorage.getItem((identifier+product[0])).split(stringsplit);
				product[1] = parseInt(product[1]) + 1;
			}

			var productnamelowercase = getLowerCaseName(product[0]);

			if (sessionStorage.getItem((identifier+product[0])) === null) {
				product.push(productnamelowercase);
			}

			sessionStorage.setItem((identifier+product[0]), product);
		}

		calculateTotalSum();

	}

	return {
		init: function() {
			var addButton = $id("addproduct");

			addButton.addEventListener("click", function() {
				addProduct();
			});
		}
	}
})();
window.addEventListener("load", function() {
	AddToCart.init();
});

var AddToCart = (function() {
	function $id(x) {return document.getElementById(x);}
	function $tag(x) {return document.getElementsByTagName(x);}
	var identifier = "WEBTEKBOARD";
	var stringsplit = ',';
	
	var getProductName = function() {
		var metas = $tag("meta");
		for(var i=0; i<metas.length; i++) {
			if (metas[i].getAttribute("name") == "product") {
				return metas[i].getAttribute("content");
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
				product[2] = parseInt(product[2]) + 1;
			}
			sessionStorage.setItem((identifier+product[0]), product);
		}
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
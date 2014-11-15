
function getElementsByClass(node, classname){
	if (node.getElementsByClassName){
		return node.getElementsByClassName(classname)
	}
	else {
		return (function getElements (searchClass, node){
			if (node == null)
				node = document;
			var classElemements = [],
				els = node.getElementsByTagName("*"),
				elsLen = els.lenght,
				pattern = new RegExp ("(^|\\s)"+ searchClass + "(\\s|$)"), i, j;

			for ( i = 0 , j = 0; i < elsLen; i ++){
				if (pattern.test(els[i].className) ){
					classElemements[j] = els[i];
					j ++;
				}
			}
		})(classname, node);

	}
}

function main(){
	/* var t = console.log(getElementsByClass(document, "noHover"));
	if (t){
		n = t.lenght;

		for (var i = 0; i < n; i ++){
			console.log(t[i])
		}
	}	
	console.log(t) */
	console.log("start")
	var x = document.getElementsByTagName("a");
	t = x.lenght;
	console.log(t)
	console.log(x[21])
	console.log(x)

	for (t in x);
		console.log(t)


	/*
	for (var i = 0; i < t; i ++){
			console.log(t[i].lenght)
		}

*/
}

window.addEventListener("Load", main())
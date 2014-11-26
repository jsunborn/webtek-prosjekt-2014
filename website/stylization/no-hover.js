
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
	var t = getElementsByClass(document, "noHover"),
	li = [],
	newLi = [];


		
	for (x = 0, y = t.length; x < y; x ++)
		li.push(t[x].getElementsByTagName("li"))
	li = li[0]
	for (x = 0,z =li.length; x < z; x ++){
		li[x].onmouseover = function (event){onMouse(event)};
		li[x].onmouseout = function (event){offMouse(event)};
		}
}

function onMouse(event){
	t = event.target
	if (t.id == "doubleH1" || t.id == "doubleH2"){

		document.getElementById("fillAll").style.backgroundColor = "#89C765"
		
	}
	else if (t.nodeName.toLowerCase() == "a"){
		t.parentNode.style.backgroundColor = "#89C765"
		t.style.backgroundColor = "#89C765"
	}
}

/* t.parentNode.nodeName.toLowerCase()*/

function offMouse(event){
	t = event.target
	if (t.id == "doubleH1" || t.id == "doubleH2"){
		document.getElementById("fillAll").style.backgroundColor = "#9EBF6D"
		}	
	else if (t.nodeName.toLowerCase() == "a"){
		t.parentNode.style.backgroundColor = "#9EBF6D"
		t.style.backgroundColor = "#9EBF6D"
	}
	
}

	/*	

	console.log(t) 
	console.log("jalla");
	var t = document.getElementsByTagName("a");
	console.log(t);
	console.log(t.length);
	for (var i = 0; i < t; i ++){
			console.log(t[i].lenght)
		}

*/


window.addEventListener("Load", main())
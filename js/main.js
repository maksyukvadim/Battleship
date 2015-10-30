var Battleships = function() {
	var size = 10,
		field = initField(size);
	var rules = {
		'1': 4,
		'2': 3,
		'3': 2,
		'4': 1
	}
	var masSide = [];
	var x1,x2,y1,y2;

	function initField(size) {
		var res = [];
		for (var i = 0; i < size; i++) {
			res[i] = [];
			for (var j = 0; j < size; j++) {
				res[i].push({
					ship: false,
					opened: false,
					msg: "Промазал!"
				});
			}
		}
		return res;
	}

	var CreateTable = function() {
		var myTable = document.createElement("table");
		document.body.appendChild(myTable);
		for (var i = 9; i >= 0; i--) {
			var tr = document.createElement("tr");
			myTable.appendChild(tr);
			for (var j = 0; j < 10; j++) {
				var td = document.createElement("td");
				tr.appendChild(td);

				td.id = i + ":" + j;
				td.style.background = "gray";
				td.innerHTML = "" + i + ":" + j;
			}
		}
		myTable.onmousedown = myTable.onselectstart = function() {
  return false;
}
	};

	CreateTable();

	function CheckBorder(x, y) {
		if (x >= 0 && x < 10 && y >= 0 && y < 10) {
			return true;
		} else {
			return false;
		}
	}
	var checkForRight = function(x, y, sizeShip) {
		if (x + sizeShip > 10) {
			alert("корабль выходит за рамки поля вправо");
			return false;
		} else {
			for (var i = 0; i < sizeShip; i++) {
				if (field[y][x + i].ship == true) {
					return false;
				}
			}
		}
		return true;
	};
	var checkForLeft = function(x, y, sizeShip) {
		if (x - sizeShip < -1) {
			alert("корабль выходит за рамки поля влево");
			return false;
		} else {
			for (var i = 0; i < sizeShip; i++) {
				if (field[y][x - i].ship == true) {
					return false;
				}
			}
		}
		return true;
	};
	var checkForTop = function(x, y, sizeShip) {
		if (y + sizeShip > 10) {
			alert("корабль выходит за рамки поля вверх");
			return false;
		} else {
			for (var i = 0; i < sizeShip; i++) {
				if (field[y + i][x].ship == true) {
					return false;
				}
			}
		}
		return true;
	};
	var checkForBot = function(x, y, sizeShip) {
		if (y - sizeShip < -1) {
			alert("корабль выходит за рамки поля вниз");
			return false;
		} else {
			for (var i = 0; i < sizeShip; i++) {

				if (field[y - i][x].ship == true) {
					return false;
				}
			}
		}
		return true;
	};
	 function sizeShip  (x1, y1, x2, y2) {
		if (x1==x2) {
			 
			alert( Math.abs(y1-y2)+1);
		}else{
		alert( Math.abs(x1-x2)+1);
		}
		
	}
	var side = function(x, y, sizeShip) {

		if(checkForLeft(x, y, sizeShip)){
			masSide.push("влево");
		}
		if(checkForRight(x, y, sizeShip)){
			masSide.push("вправо");
		}
		if(checkForTop(x, y, sizeShip)){
			masSide.push("вверх");
		}
		if(checkForBot(x, y, sizeShip)){
			masSide.push("вниз");
		}
	};
	var message = function() {
		for (var i = 0; i < masSide.length; i++) {
			alert("корабль можно разместить "+ masSide[i]);
		}
	};

	this.getShip = function(x, y) {
		return field[y][x];
	};
	this.putShip = function(x, y) {
		// добавить проверку на край поля
		// также добавить проверку на соседние корабли
		field[y][x].ship = true;
	}
	this.hit = function(x, y) {
		// добавить проверку на край поля
		// сделать проверку на рядом стоящий ОДИНАРНЫЙ корабль
		field[y][x].opened = true;
	}
	var addSips = function(x, y) {

			if (CheckBorder(x, y) == false) {
				return alert("Вы ввели кординаты которые не попадают в поле");
			};
			var sizeShip = 1;
			if (sizeShip > 4 || sizeShip < 1) {
				return alert("Вы ввели неправельный размер корабля");
			}
			//side(x, y, sizeShip);
		//	message();
			masSide =[];

		}
		// добавить метод, который будет добавлять корабли (до 4 палуб)

	onmousedown = function a(e) {
		var tdId1 = e.target.id;
		console.log(tdId1);
		x1 =+tdId1[2];
		y1 =+tdId1[0];
		addSips(+tdId1[2],+tdId1[0])
		
	};
	onmouseup = function b(e) {
		var tdId2 = e.target.id;
		console.log(tdId2);
		x2 =+tdId2[2];
		y2 =+tdId2[0];
		sizeShip(y1,x1,tdId2[0],tdId2[2]);
		
	}
	
	


}
var bg = new Battleships(10);



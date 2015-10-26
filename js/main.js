var Battleships = function() {
	var size = 10,
		field = initField(size);
	var rules = {
		'1': 4,
		'2': 3,
		'3': 2,
		'4': 1
	}

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
	};

	CreateTable();

	function CheckBorder(x, y) {
		if (x >= 0 && x < 10 && y >= 0 && y < 10) {
			return true;
		} else {
			return false;
		}
	}

	var checkForShips = function(x, y, sizeShip) {


		if (x + sizeShip > 10) {
			alert("корабль выходит за рамки поля вправо");
		} else {
			for (var i = 0; i < sizeShip; i++) {
				if (field[y][x + i].ship == true) {
					alert("нельзя разместить корабль вправо");
				}
			}
		}
		if (x - sizeShip < -1) {
			alert("корабль выходит за рамки поля влево");
		} else {
			for (var i = 0; i < sizeShip; i++) {
				if (field[y][x - i].ship == true) {
					alert("нельзя разместить корабль ввлево");
				}
			}
		}
		if (y + sizeShip > 10) {
			alert("корабль выходит за рамки поля вверх");
		} else {
			for (var i = 0; i < sizeShip; i++) {
				if (field[y + i][x].ship == true) {
					alert("нельзя разместить корабль вверх");
				}
			}
		}
		if (y - sizeShip < -1) {
			alert("корабль выходит за рамки поля вниз");
		} else {
			for (var i = 0; i < sizeShip; i++) {

				if (field[y - i][x].ship == true) {
					alert("нельзя разместить корабль вниз");
				}
			}
		}


	}
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
	this.addSips = function(x, y) {

			if (CheckBorder(x, y) == false) {
				return alert("Вы ввели кординаты которые не попадают в поле");
			};
			var sizeShip = +prompt("Введите размер корабля", 1);
			if (sizeShip > 4 || sizeShip < 1) {
				return alert("Вы ввели неправельный размер корабля");
			}
			checkForShips(x, y, sizeShip);

		}
		// добавить метод, который будет добавлять корабли (до 4 палуб)

		}
onclick = function Click (e) {
			
			console.log(e.target.id);
				var tdId = e.target.id;
				console.log(typeof +tdId[0]);
				bg.putShip(+tdId[2],+tdId[0]);
				//console.log(field[tdId[2]][tdId[0]]);
		}

var bg = new Battleships(10);
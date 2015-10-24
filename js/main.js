
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

	this.putShip = function (x, y) {
		// добавить проверку на край поля
		// также добавить проверку на соседние корабли
		field[y][x].ship = true;
	}
	this.hit = function (x, y) {
		// добавить проверку на край поля
		// сделать проверку на рядом стоящий ОДИНАРНЫЙ корабль
		field[y][x].opened = true;
	}
	// добавить метод, который будет добавлять корабли (до 4 палуб)

}

var bg = new Battleships(10);	
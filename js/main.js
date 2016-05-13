window.onload = function() {
    var x = 0, y = 0;
    var count = 0;

    var Battleships = function () {

        var self = this;
        var sizeForColor;
        var arrId = [];
        var arr = [];
        var size = 10,
            field = initField(size);
        var rules = {
            '1': 4,
            '2': 3,
            '3': 2,
            '4': 1
        };
        this.rand = function (min, max) {//ТОЛЬКО для целых чисел
            var min = min || 0;
            var max = max + 1 || 1;
            var rnd = 0;
            do rnd = Math.floor((Math.random() * (max - min)) + min); // Math.floor((Math.random() * (max - min) + 0.5) + min)
            while (rnd == max);
            return rnd;
        };


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

        var createDiv = function () {

        };
        var CreateTable = function () {
            var myTable = document.createElement("table");
            myTable.id = count;
            document.getElementById('forTable').appendChild(myTable);
            for (var i = 9; i >= 0; i--) {
                var tr = document.createElement("tr");
                myTable.appendChild(tr);
                for (var j = 0; j < 10; j++) {
                    var td = document.createElement("td");
                    tr.appendChild(td);

                    td.id = i + ":" + j + count;
                    td.style.background = "gray";
                    // td.innerHTML = "" + i + ":" + j;
                }
            }
            myTable.onmousedown = myTable.onselectstart = function () { //запрещаем выделение
                return false;
            };
        };

            CreateTable();



        function CheckBorder(x, y) {
            return x >= 0 && x < 10 && y >= 0 && y < 10;


        }


        function countShips() {
            return alert("осталось ввести одинарних кораблей: " + rules['1'] + "\n" + "двойных кораблей:" + rules['2'] + "\n" + "тройных" + rules['3'] + "\n" + "четверных" + rules['4']);

        }

        function checkVertekal(x1, y1, x2, y2) {
            var XY;
            if (x1 > x2) {
                XY = x1;
                x1 = x2;
                x2 = XY;

            }
            if (y1 > y2) {
                XY = y1;
                y1 = y2;
                y2 = XY;
            }
            console.log((x1 + " " + y1 + " " + x2 + " 111 " + y2));
            for (var i = -1; i < 2; i++) {
                for (var j = -1; j < sizeShip(x1, y1, x2, y2) + 1; j++) {
                    try {
                        var a = field[y1 + j][x1 + i].ship || false;
                    } catch (e) {

                    }
                    arr.push(a);
                }
            }
            console.log(arr);
        }


        function checkGorizontal(x1, y1, x2, y2) {
            var XY;
            if (x1 > x2) {
                XY = x1;
                x1 = x2;
                x2 = XY;

            }
            if (y1 > y2) {
                XY = y1;
                y1 = y2;
                y2 = XY;
            }
            for (var i = -1; i < sizeShip(x1, y1, x2, y2) + 1; i++) {
                for (var j = -1; j < 2; j++) {
                    try {
                        var a = field[y1 + j][x1 + i].ship || false;
                        console.log(field[y1 + j][x1 + i].ship);
                    } catch (e) {

                    }
                    arr.push(a);
                }
            }
            console.log(arr);
        }

        this.countShips2 = function () {
            console.log((rules['1'] > 1 || rules['2'] > 1 || rules['3'] > 1 || rules['4'] > 1 ));
            return (rules['1'] > 0 || rules['2'] > 0 || rules['3'] > 0 || rules['4'] > 0     );
        };

        function checkShipsForShips(x1, y1, x2, y2) {

            if (x1 == x2) {
                checkVertekal(x1, y1, x2, y2);
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i]) {
                        arr = [];
                        return false;
                    }
                }
            } else {
                checkGorizontal(x1, y1, x2, y2);
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i]) {
                        arr = [];
                        return false;
                    }
                }
            }

            arr = [];
            return true;
        }

        function colorShips() {
            for (var i = 0; i < arrId.length; i++) {
                arrId[i].style.background = "blue";
            }
            arrId = [];

        }

        function amountShips(x1, y1, x2, y2) {
            switch (sizeShip(x1, y1, x2, y2)) {
                case 1:
                    if (rules['1'] < 1) return;
                    alert(sizeShip(x1, y1, x2, y2));
                    rules['1']--;
                    break;
                case 2:
                    if (rules['2'] < 1) return;
                    alert(sizeShip(x1, y1, x2, y2));
                    rules['2']--;
                    break;

                case 3:
                    if (rules['3'] < 1) return;
                    alert(sizeShip(x1, y1, x2, y2));
                    rules['3']--;
                    break;

                default:
                    if (rules['4'] < 1) return;
                    alert(sizeShip(x1, y1, x2, y2));
                    rules['4']--;
                    break;

            }


            return true;

        }

        function checkId(x, y) {
            if (!field[y][x].ship) return undefined;
            if (field[y][x].opened) return undefined;
            var count = 0;

            function checkRight() {
                try {

                    for (var i = 1; i < +field[y][x].id; i++) {
                        if (!field[y][x + i].ship) {
                            return;
                        }
                        if (field[y][x + i].ship && !field[y][x + i].opened) {
                            count++;
                        }
                    }
                } catch (err) {

                }
            }

            function checkLeft() {
                try {

                    for (var i = 1; i < +field[y][x].id; i++) {
                        if (!field[y][x - i].ship) {
                            return;
                        }
                        if (field[y][x - i] && !field[y][x - i].opened) {
                            count++;
                        }
                    }
                } catch (err) {

                }
            }

            function checkTop() {
                try {
                    for (var i = 1; i < +field[y][x].id; i++) {
                        if (!field[y - i][x].ship) {
                            return;
                        }
                        if (field[y - i][x] && !field[y - i][x].opened) {
                            count++;
                        }
                    }
                } catch (err) {

                }
            }

            function checkBot() {
                try {
                    for (var i = 1; i < +field[y][x].id; i++) {
                        if (!field[y + i][x].ship) {
                            return;
                        }
                        if (field[y + i][x] && !field[y + i][x].opened) {
                            count++;
                        }
                    }
                } catch (err) {

                }
            }

            checkRight(x, y);
            checkLeft(x, y);
            checkTop(x, y);
            checkBot(x, y);
            return count;
        }

        var checkCheckId = function (x, y) {
            if (checkId(x, y) == undefined) {
                self.colorHit(x, y, 'black');
                return;
            }
            if (count) {
                if (checkId(x, y) >= 1) {
                    alert("Ранил");
                    self.colorHit(x, y, 'red');
                    return true;
                } else {
                    alert("Убил");
                    self.colorHit(x, y, 'red');
                    return true;
                }
            } else {
                if (checkId(x, y) >= 1) {
                    alert("Копм Вас Ранил");
                    self.colorHit(x, y, 'red');
                    return true;
                } else {
                    alert("Ком Убил Ваш корабль");
                    self.colorHit(x, y, 'red');
                    return true;
                }
            }
        };
        this.colorHit = function (x, y, colorH) {
            var s;
            s = document.getElementById(x + ":" + y + count);
            s.style.background = colorH;
        };
        function shipsCheck(x1, y1, x2, y2) {
            console.log(x1, y1, x2, y2);
            return (x1 != x2 && y1 != y2 );

        }

        function sizeShip(x1, y1, x2, y2) {
            if (x1 == x2) {
                return (Math.abs(y1 - y2) + 1);
            } else {
                return (Math.abs(x1 - x2) + 1);
            }
        }

        this.getShip = function () {
            return field;
        };
        this.hit = function (x, y) {
            checkCheckId(x, y);
            field[y][x].opened = true;
            return (field[y][x].ship);

        };
        var addShips = function (x1, y1, x2, y2) {
            if (sizeShip(x1, y1, x2, y2) > 4) return;
            if (!checkShipsForShips(x1, y1, x2, y2)) return alert("Корабль нельзя разместить так как он пересекается с кораблем");
            if (!amountShips(x1, y1, x2, y2)) return alert("Корабль нельзя разместить так как превосходит количество");
            if (x1 == x2 && y1 == y2) {
                sizeForColor = 1;
                arrId.push(document.getElementById(x1 + ":" + y1 + count));
                field[y1][x1].ship = true;
                field[y1][x1].id = 1;
                countShips();
                return;
            }
            if (x1 == x2) {
                if (y1 < y2) {
                    sizeForColor = 2;
                    for (var i = 0; i < sizeShip(x1, y1, x2, y2); i++) {
                        arrId.push(document.getElementById(x1 + ":" + (y1 + i) + count));
                        field[y1 + i][x1].ship = true;
                        field[y1 + i][x1].id = sizeShip(x1, y1, x2, y2);
                    }
                } else {
                    sizeForColor = 3;
                    for (var i = 0; i < sizeShip(x1, y1, x2, y2); i++) {
                        arrId.push(document.getElementById(x1 + ":" + (y1 - i) + count));
                        field[y1 - i][x1].id = sizeShip(x1, y1, x2, y2);
                        field[y1 - i][x1].ship = true;
                    }
                }
            } else {
                if (y1 == y2) {
                    if (x1 < x2) {
                        sizeForColor = 4;
                        for (var i = 0; i < sizeShip(x1, y1, x2, y2); i++) {
                            arrId.push(document.getElementById((x1 + i) + ":" + y1 + count));
                            field[y1][x1 + i].id = sizeShip(x1, y1, x2, y2);
                            field[y1][x1 + i].ship = true;

                        }
                    } else {
                        sizeForColor = 5;
                        for (var i = 0; i < sizeShip(x1, y1, x2, y2); i++) {
                            arrId.push(document.getElementById((x1 - i) + ":" + y1 + count));
                            field[y1][x1 - i].id = sizeShip(x1, y1, x2, y2);
                            field[y1][x1 - i].ship = true;
                        }

                    }
                }
            }
            countShips();
        };

        this.check1 = function (y, x, a, b) {
            return (!CheckBorder(x, y) || !CheckBorder(a, b));
        };
        this.check2 = function (у, x, a, b) {
            console.log(sizeShip(y, x, a, b));
            console.log(shipsCheck(y, x, a, b));
            return (sizeShip(y, x, a, b) > 4 || shipsCheck(y, x, a, b));
        };
        this.addShColor = function (y, x, a, b) {
            addShips(y, x, a, b);
            colorShips();
        };
        this.addShNoColor = function (y, x, a, b) {
            addShips(y, x, a, b);
        };
        this.returnCheckId = function (x, y) {
            if (field[y][x].ship) return false;
            if (field[y][x].opened) return false;
            return true;


        }
    };//ЗАКРЫВАЕМ КОНСТРУКТОР

    var table = document.getElementsByTagName('table');
    var bg = new Battleships(10);
    count = 1;

    var ng = new Battleships(10);
    count = 0;
    //function battleStyle() {
    //    var s = document.getElementsByTagName('table');
    //    console.log(s);
    //    s[1].style.float = "left";
    //    s[0].style.float = "left";
    //    s[0].style.margin = "50px 50px 50px 50px";
    //    s[1].style.margin = "50px 50px 50px 50px";
    //
    //}

   // battleStyle();

    function On3(e) {
        count = 1;
        // count++;

        //var s;
        var tdId3 = e.target.id;
        if (ng.check1(y, x, +tdId3[0], +tdId3[2])) {
            return alert("Вы ввели кординаты которые не попадают в поле");
        }

        //ng.hit();
        //if (ng.returnCheckId( +tdId3[0],+tdId3[2])){
        //    return alert("Вы уже стрелали");
        //
        //
        //}

        if (!ng.hit(+tdId3[0], +tdId3[2])) { //комп стреляет
            count = 0;
            var compHit = function () {
                if (bg.hit(bg.rand(0, 9), bg.rand(0, 9))) {
                    return compHit();
                }

            };
            compHit();

        }
    }


    function On1(e) {
        var tdId1 = e.target.id;
        console.log(tdId1);
        x = +tdId1[2];
        y = +tdId1[0];


    }

    function On2(e) {
        var tdId2 = e.target.id;
        console.log(tdId2);
        if (bg.check1(y, x, +tdId2[0], +tdId2[2])) {
            return alert("Вы ввели кординаты которые не попадают в поле");
        }

        if (bg.check2(y, x, +tdId2[0], +tdId2[2])) {
            return alert("Такой корабль нельзя поставить");
        }

        bg.addShColor(y, x, +tdId2[0], +tdId2[2]);


    }

    function forBtn() {
        document.getElementById('btn').innerHTML = 'Я готов сражаться';
        table[0].addEventListener("mousedown", On1);
        table[0].addEventListener("mouseup", On2);
        if (!bg.countShips2()) {
            table[0].removeEventListener("mousedown", On1);
            table[0].removeEventListener("mouseup", On2);
            table[1].addEventListener("click", On3);

        }
    }

    var aler = window.alert;
    window.alert = function () {
    };
    function randomLocationShips() {
        count = 1;
        for (var i = 0; i < 40; i++) {
            for (var j = 0; j < 100; j++) {
                var rnd = ng.rand(0, 80);
                var x1 = ng.rand(0, 9);
                var y1 = ng.rand(0, 9);
                var x2;
                var y2;

                if (rnd <= 20) {
                    if (rnd % 2 == 0) {
                        x2 = x1;
                        y2 = y1 + i;

                    } else {
                        x2 = x1 + i;
                        y2 = y1;
                    }
                } else if (rnd <= 40) {
                    if (rnd % 2 == 0) {
                        x2 = x1;
                        y2 = y1 - i;
                    } else {
                        x2 = x1 - i;
                        y2 = y1;
                    }

                } else if (rnd <= 60) {
                    if (rnd % 2 == 0) {
                        x2 = x1;
                        y2 = y1 + i;
                    } else {
                        x2 = x1 + i;
                        y2 = y1;
                    }

                } else {
                    if (rnd % 2 == 0) {
                        x2 = x1;
                        y2 = y1 - i;
                    } else {
                        x2 = x1 - i;
                        y2 = y1;
                    }

                }
                if (x2 > 9 || y2 > 9 || x2 < 0 || y2 < 0) continue;
                ng.addShNoColor(x1, y1, x2, y2);
            }
        }


    }

    randomLocationShips();
    count = 0;
    window.alert = aler;
    var btn = document.querySelectorAll('#btn');
    btn[0].addEventListener('click', forBtn);
};












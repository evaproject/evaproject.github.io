function mainDraw(){

	 // Создание поля СВГ с указанием его размеров
	var draw = SVG("main").size(document.getElementById("main").offsetWidth, document.getElementById("main").offsetHeight);
	 
	 // Красивенький градиент для кривой
	var linear =draw.gradient("linear", function(stop) {
		stop.at(0, "#ff0066")
		stop.at(0.30, "#28A86B")
		stop.at(0.70, "#8D5FD3")
		stop.at(1, "#FF7878")
	});

	 // Создание кривой
	var bezier = draw.path().fill("none").stroke(linear).attr("stroke-width", 3);
	
	 // Создание точек, добавление перетаскивания и задание развешённой зоны использования
	var circle = draw.circle(40)
					.fill("#ff0066")
					.center(document.documentElement.clientWidth * 0.2, document.documentElement.clientHeight / 2)
					.addClass("circle");
	circle.draggable({
		 minX: 0 
		,minY: 0
		,maxX: draw.attr("width")
		,maxY: draw.attr("height")
	});

	var circle = draw.circle(40)
					.fill("#28A86B")
					.center(document.documentElement.clientWidth * 0.4, document.documentElement.clientHeight / 2 - 1)
					.addClass("circle");
	circle.draggable({
		 minX: 0 
		,minY: 0
		,maxX: draw.attr("width")
		,maxY: draw.attr("height")
	});

	var circle = draw.circle(40)
					.fill("#8D5FD3")
					.center(document.documentElement.clientWidth * 0.6, document.documentElement.clientHeight / 2 + 1)
					.addClass("circle");
	circle.draggable({
		 minX: 0 
		,minY: 0
		,maxX: draw.attr("width")
		,maxY: draw.attr("height")
	});

	var circle = draw.circle(40)
					.fill("#FF7878")
					.center(document.documentElement.clientWidth * 0.8, document.documentElement.clientHeight / 2)
					.addClass("circle");
	circle.draggable({
		 minX: 0 
		,minY: 0
		,maxX: draw.attr("width")
		,maxY: draw.attr("height")
	});

	 // Обьединение точек в список
	var svg = document.querySelector("svg");
	var circles = document.querySelectorAll("circle");
	var i = circles.length;


	 // Формирование и отрисовка кривой в зависимости от координат точек
	function drawBezier(){
		var b = "M " + circles[0].getAttribute("cx") + " " + circles[0].getAttribute("cy") 
			 + " C " + circles[1].getAttribute("cx") + " " + circles[1].getAttribute("cy")
			 + " " + circles[2].getAttribute("cx") + " " + circles[2].getAttribute("cy")
			 + " " + circles[3].getAttribute("cx") + " " + circles[3].getAttribute("cy");
		bezier.attr("d", b);
	}

	 // Первичная отрисовка кривой
	drawBezier();

	 // Вывод на передний план точки, на которую наведена мышка или тач событие и вызов функции отрисовки кривой
	while(i--) {

		 // Вывод на передний план точки при наведении мыши
		circles[i].addEventListener("mouseenter", function(e){
			if (e.target.classList.contains("circle")){
		 		svg.appendChild(e.target);
		 	}
		});

		 // Вывод на передний план точки при начале тач события
		circles[i].addEventListener("touchstart", function(e){
		 	if (e.target.classList.contains("circle")){
		 		e.target.classList.add("active");
		 		svg.appendChild(e.target);
		 	}
		 });

		 // Обрабатываем действия окончания тач события
		circles[i].addEventListener("touchend", function(e){
			if (e.target.classList.contains("active")){
				e.target.classList.remove('active');
			}
		 });		

		 // Вызов функции отрисовки кривой при движении мыши
		document.addEventListener("mousemove", function(){drawBezier()});
		
		 // Вызов функции отрисовки кривой при тач движении
		document.addEventListener("touchmove", function(){drawBezier()});
	}
}		      
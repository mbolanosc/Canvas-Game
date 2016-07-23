
(function(){
	var canvas = document.getElementById('gameCanvas');
	var ctx = canvas.getContext('2d');
	//$("#panelGame").hide();



	// Primer ejemeplo de dibujos en el Canvas

	// ctx.beginPath();
	// ctx.rect(20, 40, 50, 50);
	// ctx.fillStyle = "#FF0000";
	// ctx.fill();
	// ctx.closePath();

	// ctx.beginPath();
	// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
	// ctx.fillStyle = "green";
	// ctx.fill();
	// ctx.closePath();

	// ctx.beginPath();
	// ctx.rect(160, 10, 100, 40);
	// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
	// ctx.stroke();
	// ctx.closePath();
	
	//puntos
	var score = 0;

	// variables d de movimiento
	var x = canvas.width / 2;
	var y = canvas.height -30;
	var dx = 2;
	var dy = -2;
	var ballRadius = 10;

	// variables de la paleta
	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.height - paddleWidth)/2;

	//variables de control 
	var rightPressed = false;
	var leftPressed = false;

	//variables de enemigos
	var brickRowCount = 3;
	var brickColumnCount = 5;
	var brickWidth = 75;
	var brickHeight = 20;
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30; 

	var bricks= [];

	for(var c = 0; c < brickColumnCount; c++){
		bricks[c] = [];
		for(var r = 0; r <brickRowCount; r++){
			bricks[c][r] = {
				x: 0,
				y:0, 
			 	status :1
			 };
		}
	}

	document.addEventListener('keydown', keydownHadler,false);
	document.addEventListener('keyup',keyupHandler,false);
	document.addEventListener('mousemove',mouseMoveHandler,false);


	function drawBall(){
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		ctx.fillStyle= '#0095DD';
		ctx.fill();
		ctx.closePath();
	};
	function drawPaddle(){
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
		ctx.fillStyle=('#0095DD');
		ctx.fill();
		ctx.closePath();
	}
	function drawBricks(){
		for(var c = 0; c < brickColumnCount; c++){
			for (var r = 0; r < brickRowCount; r++){

				if (bricks[c][r].status == 1) {
					var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
					var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

					bricks[c][r].x = brickX;
					bricks[c][r].y = brickY;

					ctx.beginPath();
					ctx.rect(brickX,brickY, brickWidth, brickHeight);
					ctx.fillStyle = '#0095DD';
					ctx.fill();
					ctx.closePath();	
				};
			}
		}
	}
	function drawScore(){
		ctx.font = '16px Arial';
		ctx.fillStyle = '#0095DD';
		ctx.fillText('Score: ' + score, 8, 20);
	}

	function collisionDetection(){
		

		for(var c = 0; c < brickColumnCount; c++){
			for (var r = 0; r < brickRowCount; r++){
				var brick = bricks[c][r]; // extraer el cuadrito

				if (brick.status == 1) {
						//yo se si la bolita esta dentro de algun cuadrito dentro de los ejes
					if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
						dy = - dy;//inversa direccion contraria
						brick.status = 0;
						score ++;
						if (score == brickRowCount * brickColumnCount) {
							alert('Congrats!, you win yey!!');
							//document.location.reload();
							window.location=('index.html');
						};
					};
				};
			};
		};
	};

	//palito
	function keydownHadler(e){
		if(e.keyCode == 39){
			rightPressed = true;
		}else if(e.keyCode == 37){
			leftPressed = true;
		}
	}
	function keyupHandler(e){
		if(e.keyCode == 39){
			rightPressed = false;
		}else if(e.keyCode == 37){
			leftPressed = false;
		}
	}
	function mouseMoveHandler(e){
		relativeX = e.clientX - canvas.offsetLeft;
		if (relativeX > 0 && relativeX < canvas.width) {
			paddleX = relativeX - paddleWidth/2;
		};
	}

	//bolita y palito
	function draw(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBricks();
		drawBall();
		drawPaddle();
		drawScore();
		collisionDetection();


		/*if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
			dy = -dy;	
		}*/
		if (y+dy < ballRadius) {
			dy = -dy;
		}else if (y + dy > canvas.height - ballRadius) {
			if (x > paddleX && x < paddleX + paddleWidth) {
				dy = - dy;
			}else{
				alert('game over ):');
				document.location.reload();
				$("#gameCanvas").hide();
				$("#panelGame").show();
			};
			
		};
		
		if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;	
		}


		if(rightPressed && paddleX < canvas.width - paddleWidth){
			paddleX += 7;
		}
		if(leftPressed && paddleX > 0 ){
			paddleX -= 7;
		}

		x += dx;
		y += dy; 
	};
	setInterval(draw, 10);

}());
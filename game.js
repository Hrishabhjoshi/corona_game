
function load_images(){
	virus_image = new Image;
	virus_image.src = "Assets/v1.png";

	player_img = new Image;
	player_img.src = "Assets/superhero.png";

	gem_image = new Image;
	gem_image.src = "Assets/gemm.png";

}

function init(){

	canvas = document.getElementById("mycanvas");
	console.log(canvas);

	W = 1200
	H = 400

	canvas.width = W
	canvas.height = H


	
	pen = canvas.getContext('2d');
	console.log(pen);

	score = 0;
	game_over = false;

	
	e1 = {
		x : 350,
		y : 50,
		w : 60,
		h : 60,
		speed : 20,
	};
	e2 = {
		x : 800,
		y : 150,
		w : 60,
		h : 60,
		speed : 30,
	};
	e3 = {
		x : 550,
		y : 20,
		w : 60,
		h : 60,
		speed : 40,
	};
	enemy = [e1,e2,e3];

	player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
		moving : "false",
	}
	gem = {
		x : 1100,
		y : H/2,
		w : 60,
		h : 60,
	}
	canvas.addEventListener('mousedown',function(){
		console.log("You pressed the mouse");
		player.moving = true;
	});
	canvas.addEventListener('mouseup',function(){
		console.log("You released the mouse");
		player.moving = false;
	});
	

}
// Game Loop
function draw(){

	//Clear the old screen (entire area)
	pen.clearRect(0,0,W,H);

	//Draw this bird on the screen
	pen.fillStyle = "red";
	//pen.fillRect(bird.x,bird.y,bird.w,bird.h);

	pen.drawImage(player_img,player.x,player.y,player.w,player.h);
	pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);

	for(let i=0;i<enemy.length;i++){
		pen.drawImage(virus_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
	}
	pen.fillStyle = "white";
	pen.fillText("Score " + score,10,10);
}

function isColliding(b1,b2){
	//x,y,w,h
	if(Math.abs(b1.x - b2.x)<=30 && Math.abs(b1.y-b2.y)<=30){
		return true;
	}
	return false;
}

function update(){

	//player state
	if(player.moving==true){
		player.x += player.speed;
		score += 20;
	}
	for(let i=0;i<enemy.length;i++){
		if(isColliding(enemy[i],player)){
			score -= i*100;
			if(score<0){
				game_over = true;
				alert("Game Over");
			}

		}
	}

	//collision gem and player
	if(isColliding(gem,player)){
		game_over = true;
		draw();
		alert("You score" +score);
		//break the game loop -->
	}

	for(let i=0;i<enemy.length;i++){
		enemy[i].y += enemy[i].speed;
		if(enemy[i].y >H - enemy[i].h || enemy[i].y<0 ){
			enemy[i].speed *= -1;
		}
	}
	
}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
	}
	draw();
	update();
}

//start of the game
load_images();
init();

var f = setInterval(gameloop,100);











/*
Description: Game.js, this script contains all the javascript required for the game to work on the JS_game html page.
New levels can be added by creating a new startLevel? function. It is recommended that a new background is used for each
level.
Author: Open Source - Contributor list can be seen in GitHub
*/

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const SPACE = 32;
//flag to take care of y axis cordinate increase or decrease
//z to set a interval at which flag is changed 
var flag = 1;
var z=0;
// Add state to check if user is playing, complete or game-over
var state = 'playing';

var currentLevel = 1;
var playerCharacter;
var background;
var score;
var levelDisplay;
var enemyCharacters = [];
var keysPressed = {LEFT : false, UP : false, RIGHT : false};
var idleArray = []; // REMOVE


/**
 * @param event
 * @constructor
 */
function KeyDown(event) {
    console.log(event);
    var key;
    key = event.which;
    console.log(key);
    keysPressed[key] = true;

	if (keysPressed[LEFT]) {
		moveLeft();	
	}
	if (keysPressed[RIGHT]) {
		moveRight();	
	}
	if (keysPressed[UP]) {
		moveUp();	
	}
	if (keysPressed[SPACE]) { // Add SPACE key to restart game (only if it's complete or game-over)
		if (state === 'game-over' || state === 'complete') {
            history.go(0);
        }	
	}
}

/**
 * @param event
 * @constructor
 */
function KeyUp(event) {
    var key;
    key = event.which;
    console.log(key);
    keysPressed[key] = false;
	switch (key) {
		case UP:
			playerCharacter.speedY = 0;
			break;
		case LEFT:
			if (keysPressed[RIGHT]) {
				moveRight();		
			} else {
				playerCharacter.speedX = 0;		
			}
			break;
		case RIGHT:
			if (keysPressed[LEFT]) {
				moveLeft();		
			} else {
				playerCharacter.speedX = 0;		
			}
	}
}
/**
 * Load Resources - REMOVE
 */
function loadResources() {
    var maxFrames = 9;
    for (let x = 0; x < maxFrames; x++ ) {
        let img = new Image();
        img.src = "Pictures/Sprite_Sheets/Idle__00" + x + ".png";
        idleArray.push(img);
    }
}
/**
 *
 */

function startGame() {
    loadResources();
    //player character               
    playerCharacter = new component(60, 70, "pictures/good_guy.png", 100, 120, "image",1);

	//background
    background = new component(900, 400, "Pictures/background.jpg", 0, 0, "image",1);

	//score
	score = new component("30px", "Consolas", "black", 100, 40, "text",1);

	//current level display
	levelDisplay = new component("30px", "Consolas", "black", 600, 40, "text",1);

	//loop for creating new enemy characters setting a random x coordinate for each
	for (var i=0; i<100; i++) {
	var x = Math.floor((Math.random() * (1200 + i * 300 - 900 + i * 300)) + (300 * i + 900));
	//Random enemy character choose
	if(Math.floor(Math.random()*(2)))
    {   console.log("enemy 1");
        enemyCharacters[i] = new component(40, 50, "Pictures/zombie.png", x,200, "image",1)}
    else
    {   console.log("enemy 2");
        enemyCharacters[i] = new component(80, 60, "pictures/enemy2.png", x,200, "image",0)}
    }

	//call start function
    gameArea.start();
}

/**
 *
 */
function startLevel2() {
    flag= 1;
    z=0
    //player character
    playerCharacter = new component(60, 70, "pictures/good_girl.png", 100, 120, "image",1);

	//background
    background = new component(900, 400, "Pictures/background2.jpg", 0, 0, "image",1);

	//score
	score = new component("30px", "Consolas", "black", 100, 40, "text",1);

	//current level display
	levelDisplay = new component("30px", "Consolas", "black", 600, 40, "text",1);

	//loop for creating new enemy characters setting a random x coordinate for each
	for (var i = 0; i < 100; i++) {
	    var x = Math.floor((Math.random() * (1400+i*500)) + (500*i+900));

        //Random enemy character choose
        if(Math.floor(Math.random()*(2)))
        {   console.log("enemy 1");
            enemyCharacters[i] = new component(60, 50, "pictures/bad_guy.png", x,200, "image",0)}
        else
        {   console.log("enemy 2");
            enemyCharacters[i] = new component(80, 60, "pictures/enemy2.png", x,200, "image",0)}
    }

	//call start function
    gameArea.start();
}

function startLevel3() {
        //to synchronize the start cordinate of enemy character
	flag= 1;
        z=0
	//player character              
    playerCharacter = new component(60, 70, "pictures/good_girl.png", 100, 120, "image",1);

	//background
    background = new component(900, 400, "Pictures/background_3.jpg", 0, 0, "image",1);

	//score
	score = new component("30px", "Consolas", "black", 100, 40, "text",1);

	//current level display
	levelDisplay = new component("30px", "Consolas", "black", 600, 40, "text",1);

	//loop for creating new enemy characters setting a random x coordinate for each
	for (var i = 0; i < 100; i++) {
        var x = Math.floor((Math.random() * (1400 + i * 500)) + (500 * i + 900));

        //if statement to choose random enemy from flying birds and skullman
        if (Math.floor(Math.random() * (2))) {
            console.log("enemy 1");
            enemyCharacters[i] = new component(60, 50, "Pictures/skull_baddie.png", x, 200, "image", 1);
        }
        else {
            console.log("enemy 2");
            enemyCharacters[i] = new component(80, 60, "pictures/enemy2.png", x, 200, "image", 0);
        }
    }

	//call start function
    gameArea.start();
}

/**
 * @type {{canvas: Element, start: gameArea.start, clear: gameArea.clear, stop: gameArea.stop}}
 */
var gameArea = {
    //create html canvas
    canvas : document.createElement("canvas"),
    start : function() {
        //canvas size
        this.canvas.width = 900;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        //update interval
        this.interval = setInterval(updateGameArea, 20);
    },

    //function used for refreshing page
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

	//function used for stopping the game
    stop : function() {
        clearInterval(this.interval);
    }
};

/**
 * @param width
 * @param height
 * @param color
 * @param x
 * @param y
 * @param type
 */
function component(width, height, color, x, y, type,h) {
    
    //h to test if it is enemy 1 or 2
    this.h=h;
    //test if component is image
    this.type = type;
    if (type === "image") {
        this.image = new Image();
        this.image.src = color;
        this.image.width = width;
        this.image.height = height;
    }
    this.width = width;
    this.height = height;

	//change components position
    this.speedX = 0
    this.speedY = 0;
    this.x = x;
    this.y = y;
	this.gravity = 0;
    
	//sets speed playerCharacter falls to bottom of canvas
	this.gravitySpeed = 4.5;

	//function to decide to decide what to display on screen, text, image or fill color
    this.update = function() {
        ctx = gameArea.context;
        /*function animate() {
            ctx.clearRect(this.x, this.y, this.width, this.height);
            var msPerImg = 100;
            var currentTime = new Date().valueOf();
            var idleToDraw = this.image[Math.floor(currentTime/msPerImg) % this.image.length];
            ctx.drawImage(idleToDraw, this.x, this.y);
        }*/
        if (type === "image") {
            //animate();
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height); 
        } else if (this.type === "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    
	//enemy character collision function
	this.crashWith = function(otherobj) {
        var left = this.x;
        var right = this.x + (this.width);
        var top = this.y;
        var bottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((bottom < othertop + 10) ||
               (top > otherbottom - 20) ||
               (right < otherleft + 15) ||
               (left > otherright - 15)) {
           crash = false;
        }
        return crash;
    };

	//gravity property
    this.newPos = function() {
		this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    };

	//set floor on canvas
	this.hitBottom = function() {
		var rockbottom = gameArea.canvas.height - this.height -150;
			if (this.y > rockbottom)
				this.y = rockbottom;
			}
}


/**
 *
 */
function gameOver() {
    state = 'game-over';
    var modal = document.getElementById('gameOverModal');
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

/**
 *
 */
function gameComplete(){
    state = 'complete';
	var modal = document.getElementById('gameCompleteModal');
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

/**
 * Update game area for period defined in game area function, current 20th of a millisecond (50 times a second)
 */
function updateGameArea() {
	//loop for enemy collision
	for (var i=0; i<enemyCharacters.length; i++){
		  if (playerCharacter.crashWith(enemyCharacters[i])) {
		      gameArea.stop();
		      gameOver();
		  }
	}

	//clear canvas before each update
	gameArea.clear();

	//increment frame number for score counter
	gameArea.frameNo += 2;

	//update background
    background.update();

	//enemy update
	for (var i=0; i<100; i++) {
	    enemyCharacters[i].update();
	}

	//score update
	score.text = "SCORE: " + gameArea.frameNo;
        score.update();

	//LevelDisplay update
	levelDisplay.text = "Level " + currentLevel;
	levelDisplay.update();

	//when frame number reaches 3000 (point at which obstacles end) end game
	//check current level, if more than 2 (because there is two levels currently), show game complete modal
	if (gameArea.frameNo === 3000){
		gameArea.stop();
		currentLevel++;

		if(currentLevel === 2){
			startLevel2();
		}
    else if(currentLevel === 3){
      startLevel3();
    }
		else{
			gameComplete();
		}
	}

	//player character update
	playerCharacter.newPos();
    playerCharacter.update();

	//if statement to reverse the flag so that the y cordinate of birds would be changed
	//z keeps the track and change flag after every 35 iteration
	if(z==35) {
           flag = !flag;
           z=0;
         }
	//z increased in every iteration
        z++;
	//loop to set speed of enemy characters
    for (var i = 0; i < enemyCharacters.length; i++){
	    enemyCharacters[i].x += -2;

	    //if statement to check if y cordinate has to increase or decrease
	    //should birds go up or down
	    if(!enemyCharacters[i].h) {
            if (flag == 1) {
                enemyCharacters[i].y += -3;
            }
            else {
                enemyCharacters[i].y += +3;
            }
        }

        }
}
    /**
     *      REMOVE
     * @param {*} url 
     * @param {*} srcHeight 
     * @param {*} srcWidth 
     * @param {*} destHeight 
     * @param {*} destWidth 
     * @param {*} frame 
     * @param {*} playerX 
     * @param {*} playerY 
     */

function runRight(url, srcHeight, srcWidth, destHeight, destWidth, frame, playerX, playerY) {
    var sprite = new Image();
    sprite.src = url;
    var shift = 0;
    var height = srcHeight;
    var width = srcWidth;
    var frameWidth = destWidth;
    var frameHeight = destHeight;
    var totalFrames = frame;
    var currentFrame = 0;
    var x = playerX;
    var y = playerY;

    
    
    ctx.clearRect(x,y, frameWidth, frameHeight);
    ctx.drawImage(sprite, shift, 0, frameWidth, frameHeight, width, height, x, y);
    
    shift += frameWidth + 1;
    
     if(currentFrame == totalFrames) {
        shift = 0;
        currentFrame = 0;
    }

    currentFrame++;
    
    requestAnimationFrame(runRight);
        
    
    /*
    this.runRight = function() {
        ctx.clearRect(x,y, frameWidth, frameHeight);
        ctx.drawImage(sprite, shift, 0, srcWidth, srcHeight, x, y, destWidth, destHeight);

        shift += frameWidth + 1;

        if(currentFrame == totalFrames) {
            shift = 0;
            currentFrame = 0;
        }
        currentFrame++;

        requestAnimationFrame(runRight);
    }{*}
    */
};



function animatePlayerCharacter () {
    var currentTime = new Date().valueOf();
    var requestID;
    
    var frames = 9;
    var spriteImageCounter = Math.floor(currentTime/100) % frames;
    var toDraw = playerCharacter.image.src = "Pictures/Sprite_Sheets/Run__00" + spriteImageCounter + ".png";
   
    //requestAnimationFrame(animatePlayerCharacter); Smoother animation but Character will run forever 
    
    /* Alternate code that doesn't really work
    var spriteImageCounter = 0;
    var timer = setInterval(spriteTimer, 1000);   
    
    function spriteTimer() {
        if(spriteImageCounter < frames){
            playerCharacter.image.src = "Pictures/Sprite_Sheets/Run__00" + spriteImageCounter + ".png";
            spriteImageCounter++;
        }else {
            spriteImageCounter = 0;
        }
        requestAnimationFrame(spriteTimer);
    }
    */
    
}
/* Duplicate above code to make idlePlayerCharacter and switch image src to the idle png files
That will stop him from running */
function idlePlayerCharacter() {
    var currentTime = new Date().valueOf();
    var requestID;
    
    var frames = 9;
    var spriteImageCounter = Math.floor(currentTime/100) % frames;
    var toDraw = playerCharacter.image.src = "Pictures/Sprite_Sheets/Idle__00" + spriteImageCounter + ".png";
    requestAnimationFrame(idlePlayerCharacter);
}


/**
 * Stops player character from constantly moving after button move pressed
 */
function stopMove(){
    playerCharacter.speedX = 0;
    playerCharacter.speedY = 0;
    if (playerCharacter.y < 0) {
        playerCharacter.speedY = 0;
        playerCharacter.y = 0;
    }
    if (playerCharacter.x < 0){
        playerCharacter.speedX = 0;
        playerCharacter.x = 0;
    }
    if (playerCharacter.x > gameArea.canvas.width-playerCharacter.width) {
        playerCharacter.speedX = 0;
        playerCharacter.x = gameArea.canvas.width-playerCharacter.width;
    }
    idlePlayerCharacter();
    //var requestID = requestAnimationFrame(animatePlayerCharacter);    
    //cancelAnimationFrame(requestID);

}

/**
 *
 */
function moveUp() {
    if (playerCharacter.y >= 170 && playerCharacter.x >= 0 &&
        playerCharacter.x <= gameArea.canvas.width - playerCharacter.width) {
        playerCharacter.speedY = -7;
        console.log("up allowed")
    } else {
        if (playerCharacter.y < 0) {
            playerCharacter.speedY = 0;
            playerCharacter.y = 0;
        }
        if (playerCharacter.x < 0){
            playerCharacter.speedX = 0;
            playerCharacter.x = 0;
        }
        if (playerCharacter.x > gameArea.canvas.width-playerCharacter.width) {
            playerCharacter.speedX = 0;
            playerCharacter.x = gameArea.canvas.width-playerCharacter.width;
        }
    }
}

/**
 *
 */
function moveDown() {
    playerCharacter.speedY = 7;
}

/**
 *
 */
function moveLeft() {
    if (playerCharacter.y >= 0 && playerCharacter.x >= 0 &&
        playerCharacter.x <= gameArea.canvas.width - playerCharacter.width) {
        playerCharacter.speedX = -5;
        console.log("left allowed")
    } else {
        if (playerCharacter.y < 0) {
            playerCharacter.speedY = 0;
            playerCharacter.y = 0;
        }
        if (playerCharacter.x < 0){
            playerCharacter.speedX = 0;
            playerCharacter.x = 0;
        }
        if (playerCharacter.x > gameArea.canvas.width-playerCharacter.width) {
            playerCharacter.speedX = 0;
            playerCharacter.x = gameArea.canvas.width-playerCharacter.width;
        }
    }
}

/**
 *
 */
function moveRight() {
    if (playerCharacter.y >= 0 && playerCharacter.x >= 0 && playerCharacter.x <= gameArea.canvas.width-playerCharacter.width) {
        playerCharacter.speedX = 5;
        console.log("right allowed")
    }
        else {
        if (playerCharacter.y < 0) {
            playerCharacter.speedY = 0;
            playerCharacter.y = 0;
        }
        if (playerCharacter.x < 0) {
            playerCharacter.speedX = 0;
            playerCharacter.x = 0;
        }
        if (playerCharacter.x > gameArea.canvas.width-playerCharacter.width) {
            playerCharacter.speedX = 0;
            playerCharacter.x = gameArea.canvas.width-playerCharacter.width;
        }
    }
    animatePlayerCharacter();   
    
}

var interval;

function moveLeftMouse(){
    interval = setInterval(moveLeft,1);
}

function moveRightMouse(){
    interval = setInterval(moveRight,1);
}
function moveUpMouse(){
    interval = setInterval(moveUp,1);
}
function onMouseUp(){
    clearInterval(interval);
     stopMove();
}

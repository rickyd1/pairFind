
var _W = window.innerWidth*.98;
var _H = window.innerHeight - 20;
var game = new Phaser.Game(_W, _H, Phaser.CANVAS, 'game-wrapper', { preload: preload, create: create, update: update, render: render });


function preload() {
    game.load.image('backdrop', 'game/images/pano.jpg');
    game.load.image('card', 'game/images/card.jpg');

    game.load.image('lady-card', 'game/images/lady-card.png');
    game.load.image('man-card', 'game/images/man-card.png');
    game.load.audio('horse', 'game/sounds/horse.mp3');
    game.load.audio('sugar', 'game/sounds/sugar.mp3');
    game.load.audio('gobble', 'game/sounds/gobble.mp3');
    game.load.audio('applause', 'game/sounds/applause.mp3');
    game.load.audio('boo', 'game/sounds/boo.mp3');
}

var card;
var cursors;
var moving = 0;
var sugar;
var horse;
var gobble;
var itemName;
var pairStatus = 0;
var pairedTime;
var defaultAlpha = 0.9;
var canvas_W = 4993;
var canvas_H = 1200;
var score = 0;
var Xval;
var Yval;
var XaltVal;
var YaltVal;
var gameTimer = 10;
var timerEvent;
var scoreText;
var countDownText;


function create() {
    game.world.setBounds(0, 0, 4993, 1200);
    game.add.sprite(0, 0, 'backdrop');
    card = game.add.sprite(100, 100, 'card');
    card.alpha = 0.4;

    game.time;
    
    // Add in game text
    countDownText = this.add.text(0, 100, "Time: " + gameTimer, { font: "25px Arial", fill: "#7CFC00", align: "center" });
    scoreText = this.add.text(0, 100, "Score: " + score, { font: "25px Arial", fill: "#ff0044", align: "center" });

    // Sounds 
    horse = game.add.audio('horse')
    horse.allowMultiple = true;

    gobble = game.add.audio('gobble')
    gobble.allowMultiple = true;    

    sugar = game.add.audio('sugar');
    sugar.allowMultiple = true;

    boo = game.add.audio('boo');
    boo.allowMultiple = true;

    applause = game.add.audio('applause');
    applause.allowMultiple = true;


//    ladycard = game.add.sprite(3792, 686, 'lady-card');
    ladycard = game.add.sprite(400, 10, 'lady-card');
    ladycard.inputEnabled = true;
    ladycard.name = 'female';
    ladycard.alpha = defaultAlpha;
    ladycard.events.onInputDown.add(listener, this);


    mancard = game.add.sprite(300, 300, 'man-card');
  //  mancard = game.add.sprite(2319, 891, 'man-card');
    mancard.inputEnabled = true;
    mancard.name = 'male';
    mancard.alpha = defaultAlpha;
    mancard.events.onInputDown.add(listener, this);

    cursors = game.input.keyboard.createCursorKeys();
    game.input.onDown.add(toggle, this);
    


    fadeAwayLady = game.add.tween(ladycard).to( { alpha: 0 }, 250);
    fadeAwayMale = game.add.tween(mancard).to({alpha: 0}, 250);

    fadeInMale = game.add.tween(mancard).to({alpha: defaultAlpha}, 250);
    fadeInLady = game.add.tween(ladycard).to({alpha: defaultAlpha}, 250);
   
    // add game timer
    timerEvent = game.time.events.loop(Phaser.Timer.SECOND, updateTimer);
}

function toggle() {
    moving = (moving === 0) ? moving = 1 : moving = 0;
}

function update() {
    if (cursors.up.isDown)
    {
        game.camera.y -= 12;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 12;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 12;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 12;
    }
    if(gameTimer === 0) {            
        countDownText.x = game.camera.x + _W/2 - 50;
        countDownText.y = game.camera.y + _H/2;
    } else {
        countDownText.x = game.camera.x + 10;
        countDownText.y = game.camera.y + 10;
    }
    scoreText.x = game.camera.x + _W - scoreText.width - 10;
    scoreText.y = game.camera.y + 10;     
    if (score > 20 ) {
        gameLevel = 5;
    }
    else if (score > 15 )   {
        gameLevel = 4;
    } else if (score > 10) {
        gameLevel = 3;
    } else if (score > 5) {
        gameLevel = 2;
    }
    else {
        gameLevel = 1;
    }
}

function render() {

}
function updateTimer() {
  gameTimer -= 1;
  console.log(gameTimer);
  if(gameTimer === 0) {
    //To remove event:
    game.time.events.remove(timerEvent);

    if (score > 2 ) {
        applause.play();
        countDownText.setText('You Still Suck!');
    } else {
        boo.play();
        countDownText.setText('You Suck!');
    }
  } else {
    countDownText.setText("Time: " + gameTimer);
  }
}
function reloadIcons() {
    pairStatus = 0;
    score = score + 1;
    gameTimer += 5;
    console.log('Score is ' + score);
    scoreText.setText("Score: " + score);
    gobble.play();
    
    if (gameLevel == 1 ) {
        // left sky
        Xval = Math.floor(Math.random() * canvas_W/2) + 1 ;
        XaltVal = Math.floor(Math.random() * canvas_W/2) + 1;
        YaltVal = Math.floor(Math.random() * canvas_H/2) + 1 ;
        Yval = Math.floor(Math.random() * canvas_H/2) + 1 ;
    } else if (gameLevel == 2) {
        // sky only
        Xval = Math.floor(Math.random() * canvas_W) + 1 ;
        XaltVal = Math.floor(Math.random() * canvas_W) + 1; 
        YaltVal = Math.floor(Math.random() * canvas_H/2) + 1 ;
        Yval = Math.floor(Math.random() * canvas_H/2) + 1 ;
    } else if (gameLevel == 3 ) {
        // left area
        Xval = Math.floor(Math.random() * canvas_W) + 1 ;
        XaltVal = Math.floor(Math.random() * canvas_W) + 1; 
        YaltVal = Math.floor(Math.random() * canvas_H/2) + 1 ;
        Yval = Math.floor(Math.random() * canvas_H/2) + 1 ;

    } else if (gameLevel == 4 ) {
        // grass only 
        Xval = Math.floor(Math.random() * canvas_W) + 1 ;
        XaltVal = Math.floor(Math.random() * canvas_W) + 1; 
        YaltVal = canvas_H - Math.floor(Math.random() * canvas_H/2) - 30;
        Yval = canvas_H - Math.floor(Math.random() * canvas_H/2) - 30;
    } else {
        Xval = Math.floor(Math.random() * canvas_W) + 1 ;
        XaltVal = Math.floor(Math.random() * canvas_W) + 1;    
        YaltVal = Math.floor(Math.random() * canvas_H) + 1 ;
        Yval = Math.floor(Math.random() * canvas_H) + 1 ;
    }


    mancard.x = Xval;
    mancard.y = Yval;
    ladycard.x = XaltVal;
    ladycard.y = YaltVal;
    fadeInMale.start();
    fadeInLady.start();
}
function listener(target) {
    console.log('supa');
    console.log(target.name);
    var itemName = target.name;
    target.alpha = 1;
    console.log(itemName);
    if (itemName == 'male') {
        horse.play();
        fadeAwayMale.start();
        gameTimer += 5;
        console.log(pairStatus);
        if (pairStatus == 0 ) {
            pairStatus = 1;
        } else {
            console.log('split it'); 
            setTimeout(reloadIcons, 500);   
        }
    } else if (itemName == 'female') {
        sugar.play();
        fadeAwayLady.start();
        console.log(pairStatus);
        gameTimer += 5;
        if (pairStatus == 0 ) {
            pairStatus = 1;
        } else {   
            console.log('doing it');
            setTimeout(reloadIcons, 500);           
        }
    }
    
}
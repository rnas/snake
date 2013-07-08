/* Javascript snake

About	: A simple snake game made with javascript
Author	: Raphael Naswaty - rnas[at]outlook[dot]com

*/
var total_x = 20, total_y = 20; // Size of game
var dirY = 0, dirX = size = 1;	// Default options
var direction_lock = false;

// initialize base array
var parts = new Array(total_x+1);
for (i=0; i <= total_x; i++) 
	parts[i] = new Array(total_y+1);

// draw game base
function start(){
	for (i=1;i<=total_x;i++){
		for (j=1;j<=total_y;j++){
			if ((i==1) || (i==total_x) || (j==1) || (j==total_y)){
				document.write('<img src=\"images/part.png\" id=\"'+i+','+j+'\" />');
				parts[i][j]='999';
			} else {
				document.write('<img src=\"images/bart.png\" id=\"'+i+','+j+'\" />');
				parts[i][j]='0';
			}
		}
		document.write('<br />');
	}
	startPosition();
	spawnCoin();
	return move();
}
// movement - dont allow more than one direction in the same move
function setDirection(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (direction_lock) return;
	else if (charCode==37) direction( 0,-1);
	else if (charCode==39) direction( 0, 1);
	else if (charCode==38) direction(-1, 0);
	else if (charCode==40) direction( 1, 0);
	direction_lock = true;
}
// player cant go backwards
function direction(x, y){ 
	if (((dirX != 0) && (!x)) || ((dirY != 0) && (!y))) {  
		dirX = x;
		dirY = y;
	}
}
// update the texture of a specific point 
function paint(x, y, value){
	document.getElementById(x + ',' + y).src = textureName(value);
	parts[x][y]=value;
}
// returns texture name according to value conventions
function textureName(value){
	if (value == 10000) return 'images/mart.png';
	return (value == 0) ? 'images/bart.png' : 'images/part.png';
}
// draw start point
function startPosition(){
	paint(4,4,1);
}
// generate a new coin on a random neutral position
function spawnCoin() {
	do {
		randomX = parseInt(Math.floor(Math.random()*(total_x-2))+2);
		randomY = parseInt(Math.floor(Math.random()*(total_x-2))+2);
	} while (parts[randomX][randomY] != 0)
	paint(randomX,randomY,10000);
}
// update score
function writeScore(){
	document.getElementById('score').innerHTML = (size - 1) * 10;
	spawnCoin();
}
// update movement
function move(){
	for (x=2;x<=total_x-1;x++)
		for (y=2;y<=total_y-1;y++){
			if (parts[x][y] == size){
				if (parts[x+dirX][y+dirY]==10000){
					paint(x + dirX,y + dirY,++size + 1);
					writeScore();
				} else if(parts[x+dirX][y+dirY]==0)
					paint(x + dirX,y + dirY,size + 1);
				else return alert('You loose :(');
			}
			if ((parts[x][y] == 1)) paint(x,y,0);
		}
	for (x=2;x<=total_x-1;x++)
		for (y=2;y<=total_y-1;y++)
			if ((parts[x][y] > 1) && (parts[x][y] < 999))
				parts[x][y] = parts[x][y] - 1;
	direction_lock = false;
	return setTimeout('move()',100);
}

let canvas = document.getElementById("snake"); //É o start de tudo
let context = canvas.getContext("2d");
let box = 32;
let snake =[]; //Determina a cobra como uma lista, adicionando quadrados e retirando continuamente
snake[0] = {
    x:8 * box,
    y:8 *box
}

let direction = "right";
let food = { //Instrução para que a mesma apareça em pontos aleatórios do mapa
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box 
}
function criarBG() { //Cria o cenário do jogo
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha(){ //Como o próprio nome diz, é a instrução para criar o réptil
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood () { //Função para criar a comida
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){ //Função para fazer com que ao sair da tela do jogo, a cobrinha reapareça no canto contrário
    if(event.keyCode ==37 && direction != 'right') direction = 'left';
    if(event.keyCode ==38 && direction != 'down') direction = 'up';
    if(event.keyCode ==39 && direction != 'left') direction = 'right';
    if(event.keyCode ==40 && direction != 'up') direction = 'down';
}

function IniciarJogo(){
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake [0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction =='up') snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(Jogo);
            alert('Game Over:(');
        }
    }    
}

criarBG();
criarCobrinha();
drawFood();

let snakeX = snake[0].x;
let snakeY = snake[0].y;

if(direction == "right") snakeX += box;
if(direction == "left") snakeX -= box;
if(direction == "up") snakeY -= box;
if(direction == "down") snakeY += box;

if(snakeX != food.x || snakeY != food.y){
    snake.pop(); //É o efeito de "movimento" da cobrinha. Retirando o último elemento da lista
}else{
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
}

let newHead = {
    x: snakeX,
    y:snakeY
}

snake.unshift(newHead); //Adiciona o primeiro quadradinho da cobra

let jogo = setInterval(iniciarJogo, 100);
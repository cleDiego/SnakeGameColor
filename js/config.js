//inicialização das variaveis de configuracação do jogo
const
canvas = $("#snake")[0], //area util para desenho
ctx = canvas.getContext("2d"); //contexto para desenho

var
tamRect = Number($("#tamRect").val()), //tamanho do retangulo
pause = false, //variavel para pausar o jogo
vgameOver = false, //variavel para identificar se houve gameOver
interval, //variavel para intervalar as execuções
dir = "d", //variavel para a direcao
drawing = true, //variavel para saber se a snake esta sendo desenhada
speed = $("#dificuldade").val(); //velocidade do jogo
timeFood = 0; //contador de tempo para adicionar novas comidas
paleta = ["#000", "#fff", "#0061ff", "#ff0000", "#f2ff00", "#00ff26", "#00faff", "#ff00d0"];
inPower = false,
timePower = 0;
timePowerInterval = 100;
controlColor = false;
sounds = true,
snake = new Fila(), //snake usando a implementação manual da fila
foods = new Array(), //comidas
powers = new Array(), //poderes
xm = $(window).width(), //tamanho máximo na horizontal eixo x
ym = $(window).height(); //tamanho máximo na vertical eixo y

//songs
var bgSound = $("#bgSound")[0]; //som de fundo looping
bgSound.volume = 0.6; //volume do som de fundo
var collisionSoundWalls = $("#collisionSoundWalls")[0]; //som de colisão com as paredes
collisionSoundWalls.volume = 1;
var eatFood = $("#eatFood")[0]; //som para comida
eatFood.volume = 1;
var eatFoodError = $("#eatFoodError")[0]; //som para comida da mesma cor da cabeça
eatFoodError.volume = 1;
var powerUP = $("#powerUP")[0]; //som de power iniciado
powerUP.volume = 1;
var powerDown = $("#powerDown")[0]; //som de poder finalizado
powerDown.volume = 1;

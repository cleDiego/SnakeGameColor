/*************************************************************/
/*  SNAKE.JS                                                **/
/*  Snake Controller                                        **/
/*  Create by: Cleverson Diego Vieira                       **/
/*  Oriented by: Professor Dr. Luiz Antônio Pereira Neves   **/
/*  Universidade Federal do Paraná                          **/
/*  Prof. Dr. Luiz Antônio Pereira Neves                    **/
/*  Last Modified: 01/06/2019                               **/
/*************************************************************/


/******* drawSnake
Realiza a impressao da snake e o controle para que as posições sejam obedecidas
Como funciona?
Apenas a primeira parte denominada cabeca da snake recebe valores x e y e realiza os movimentos
As demais recebem os valores x e y uma de cada vez, ou seja em cada drawSnake ocorre uma passada posicoes.
Onde:
Cabeça[0] passa sua posição para a proxima parte[1] e realiza o movimento
Parte[1] passa sua posição para parte 2 e recebe a posicao da cabeça
Parte[2] passa sua posição para parte 3 e recebe a posição da parte[2]
e assim sucessivamente e fim da snake
*******/
//corrigindo o tamanho da tela
canvasResize();
function drawSnake(){
  drawing = true;
  if(snake.size == 0) gameOver();
  let move = {x: snake.getElem().x, y: snake.getElem().y};
  snakePartMove(snake.getElem(), dir);
  if(isColision(snake.getElem())) gameOver();
  for(let i = snake.begin; i < snake.size+snake.begin; i++){
    let v = snake.v[i];
    if(i > snake.begin){
      let guarda = {x: v.x, y: v.y};
      v.x = move.x;
      v.y = move.y;
      move = {x: guarda.x, y: guarda.y};
    }
    drawPart(v);
  }
  drawing = false;
}

/******* drawFoods
Para imprimir as comidas não necessitamos de controle apenas imprimir nas posições vigentes
*******/
function drawFoods(){
  for (let [k, v] of Object.entries(foods)) {
    let i = Number(k);
    drawPart(v);
  }
}

/******* drawPowers
Para imprimir os poderes, porém o pode será impresso de forma diferente
logo não usaremos drawPart e drawPower
*******/
function drawPowers(){
  for (let [k, v] of Object.entries(powers)) {
    let i = Number(k);
    drawPower(v);
  }
}

/******* drawPart(elem) recebe uma parte da snake ou da comida para impressao
Apenas pota na tela o elemento recebido em sua posicao
*******/
function drawPower(elem){
  ctx.beginPath();
  ctx.rect(elem.x, elem.y, tamRect, tamRect);
  ctx.fillStyle = colorRandom();
  ctx.strokeStyle = colorRandom();
  ctx.fill();
  ctx.stroke();
}

/******* drawPart(elem) recebe uma parte da snake ou da comida para impressao
Apenas pota na tela o elemento recebido em sua posicao
*******/
function drawPart(elem){
  ctx.beginPath();
  ctx.rect(elem.x, elem.y, tamRect, tamRect);
  ctx.fillStyle = elem.c;
  if(inPower){
    ctx.strokeStyle = colorRandom();
  }else{
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  }
  ctx.fill();
  ctx.stroke();
}

/******* snakePartMove(elem) recebe uma parte da snake comida e a direcao
A função foi feita para receber qualquer posicao, mas recebera apenas a posicao cabeça
Conforme a direcao aumenta ou reduz x ou y direto no elemento
*******/
function snakePartMove(elem, dir){
  switch (dir) {
    case "c": elem.y -= tamRect; break;
    case "b": elem.y += tamRect; break;
    case "e": elem.x -= tamRect; break;
    case "d": elem.x += tamRect; break;
  }
}

/******* createFood()
Aqui criamos as novas comidas, definimos que sempre que o tempo for atingido uma nova comida sera criada
O local será aleatorio evitando os limites da tela onde é mais dificil pegar a comida
Aqui foodIsOnSnake cuida para que a comida não seja criada em cima da snakePartMove
e foodIsOnFood cuida para que as comidas não fiquem sobrepostas
*******/
function createFood() {
  let foodX = randomTen(tamRect, xm - tamRect*2);
  let foodY = randomTen(tamRect, ym - tamRect*2);
  for(let i = snake.begin; i < snake.size+snake.begin; i++){
    let v = snake.v[i];
    const foodIsOnSnake = v.x == foodX && v.y == foodY
    if (foodIsOnSnake) createFood();
  }
  foods.forEach(function isFoodOnFood(part) {
    const foodIsOnFood = part.x == foodX && part.y == foodY
    if (foodIsOnFood) createFood();
  });
  powers.forEach(function isFoodOnPower(part) {
    const foodIsOnPower = part.x == foodX && part.y == foodY
    if (foodIsOnPower) createFood();
  });
  foods.push({c: colorRandom(), x: foodX, y: foodY});
}

/******* createPower()
Aqui criamos as novos poderes
a função funciona similarmente a funcção anterior createFood
Porém daremos outro tratamento crashPower()
**Possbilidades de juntar as funcoes createFood & createPower
*******/
function createPower() {
  let powerX = randomTen(tamRect, xm - tamRect*2);
  let powerY = randomTen(tamRect, ym - tamRect*2);
  for(let i = snake.begin; i < snake.size+snake.begin; i++){
    let v = snake.v[i];
    const powerIsOnSnake = v.x == powerX && v.y == powerY
    if (powerIsOnSnake) createPower();
  }
  foods.forEach(function isPowerOnFood(part) {
    const powerIsOnFood = part.x == powerX && part.y == powerY
    if (powerIsOnFood) createPower();
  });
  powers.forEach(function isPowerOnPower(part) {
    const powerIsOnPower = part.x == powerX && part.y == powerY
    if (powerIsOnPower) createPower();
  });
  powers.push({x: powerX, y: powerY});
}

/******* isColision(elem) rebebe o elemento a ser verificado
Neste caso vai receber a comida e vai comparala com as posicao x e y da cabeca da snake
A primeira verificação é para as paredes
A segunda snakeIsOnSnake verifica se colidiu com a propria snake
e a terceira snakeIsOnFood verifica se snake colidiu com a comida
  para este caso uma outra fucção será chamada crashFood(k, v) passando os dados da comida
  em crashFood será verificado se a cor da comida coincide com a cabeça da snake
  e decidira o que será feito em cada caso
********/
function isColision(elem) {
  if(elem.x < 0 || elem.x > xm || elem.y < 0 || elem.y > ym){
    if(sounds) collisionSoundWalls.play();
    return true;
  }
  for(let i = snake.begin+3; i < snake.size+snake.begin; i++){
    let v = snake.v[i];
    const snakeIsOnSnake = v.x == elem.x && v.y == elem.y
    if (snakeIsOnSnake){
      if(sounds) collisionSoundWalls.play();
      return true;
    }
  }
  for (let [k, v] of Object.entries(foods)) {
    const snakeIsOnFood = v.x == elem.x && v.y == elem.y
    if (snakeIsOnFood){
        crashFood(k, v);
        return false;
    }
  }
  for (let [k, v] of Object.entries(powers)) {
    const snakeIsOnPower = v.x == elem.x && v.y == elem.y
    if (snakeIsOnPower){
        crashPower(k, v);
        return false;
    }
  }
  return false;
}

/******* crashFood(pos, elem) recebe a posicao da comida e a propria comida
Remove a comida pois a snake colidiu com a memsa
Testa as cores e caso a cor da comida seja igual a cor da cabeça da cobra remove da Fila
  neste caso como a estrutura de fila esta sendo utilizada o elemento a mais tempo será removido
Caso contrário um novo elemento é adicionado a snake neste caso no final
********/
function crashFood(pos, elem){
  foods.splice(Number(pos), 1); //remove a comida do array
  if(elem.c == snake.v[snake.begin].c){
    //perde a cabeça
    if(sounds){
      eatFoodError.load();
      eatFoodError.play();
    }
    snake.remove(); //remove o elemento a mais tempo da fila
  }else{
    //adicionar
    if(sounds){
      eatFood.load();
      eatFood.play();
    }
    snake.insert({c: elem.c, x: 0, y: 0}); //insere um novo elemento ao fim da fila
  }
}

function crashPower(pos, elem){
  powers = new Array();
  if(sounds){
    powerUP.load();
    powerUP.play();
  }
  for (let [k, v] of Object.entries(foods)) {
    snake.insert({c: v.c, x: snake.v[snake.size-1].x, y: snake.v[snake.size-1].y});
  }
  foods = new Array();
}

/******* colorRandom()
Função para obter uma cor randomida do array paleta de cores
********/
function colorRandom(){
  return paleta[Math.floor(Math.random()*paleta.length)];
}

/******* randomTen() recebe min e max repassados pela função createFood
Função para obter un numero randomico entre o min e max repassado
Servira para plotar a comida em uma posição aleatoria da tela
********/
function randomTen(min, max) {
  return Math.round((Math.random() * (max-min) + min) / tamRect) * tamRect;

}

/******* canvasResize()
Função para idetificar o tamanho ideal que o canvas deve ter em relação ao tamanho da tela
A idéia é preencher toda a tela
Porém como cada parte das snake possui um tamanho(default=10px) devemos cuidar
para que o eixo x e y seja divisivel pelo tamanho
Além disso nesta funcção foi adicionado as funções de limpeza da tela
e a crição do grid na tela, esse ajuda o jogador a decidir quando mudar a snake de posição, serve como um norte
********/
function canvasResize(){
  xm = $(window).width();
  ym = $(window).height();
  while(xm % tamRect != 0){xm--;}
  while(ym % tamRect != 0){ym--;}
  $("#snake").width(xm);
  $("#snake").height(ym);
  canvas.width = xm;
  canvas.height = ym;
  var mgt = $(window).height()-ym-2;
  if(mgt > 0) mgt/2;
  $("#snake").css("margin-top", mgt);
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fillRect(0, 0, xm, ym);
  for(let x = 0.5; x < xm; x += tamRect) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ym);
  }
  for(let y = 0.5; y < ym; y += tamRect) {
    ctx.moveTo(0, y);
    ctx.lineTo(xm, y);
  }
  ctx.stroke();
}

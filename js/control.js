/*************************************************************/
/*  CONTROL.JS                                                **/
/*  Game Controller                                        **/
/*  Create by: Cleverson Diego Vieira                       **/
/*  Oriented by: Professor Dr. Luiz Antônio Pereira Neves   **/
/*  Universidade Federal do Paraná                          **/
/*  Prof. Dr. Luiz Antônio Pereira Neves                    **/
/*  Last Modified: 01/06/2019                               **/
/*************************************************************/


/******* keydown
Listener para as teclas, quando o usuario teclar passa por aqui e executa algo se a tecla coincidir
com o que foi definido
*******/
$(window).keydown(function(e){
  switch (e.keyCode) {
    case 38: if(dir != "b" && dir != "c" && !drawing){dir = "c";} break;
    case 40: if(dir != "c" && dir != "b" && !drawing){dir = "b";} break;
    case 37: if(dir != "d" && dir != "e" && !drawing){dir = "e";} break;
    case 39: if(dir != "e" && dir != "d" && !drawing){dir = "d";} break;
    case 27: gamePause(); e.preventDefault(); break; //esc
    case 13: $(".start").click(); e.preventDefault(); break; //enter
    case 82: snake.removeFila(); break;
    case 65: snake.insere({c: colorRandom(), x: 0, y: 0}); break;
  }
});

/******* [button].click
Quando o usuario clicar no botão iniciar esse cara será acionado
Algumas variaveis serão redefinidas e a funcao start será de fato chamada
*******/
$(".start").click(function(){
  $(".msg").css("margin-top", "0");
  $(".msg").width(xm);
  $(".msg").height(ym);
  $("#gameOver").fadeOut("slow");
  $("#fimJogo").html("JOGANDO");
  $(".resume").fadeIn("medium");
  start();
});

/******* start()
Define o intervalo de atualização e cada intervalo chama as funcões na squencia
*******/
function start(){
  interval = window.setInterval(function(){
    if(!pause && !vgameOver){
      canvasResize();
      drawSnake();
      drawFoods();
      drawPowers();
      placar();
      timeFood++;
      if(timeFood > Number($("#qtdComida").val()) || foods.size == 0){
        createFood();
        timeFood = 0;
      }
      timePower++;
      if(timePower > timePowerInterval){
        createPower();
        timePower = 0;
      }
    }
  }, speed);
}

/******* [button].click
Quando o usuario clicar em resumir o jogo deve voltar a ocorrer
A variavel pause é responsavel por isso
*******/
$(".resume").click(function(){
  $(".msg").css("margin-top", "0");
  $(".msg").width(xm);
  $(".msg").height(ym);
  $("#gameOver").fadeOut("medium");
  $("#fimJogo").html("JOGANDO");
  pause = false;
});

/******* [button].change
Quando o usuário trocar seleção de fundos deve-se aplicar esete fundo
*******/
$("#bg").change(function(){
  $("#snake").css("background-image", "url('"+$(this).val()+"')");
});

/******* [checkbox].change
Quando o usuário habilitar ou desabilitar o som
*******/
$("#checkboxAudio").change(function(){
  if($(this).is(':checked')){
    sounds = true; //para os efeitos sonoros executarem
    bgSound.play();
  }else{
    sounds = false; //para os efeitos sonoros não executarem
    bgSound.pause(); //pausa o som de fundo
  }
});


/******* gamePause()
A tecla esq deve acionar esta função para pausar o jogo
Aqui deve-se evitar pausar quando game over
*******/
function gamePause(){
  $(".msg").removeAttr("style");
  if(!pause){
    pause = true;
    $("#gameOver").fadeIn("medium");
    $("#fimJogo").html("PAUSADO");
  }else{
    if(interval && !vgameOver){
      $("#gameOver").fadeOut("medium");
      $("#fimJogo").html("JOGANDO");
      pause = false;
    }
  }
}

/******* gameOver
Humm.. Esta função será chamada quando a snake controller identificar que o jogo acabou
*******/
function gameOver(){
  $(".msg").removeAttr("style");
  clearInterval(interval);
  pause = true;
  vgameOver = true;
  $("#gameOver").fadeIn("medium");
  $("#fimJogo").html("GAME OVER<br>Seus Pontos: <b>"+$(".trocaPontos").html()+"</b>");
  $(".resume").hide();
}

/******* keydown
Apenas atualiza o placar final em gamePause e gameOver
*******/
function placar(){
  $(".trocaPontos").html(snake.size*10);
}

/******* redefineVars()
Variaveis que precisam ser redefinidas ao reiniciar
*******/
function redefineVars(){
  pause = false;
  vgameOver = false;
  dir = "d";
  timeFood = 0;
  speed = Number($("#dificuldade").val());
  tamRect = Number($("#tamRect").val()),
  snake = new Fila;
  foods = new Array();
  powers = new Array();
  snake.insert({c: colorRandom(), x: 120, y: 240}); //posição inicial
  snake.insert({c: colorRandom(), x: 0, y: 0});
  snake.insert({c: colorRandom(), x: 0, y: 0});
  clearInterval(interval);
}

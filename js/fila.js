//estrutura de fila para gerenciar os arrays do jogo
//Uma fila com funções de pilha também

function Fila(){
  const maxSize = 20000;
  this.v = new Array();
  this.size = 0;
  this.begin = 0;

  this.insere = function(obj){
    if(!this.full()){
      let pos = (this.begin + this.size) % maxSize;
      this.v[pos] = obj;
      this.size++;
      return obj;
    }else{
      console.log("A fila está cheia!");
    }
  }

  this.removeFila = function(){
    if(!this.empty()){
      let obj = this.v[this.begin];
      this.begin++;
      this.size--;
      return obj;
    }else{
      return false;
    }
  }

  this.getElem = function(i){
    if(!this.empty()){
      if(!i){
        return this.v[this.begin];
      }else{
        return this.v[this.begin+i];
      }
    }else{
      return false;
    }
  }

  this.getElem2 = function(i, j){
    if(!this.empty()){
      if(!i && !j){
        return this.v[this.begin][1].getElem();
      }else{
        return this.v[this.begin+i][1].getElem(j);
      }
    }else{
      console.log("A fila esta vazia");
    }
  }

  this.prox = function(i){
    if(!this.empty()){
      if(i < this.size){
        return this.v[this.begin+i];
      }else{
        return false;
      }
    }else{
      return false
    }
  }

  this.clear = function(){
    while(!this.empty){
      this.removeFila();
    }
    console.log("Fila vazia!");
  }

  this.empty = function(){
    if(this.size == 0){
      return true;
    }else{
      return false;
    }
  }

  this.full = function(){
    if(this.size == maxSize){
      return true;
    }else{
      return false;
    }
  }

  this.removeFilaPop = function(){
    if(this.size > 0){
      let obj = this.v[v.length-1];
      this.v.splice(v.length-1,1);
      return obj;
    }else{
      console.log("Não há elementos na fila.");
    }
  }

  this.removeCorrige = function(index){
    if(this.size > 0){
      let obj = new Fila;
      while(!this.empty){
        if(this.getElem())
        obj.insere(this.removeFilaPop);
      }
      return obj;
    }else{
      return false;
    }

  }

  this.first = function(){
    if(this.size > 0){
      return this.v[this.begin];
    }else{
      return false;
    }
  }

  this.last = function(){
    if(this.size > 0){
      return this.v[this.size-1];
    }else{
      console.log("Não há elementos na fila.");
    }
  }
}

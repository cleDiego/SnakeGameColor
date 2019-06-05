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
      return false;
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
      return false;
    }
  }
}

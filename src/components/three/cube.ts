import ng = require('angular2/angular2');

@ng.Component({
    selector:'cube'
})

@ng.View({
    template:require('./cube.html'),
    directives:[Cube]
})

export class Cube{
  color:number = 0x00ff00;
  constructor(){
    setInterval(()=>{
        this.color ++;
    },100)
  }
}

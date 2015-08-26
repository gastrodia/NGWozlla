import {Component, View ,NgFor} from 'angular2/angular2';
import {Scene} from './scene';
@Component({
  selector: 'game',properties:['a','b','c']
})

@View({
  template:require('./game.html'),
  directives:[Scene]
})


export class Game {
  constructor(){

  }

  update(){
    console.log('update' + arguments);
  }
}

import {Component, View ,NgFor} from 'angular2/angular2';
import {Scene} from './scene';
@Component({
  selector: 'game'
})

@View({
  template:require('./game.html'),
  directives:[Scene]
})


export class Game {
  constructor(){

  }
}

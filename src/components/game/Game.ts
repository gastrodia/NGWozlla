import {Component, View ,NgFor} from 'angular2/angular2';
import {Scene} from '../scene/Scene';
@Component({
  selector: 'game'
})

@View({
  template:`
    <scene></scene>
  `,
  directives:[Scene]
})


class Game {
  constructor(){

  }
}

export = Game;

import ng = require('angular2/angular2');
import {Cube} from './cube';
@ng.Component({
  selector:'scene'
})

@ng.View({
  template:require('./scene.html'),
  directives:[Cube]
})

export class Scene{

}

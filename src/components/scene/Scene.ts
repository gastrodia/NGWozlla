import ng = require('angular2/angular2');
import Button = require('../wozlla/button/Button')
@ng.Component({
  selector:'scene'
})

@ng.View({
  template:require('./scene.html'),
  directives:[Button]
})

export class Scene{
  constructor(){
    console.log('scene init');
  }
}

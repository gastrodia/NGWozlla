import ng = require('angular2/angular2');

@ng.Component({
  selector:'scene'
})

@ng.View({
  template:require('./scene.html'),
  directives:[]
})

export class Scene{
  constructor(){
    console.log('scene init');
  }
}

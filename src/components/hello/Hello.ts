import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'hello'
})

@View({
  template:'<div><ng-content></div>',
  directives:[]
})



export class Hello {
  constructor(){
    console.log('hello Component init...............................!!!!!!!!!!!')
  }
}

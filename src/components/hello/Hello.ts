import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'hello'
})

@View({
  template:'<div>hello</div>',
  directives:[]
})



export class Hello {
  constructor(){
    console.log('hello Component init...............................!!!!!!!!!!!')
  }
}

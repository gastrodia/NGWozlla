import {Component, View} from 'angular2/angular2';
import {Hello} from '../hello/Hello';
@Component({
  selector: 'app'
})

@View({
  template:'<div>angular2 <hello></hello></div>',
  directives:[Hello]
})



class Application {
  constructor(){
    console.log('app loaded...........!!')
  }
}

export = Application;

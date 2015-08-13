import {Component, View ,NgFor} from 'angular2/angular2';
import {Hello} from '../hello/Hello';
@Component({
  selector: 'app'
})

@View({
  template:`
  <ul>
    <li *ng-for="#greet_num of greetings; #i = index">
      <hello>hi, {{greet_num}}</hello>
    </li>
  </ul>
  `,
  directives:[Hello,NgFor]
})


class Application {
  greetings:Array<number>;
  constructor(){
    var greet_num = 1;
    var isAdded = false;
    var max = 10;
    this.greetings = [greet_num]
    console.log('app loaded...........!!');

    var t = setInterval(()=>{
      if(greet_num<max){
        greet_num += 1;
        if(isAdded){
          console.log('remove greeting');
          this.greetings.splice(this.greetings.length - 1);
        }else{
          console.log('add greeting');
          this.greetings.push(greet_num);
        }
        isAdded =  !isAdded;
      
      }else{
        clearInterval(t);
      }

    },100);
  }
}

export = Application;

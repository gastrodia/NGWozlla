import ng = require('angular2/angular2');

@ng.Component({
  selector:'btn'
})

@ng.View({
  template:require('./button.html')
})
class Button{

}

export = Button;

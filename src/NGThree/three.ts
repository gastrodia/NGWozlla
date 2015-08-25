import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
export var DOM = new BrowserDomAdapter();

export const NG_BINDING_CLASS_SELECTOR = '.ng-binding';
export const NG_BINDING_CLASS = 'ng-binding';

export const EVENT_TARGET_SEPARATOR = ':';

export const NG_CONTENT_ELEMENT_NAME = 'ng-content';
export const NG_SHADOW_ROOT_ELEMENT_NAME = 'shadow-root';

import $ = require('jquery');

function copyGameObjFromJquery($dom:JQuery,parentGameObj,director:WOZLLA.Director){
        var $objs =  $dom.children('game-object');
        $objs.each((index,obj)=>{
          var $obj:JQuery = $(obj);
          var gameObj = director.createGameObject();
          if($obj.attr('touchable') == "true"){
            gameObj.touchable = true;
          }

          if($obj.attr('transform')){
            var transform = $obj.attr('transform');
            let splitList:[number] = <any>transform.split(',');
            gameObj.transform.setPosition(splitList[0]*1,splitList[1]*1);
          }

          var spriteAtlas = $obj.attr('spriteAtlas');

          var $components = $obj.children('game-component').children();
          $components.each((index,component)=>{
            var $component:JQuery = $(component);
            console.log(component)

            var tagName = component.tagName.toLocaleLowerCase();
            if(tagName == 'wozlla-button'){
              var button = new WOZLLA.component.Button();
              if($component.attr('spriteAtlas')){
                button.spriteAtlas.set($component.attr('spriteAtlas'));
              }else{
                button.spriteAtlas.set(spriteAtlas);
              }

              if($component.attr('align')){
                button.align.set($component.attr('align'));
              }

              if($component.attr('valign')){
                button.valign.set($component.attr('valign'));
              }

              if($component.attr('normalSpriteName')) {
                button.normalSpriteName.set($component.attr('normalSpriteName'));
              }

              if($component.attr('pressedSpriteName')){
                  button.pressedSpriteName.set($component.attr('pressedSpriteName'));
              }

              if($component.attr('disabledSpriteName')){
                  button.disabledSpriteName.set($component.attr('disabledSpriteName'));
              }


              gameObj.addComponent(button);
            }

            if(tagName == 'rect-collider'){
                var rectCollider = new WOZLLA.component.RectCollider();

                if($component.attr('region')){
                  var region = $component.attr('region');
                  let splitList:[number] = <any>region.split(',');

                  rectCollider.setRegion(splitList[0]*1, splitList[1]*1, splitList[2]*1, splitList[3]*1);
                }
                gameObj.addComponent(rectCollider);
            }
          });

          parentGameObj.addChild(gameObj);

          if($obj.children('game-object').length > 0){
            copyGameObjFromJquery($obj,gameObj,director);
          }
        })





}

function threeObjectFactory(domTree:Node,director:WOZLLA.Director):WOZLLA.GameObject{
      var $dom = $(domTree);
      var sceneObj = director.createGameObject();
      copyGameObjFromJquery($dom.find('scene'),sceneObj,director);
      return sceneObj;
}

export class ThreeView{
    constructor(private protoView: any, private inplaceElement: HTMLElement){
      console.log('WozllaView Init..!')
    }

    getTemplateStr(){
      var template = <any>this.protoView.cloneableTemplate.innerHTML;
      console.log(template);
    }

    getDomTree():Node{
        var cloneableTemplate = (<any>this.protoView).cloneableTemplate;
        var isSingleElementChild = (<any>this.protoView).isSingleElementChild;
        var templateContent = DOM.content(cloneableTemplate);
        templateContent = DOM.importIntoDoc(templateContent);
        var treeContent = DOM.clone(templateContent);
        return treeContent;
    }

    GameObject(){

    }

    run(){
      var domTree = this.getDomTree();

      //var $canvas = $('<canvas id="main" width="800" height="800" style="background-color: #000000;"></canvas>');
      var director = new WOZLLA.Director(document.getElementById('main'));
      director.start();

      var gameObj = threeObjectFactory(domTree,director);

      gameObj.loadAssets(function() {
          gameObj.init();
          director.stage.addChild(gameObj);
      });


    }
}

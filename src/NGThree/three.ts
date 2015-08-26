import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
export var DOM = new BrowserDomAdapter();

export const NG_BINDING_CLASS_SELECTOR = '.ng-binding';
export const NG_BINDING_CLASS = 'ng-binding';

export const EVENT_TARGET_SEPARATOR = ':';

export const NG_CONTENT_ELEMENT_NAME = 'ng-content';
export const NG_SHADOW_ROOT_ELEMENT_NAME = 'shadow-root';

import $ = require('jquery');

function camelCase(s) {
  return (s||'').toLowerCase().replace(/(\b|-)\w/g, function(m) {
    return m.toUpperCase().replace(/-/,'');
  });
}

function newCall(Cls,args) {

    return new (Function.prototype.bind.apply(Cls,[null].concat(args)));
    // or even
    // return new (Cls.bind.apply(Cls, arguments));
    // if you know that Cls.bind has not been overwritten
}

function getGameObjFromJquery($dom:JQuery,parent?:any){
        var $objs =  $dom.children();
        if(!parent){
          parent = {
            scene:null,
            query:function(name){
              if(name == 'scene'){
                return parent['scene'];
              }else{
                var scene =  parent['scene'];
                return scene.getObjectByName(name, true );
              };
            }
          }
        }
        console.log($objs);
        $objs.each((index,obj)=>{
          let $obj = $(obj);

          let tagName = camelCase($obj.prop("tagName"));

          if(tagName!="Game"){
            if(tagName == "Scene"){
              let scene = new THREE.Scene();
              parent.scene = scene;

              getGameObjFromJquery($obj,scene);
            }else{

              if(THREE[tagName]){
                console.log(tagName);
                if(tagName == "Mesh"){

                    var geometry  = newCall(THREE.BoxGeometry,  $obj.children('box-geometry').text().split(','));
                    var colorStr = $obj.children('mesh-basic-material').attr('color');
                    console.log(colorStr);
                    colorStr = colorStr.split('0x').pop();
                    var color = parseInt(colorStr,16);
                    console.log(color.toString(16));
              			var material =  new THREE.MeshBasicMaterial( { color:color } );
              			var mesh = new THREE.Mesh( geometry, material );
                    mesh.name = $obj.attr('name');
              			parent.add(mesh);
                }

              }else{
                getGameObjFromJquery($obj,parent);
              }

            }
          }else{
            getGameObjFromJquery($obj,parent);
          }



        });

        return parent;
}

function getGameObjFromDomTree(domTree:Node){
  console.log(domTree);
  var topObject = getGameObjFromJquery($(domTree));
  console.log(topObject);
  return topObject;
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



      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );

      var gameObj:any = getGameObjFromDomTree(domTree);
      var scene = gameObj.query('scene');
      console.log(scene);

      var cube = gameObj.query('cube');
      console.log(cube);
      camera.position.z = 5;

      var render = function () {
        requestAnimationFrame( render );

        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
      };

      render();
    }
}

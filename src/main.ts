/// <reference path="../typings/tsd.d.ts"/>
console.log('main');
import {wozllaEngineBootstrap} from './NGWozlla/application';
import {Inject, Component, View, NgIf, NgFor} from 'angular2/angular2';
import {LifeCycle} from '../deps/angular/modules/angular2/src/core/life_cycle/life_cycle';
var lifeCycle: LifeCycle = null;
import Application = require('./components/application/Application')

console.log('BOOTSTRAPPING...');
    wozllaEngineBootstrap(Application, []).then((appRef) => {
        console.log('ANGULAR BOOTSTRAP DONE.');
        try {
            lifeCycle = appRef.injector.get(LifeCycle);
            console.log('Got lifecycle: ' + lifeCycle);
        } catch (e) {
            console.log('Error getting lifecycle: ' + e.message + '\n' + e.stack);
        }
    }, (err) =>{
        console.log('ERROR BOOTSTRAPPING ANGULAR');
        let errorMessage = err.message + "\n\n" + err.stack;
        console.log(errorMessage);

    });

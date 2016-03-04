'use strict';
import clor from 'clor';

export function success(message){

  clor.green.bold.log(`Success log: ${message}`);
}

export function error(message){

  clor.red.bold.log(`Error at crawling data: ${message}`);
}

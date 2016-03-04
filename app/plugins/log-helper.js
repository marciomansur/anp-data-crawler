'use strict';
import $ from 'clor';

export function success(message){

  $.bold.green(`Success log: ${message}`);
}

export function error(message){

  $.bold.red(`Error at crawling data: ${message}`);
}

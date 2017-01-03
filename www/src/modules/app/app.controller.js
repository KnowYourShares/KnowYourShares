'use strict';

module.exports = /*@ngInject*/
  function appController(roundService) {
    console.log('our controller!');
    roundService.createRound();
  };

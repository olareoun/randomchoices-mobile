var APP = {};

APP.init = function(){
    APP.gameController = new APP.controllers.AppController();
};

$(function() {
  APP.init();
});
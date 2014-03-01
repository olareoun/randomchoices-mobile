var APP = {};

APP.init = function(){
    APP.appController = new APP.controllers.AppController();
};

$(function() {
  APP.init();
});
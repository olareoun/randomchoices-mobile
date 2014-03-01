var APP = {};

APP.SPEED_DEFAULT = 250;

APP.generator = function(howMany){
	return {
		get: function(){
			return Math.floor((Math.random() * howMany) + 1) - 1
		} 
	}
};

APP.init = function(){
    APP.gameController = new APP.controllers.GameController();
};

$(function() {
  APP.init();
});
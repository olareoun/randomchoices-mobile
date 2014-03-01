(function(ns){

    ns = ns || {};
    ns.controllers = ns.controllers || {};

    ns.controllers.AppController = function(){

        var _createChoice = function(choice){
            _choicesWidget.addChoice(choice);
        };

        var _stop = function(){
            clearInterval(APP.timer);
        };

        var _start = function(){
            APP.randomizer = Randomizer.create(APP.generator(_choicesWidget.howMany()), _choicesWidget.howMany());
            APP.randomizer.onRandom(_choicesWidget.update);
            APP.timer = setInterval(APP.randomizer.createRandom, APP.speed || APP.SPEED_DEFAULT);
        };

        var _restart = function(){
            stop();
            _choicesWidget.clear();
        };

        var _choicesWidget = new APP.widgets.ChoicesWidget($('#choices-container'));
        _choicesWidget.onLimitReached(_stop);

        var _addChoiceWidget = new APP.widgets.AppControls($('#add-choice'))
        _addChoiceWidget.onAddChoiceEvent(_createChoice);
        _addChoiceWidget.onStartEvent(_start);
        _addChoiceWidget.onRestartEvent(_restart);

        return {
        }
    };

    return ns;

}(APP));
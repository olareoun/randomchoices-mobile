(function(ns){

    ns = ns || {};
    ns.controllers = ns.controllers || {};

    ns.controllers.AppCtrl = function(){

        var _stop = function(){
            clearInterval(APP.timer);
        };

        var _start = function(){
            _choicesWidget.anyWinnerYet();
            APP.randomizer = Randomizer.create(_choicesWidget.howMany());
            APP.randomizer.onRandom(_choicesWidget.update);
            APP.randomizer.onEnd(_choicesWidget.choiceSelected);
            APP.randomizer.onEnd(_stop);
            APP.randomizer.onEnd(_controlsWidget.show);
            APP.timer = setInterval(APP.randomizer.createRandom, APP.speed || APP.SPEED_DEFAULT);
            _controlsWidget.hide();
        };

        var _restart = function(){
            stop();
            _choicesWidget.clear();
        };

        var _choicesWidget = new APP.widgets.ChoicesWidget($('#choices-container'));

        var _controlsWidget = new APP.widgets.AppControls($('#add-choice'))
        _controlsWidget.onAddChoiceEvent(_choicesWidget.addChoice);
        _controlsWidget.onStartEvent(_start);
        _controlsWidget.onRestartEvent(_restart);

        return {
        }
    };

    return ns;

}(APP));
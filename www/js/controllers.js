(function(ns){

    ns = ns || {};
    ns.controllers = ns.controllers || {};

    ns.controllers.AppCtrl = function(){

        var _start = function(){
            _choicesWidget.anyWinnerYet();
            APP.randomizer = Randomizer.create(_choicesWidget.howMany());
            APP.randomizer.onRandom(_choicesWidget.update);
            APP.randomizer.onEnd(_choicesWidget.choiceSelected);
            APP.randomizer.onEnd(_controlsWidget.show);
            APP.randomizer.start();
            _controlsWidget.hide();
            _choicesWidget.runningMode();
        };

        var _choicesWidget = new APP.widgets.ChoicesWidget($('#choices-container'));

        var _controlsWidget = new APP.widgets.AppControls($('#add-choice'))
        _controlsWidget.onAddChoiceEvent(_choicesWidget.addChoice);
        _controlsWidget.onStartEvent(_start);
        _controlsWidget.onRestartEvent(_choicesWidget.clear);

        return {
        }
    };

    return ns;

}(APP));
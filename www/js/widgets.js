(function(ns){

    ns = ns || {};
    ns.widgets = ns.widgets || {};

    ns.widgets.ChoicesWidget = function(element){

        var _container = element;
        var _choices = [];
        var _listeners = [];

        var _notify = function(){
            _listeners.forEach(function(listener){
                listener();
            });
        };

        var _update = function(percents, times, winnerIndex){
            _choices.forEach(function(choice, index){
                if (index == winnerIndex) choice.currentWinner();
                else choice.currentLooser();
            });
        };

        var _addChoice = function(choice){
            choiceWidget = new APP.widgets.ChoiceWidget(choice);
            _choices.push(choiceWidget);
            _container.append($('<div class="col-sm-4">').append(choiceWidget.toElement()));
        };

        var _choiceSelected = function(winnerIndex){
            _choices[winnerIndex].winner();
        };

        return {
            clear: function(){
                _container.html("");
                _choices.length = 0;
            },
            update: _update,
            howMany: function(){
                return _choices.length;
            },
            addChoice: _addChoice,
            choiceSelected: _choiceSelected
        };

    };

    ns.widgets.ChoiceWidget = function(choice){

        var _container = $('<div class="alert alert-info choice-widget">');
        var _title = $('<span class="choice-text">');
        _title.html(choice);
        _container.html(_title);

        return {
            winner: function(){
                _container.removeClass('choice-current');
                _container.addClass('choice-winner');
            },
            currentWinner: function(){
                _container.removeClass('choice-info');
                _container.addClass('choice-current');
            },
            currentLooser: function(){
                _container.addClass('choice-info');
                _container.removeClass('choice-current');
            },
            toElement: function(){
                return _container;
            }
        };
    };

    ns.widgets.AppControls = function(element){
        var _container = element;
        var _addBtn = _container.find('#add-choice-btn');
        var _choice = _container.find('#choice');
        var _addListeners = [];
        var _startBtn = _container.find('#start');
        var _startListeners = [];
        var _restartBtn = _container.find('#restart');
        var _restartListeners = [];

        var _addChoiceEvent = function(){
            for (var i = _addListeners.length - 1; i >= 0; i--) {
                _addListeners[i](_choice.val());
            };
            _choice.val("");
        };

        var _startEvent = function(){
            for (var i = _startListeners.length - 1; i >= 0; i--) {
                _startListeners[i]();
            };
        };

        var _restartEvent = function(){
            for (var i = _restartListeners.length - 1; i >= 0; i--) {
                _restartListeners[i]();
            };
        };

        _addBtn.on('click', function(ev){
            _addChoiceEvent();
            ev.stopPropagation();
            return false;
        });

        _startBtn.on('click', function(ev){
            _startEvent();
            ev.stopPropagation();
            return false;
        });

        _restartBtn.on('click', function(ev){
            _restartEvent();
            ev.stopPropagation();
            return false;
        });

        return {
            onAddChoiceEvent: function(listener){
                _addListeners.push(listener);
            },
            onStartEvent: function(listener){
                _startListeners.push(listener)
            },
            onRestartEvent: function(listener){
                _restartListeners.push(listener)
            },
            hide: function(){
                _container.hide();
            }
        };
    };

    return ns;
}(APP));
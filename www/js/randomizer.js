var Randomizer = {};

Randomizer.create = function(generator, howMany){
	var times = [];
	var percents = [];
	var _random;
	for (var i = howMany - 1; i >= 0; i--) {
		times[i] = 0;
		percents[i] = 0;
	};

	var counter = 0;
	var listeners = [];

	var update = function(random){
		_random = random;
		times[random] = times[random] + 1;
		percents = percents.map(function(item, index){
			return times[index] * 100 / counter;
		});
		notify();
	};

	var notify = function(){
		for (var i = listeners.length - 1; i >= 0; i--) {
			listeners[i](percents, times, _random);
		};
	};

	return {
		getPercents: function(){
			return percents;
		},
		createRandom: function(){
			var random = generator.get();
			counter++;
			update(random);
		},
		onRandom: function(aListener){
			listeners.push(aListener);
		}
	};
};
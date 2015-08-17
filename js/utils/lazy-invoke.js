var DEFAULT_DELAY_TIME = 50; //ms

module.exports = function (fn, delay) {

	var timer;
	if (typeof delay !== 'number' || delay < 0) {
		delay = DEFAULT_DELAY_TIME;
	}

	return function () {
		var context = this;
		var args = arguments;
		if (timer) clearTimeout(timer);
		timer = setTimeout(function () {
			timer = null;
			fn.apply(context, args);
		}, delay);
	};
};
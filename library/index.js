'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _createPatternFileManager = require('./create-pattern-file-manager');

var _createPatternFileManager2 = _interopRequireDefault(_createPatternFileManager);

var LessPluginPatternImport = (function () {
	function LessPluginPatternImport() {
		var options = arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, LessPluginPatternImport);

		this.minVersion = [2, 1, 1];
		this.defaults = {
			'root': './',
			'patterns': {},
			'basename': 'index.less'
		};

		this.options = Object.assign({}, options);
	}

	_createClass(LessPluginPatternImport, [{
		key: 'install',
		value: function install(less, pluginManager) {
			var PatternFileManager = (0, _createPatternFileManager2['default'])(less);
			pluginManager.addFileManager(new PatternFileManager(this.options));
		}
	}]);

	return LessPluginPatternImport;
})();

exports['default'] = LessPluginPatternImport;
module.exports = exports['default'];
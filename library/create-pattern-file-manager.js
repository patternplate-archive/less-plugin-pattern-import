'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _path = require('path');

function factory(less) {
	var PatternFileManager = (function (_less$FileManager) {
		function PatternFileManager(options) {
			_classCallCheck(this, PatternFileManager);

			_get(Object.getPrototypeOf(PatternFileManager.prototype), 'constructor', this).call(this);
			this.options = options;
		}

		_inherits(PatternFileManager, _less$FileManager);

		_createClass(PatternFileManager, [{
			key: 'supports',
			value: function supports(filename) {
				return !filename.match(/^npm:\/\//) && !filename.match(/^node_modules\//);
			}
		}, {
			key: 'resolve',
			value: function resolve(filename) {
				var _this = this;

				var ext = (0, _path.extname)(filename);
				var reference = (0, _path.basename)(filename, ext);

				var patternFile = this.options.patterns[reference];

				if (!patternFile) {
					throw new Error('Can not resolve dependency: ' + reference);
				}

				var patternDir = (0, _path.dirname)(patternFile);
				var manifest = (0, _path.resolve)(patternDir, 'pattern.json');
				var patternDefinition = undefined;

				try {
					patternDefinition = Object.assign({}, require(manifest).patterns || {});
				} catch (err) {
					err.message = 'Can only resolve to patterns, no valid pattern.json found at ' + patternDir;
					throw err;
				}

				var patterns = Object.keys(patternDefinition).reduce(function (result, key) {
					result[key] = (0, _path.resolve)(_this.options.root, patternDefinition[key], 'index.less');
					return result;
				}, {});

				Object.assign(this.options.patterns, patterns);
				return (0, _path.resolve)(patternFile);
			}
		}, {
			key: 'proxy',
			value: function proxy() {
				var _less$FileManager$prototype$loadFile;

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return regeneratorRuntime.async(function proxy$(context$3$0) {
					while (1) switch (context$3$0.prev = context$3$0.next) {
						case 0:
							return context$3$0.abrupt('return', (_less$FileManager$prototype$loadFile = less.FileManager.prototype.loadFile).call.apply(_less$FileManager$prototype$loadFile, [this].concat(args)));

						case 1:
						case 'end':
							return context$3$0.stop();
					}
				}, null, this);
			}
		}, {
			key: 'loadFile',
			value: function loadFile(reference, directory, options, environment) {
				var rewritten;
				return regeneratorRuntime.async(function loadFile$(context$3$0) {
					while (1) switch (context$3$0.prev = context$3$0.next) {
						case 0:
							rewritten = this.resolve(reference);
							return context$3$0.abrupt('return', this.proxy(rewritten, '', options, environment));

						case 2:
						case 'end':
							return context$3$0.stop();
					}
				}, null, this);
			}
		}], [{
			key: 'isRelativePath',
			value: function isRelativePath(path) {
				return (0, _path.normalize)(path) !== (0, _path.resolve)(path);
			}
		}]);

		return PatternFileManager;
	})(less.FileManager);

	return PatternFileManager;
}

exports['default'] = factory;
module.exports = exports['default'];
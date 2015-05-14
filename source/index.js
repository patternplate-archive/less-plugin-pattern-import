import createPatternFileManager from './create-pattern-file-manager';

class LessPluginPatternImport {
	minVersion = [2, 1, 1];

	defaults = {
		'root': './',
		'patterns': {},
		'basename': 'index.less'
	};

	constructor (options = {}) {
		this.options = Object.assign({}, options);
	}

	install (less, pluginManager) {
		let PatternFileManager = createPatternFileManager(less);
		pluginManager.addFileManager(new PatternFileManager(this.options));
	}
}

export default LessPluginPatternImport;

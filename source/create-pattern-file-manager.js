import {resolve, normalize, basename, extname, dirname} from 'path';

function factory (less) {
	class PatternFileManager extends less.FileManager {
		constructor (options) {
			super();
			this.options = options;
		}

		static isRelativePath (path) {
			return normalize(path) !== resolve(path);
		}

		supports (filename) {
			return !filename.match(/^npm:\/\//) && !filename.match(/^node_modules\//);
		}

		resolve (filename) {
			let ext = extname(filename);
			let reference = basename(filename, ext);

			let patternFile = this.options.patterns[reference];

			if (!patternFile) {
				throw new Error(`Can not resolve dependency: ${reference}`);
			}

			let patternDir = dirname(patternFile);
			let manifest = resolve(patternDir, 'pattern.json');
			let patternDefinition;

			try {
				patternDefinition = Object.assign({}, require(manifest).patterns || {});
			} catch (err) {
				err.message = `Can only resolve to patterns, no valid pattern.json found at ${patternDir}`;
				throw err;
			}

			let patterns = Object.keys(patternDefinition).reduce((result, key) => {
				result[key] = resolve(this.options.root, patternDefinition[key], 'index.less');
				return result;
			}, {});

			Object.assign(this.options.patterns, patterns);
			return resolve(patternFile);
		}

		async proxy (...args) {
			return less.FileManager.prototype.loadFile.call(...[this, ...args]);
		}

		async loadFile (reference, directory, options, environment) {
			let rewritten = this.resolve(reference);
			return this.proxy(rewritten, '', options, environment);
		}
	}

	return PatternFileManager;
}

export default factory;

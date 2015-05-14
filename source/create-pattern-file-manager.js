import {resolve, normalize, basename, extname} from 'path';

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

			let pattern = this.options.patterns[reference];

			if (!pattern) {
				throw new Error(`Can not resolve dependency: ${reference}`);
			}

			return resolve(pattern);
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

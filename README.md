> # ⚠️ Deprecated
> Use instead: https://patternplate.github.io/


less-plugin-pattern-import
--------------------------
Limit less imports to a given root directory, preventing relative imports

## Programmatic usage

```javascript
var NpmImportPlugin = require("less-plugin-pattern-import"),
    options = { plugins: [new PatternImportPlugin({root: './root', patterns: {...}})] };
less.render(css, options)
    .then(...
```

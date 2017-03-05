less-plugin-pattern-import
--------------------------

[![Greenkeeper badge](https://badges.greenkeeper.io/sinnerschrader/less-plugin-pattern-import.svg)](https://greenkeeper.io/)
Limit less imports to a given root directory, preventing relative imports

## Programmatic usage

```javascript
var NpmImportPlugin = require("less-plugin-pattern-import"),
    options = { plugins: [new PatternImportPlugin({root: './root', patterns: {...}})] };
less.render(css, options)
    .then(...
```

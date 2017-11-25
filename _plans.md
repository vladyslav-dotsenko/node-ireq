
# Unit tests:

1. Prepare a list of existig logics.
2. Do unit tests for every existing functionality.
3. Prepare unit tests for new functionality ad go ged BDD.

# Binded root access

Access binded folder's index.js with empty parameter

# Dot case access

I wanna be able to access a sublevel folders.
Kinda:

```
    const ireq = require('ireq');
    ireq.init(/* blah-blah */);
    ireq.bind('module', '/path');
    ireq.module.bindExact('submodule', '/relative/path-to-submodule')
    
    const submodule = ireq.module.submodule('./utilite');
```

# Automated index.js folder aggregator analog

Ok. Cool feature now.

It is common case when you wanna reach some amount of importable files from a directory, but don't want to copy-paste
```
    const x = require('./folder/x');
    const y = require('./folder/y');
    const z = require('./folder/z');
```

Desireable way is:
```
    const { x, y, z } = require('./folder');
```

It is easy to reach with placing `index.js` to `./folder` that aggregates all `files` in folder and re-exports them.
Cool, but it is an automatable lazy job.

... so we can reach this the following code:
```
    const ireq = require('ireq');
    ireq.bind('folder', './folder');
    const { x, y, z } = ireq.folder();
```

I mean, if ireq tryes to load directory and there is no index.js -- it tries to generate and cache index.js-like hash for every file.

OK... GET OVER IT!

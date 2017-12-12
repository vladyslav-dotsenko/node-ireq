# node-ireq
NodeJS require improovement
Module adds requirement biding, relarive to defined project-root path.
Made to remove `'./../../../'` hell in deep-nested module (and bring other tricks).

## Installation
Just install this via NPM
```
$ nmp install ireq --save
```

## Usage
You must initiate module first to define project-root.
```
// index.js
const ireq = require('ireq');
ireq.init(__dirname);
const fs = ireq('fs');
```

## Features

#### Path binding

You can bind any root-relative path to `ireq` propery and use it all around the project;
```
// module.js
const ireq = require('ireq');
ireq.bind('foo', '/path/to/foo');

const bar = ireq.foo('./bar.json');
```
... or unbind those
```
ireq.unbind('foo');
// this line will throw an error that there is no such binding
const bar2 = ireq.foo('bar.json');
```
Use functional syntax if you prefer
```
const bar = ireq.get('foo', './bar.json');
```

#### Nested bindings

`Ireq` allows You to bind nested paths and require them with dot-case:
```
ireq.bind('foo', '/path/to/foo');
ireq.foo.bind('bar', '/long/long/long/path/bar');

const fooModule = ireq.foo('./module.js');      // /path/to/foo/module.js
const barModule = ireq.foo.bar('./module.js');  // /path/to/foo/long/long/long/path/bar/module.js
```

#### Folder lookup

You can access all modules in binded folder with importing a folder itself. All modules accessable by filenames.

No `index.js` needed!

Consider we have following directory tree:
```
.
+-- index.js
+-- utils
|   +-- stringUtils.js
|   +-- numberUtils.js

```

> Notice, there is no index.js in `utils` folder!

Then requirement of util modules will look similar to this code:
```
ireq.bind('utils', '/utils');

const { stringUtils, numberUtils } = ireq.utils('');
// stringUtils contains exports of /utils/stringUtils.js
// numberUtils contains exports of /utils/numberUtils.js
```

## Changelog

*v.1.0* -- Main-module relative binding and importing.

*v.1.1* -- Root path binding and initializing.

*v.2.0* -- Automated index lookup for binded folder, and nested bindings.

## License

Product is shared under [MIT licence](https://github.com/Karponter/node-ireq/blob/master/LICENSE).

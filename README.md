# node-ireq
NodeJS require improovement
Module adds requirement biding, relarive to project's main-file (`main` key in `package.json`).
Made to remove `'./../../../'` hell in deep-nested modules.

## Installation
Just install this via NPM
```
$ nmp install ireq --save
```

## Usage
Once module was required, it creates global variable `ireq`.
```
require('ireq');
ireq('foo.json');
```
Still, you can use it as you always do...
```
const iReq = require('ireq');
iReq('foo.json');
```

## Features
You can bind any main-relative path to `ireq` sub-parameter and use it all around the project;
```
require('ireq');
ireq.bind('foo', '/path/to/foo')
const bar = ireq.foo('bar.json');
```
... or unbind those
```
ireq.unbind('foo');
```
Use functional syntax if you prefer
```
const bar = ireq('foo', 'bar.json');
```

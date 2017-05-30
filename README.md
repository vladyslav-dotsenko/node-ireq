# node-ireq
NodeJS require improovement
Module adds requirement biding, relarive to defined project-root path.
Made to remove `'./../../../'` hell in deep-nested modules.

## Installation
Just install this via NPM
```
$ nmp install ireq --save
```

## Usage
Once module was required, it creates global variable `ireq`.
You must initiate module first to define project-root.
```
require('ireq');
ireq('foo.json');
ireq.init(__dirname);
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
const bar = ireq.get('foo', 'bar.json');
```

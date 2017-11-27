'use strict';

const E = require('./errors');
const fs = require('fs');

const JSExtensionRegExp = /\.(json|js)$/i;

const lookupCache = {};
const lookupFolder = (dirPath) => {
  if (lookupCache[dirPath])
    return lookupCache[dirPath];
  const modules = {};
  fs.readdirSync(dirPath).forEach(function(file) {
    const modulename = file.replace(JSExtensionRegExp, '');
    modules[modulename] = require(dirPath + modulename);
  });
  lookupCache[dirPath] = modules;
  return modules;
};

function _ireq_init(path) {
  this._root = path;
  this._path_mapping = {};
};

function _ireq_bind(module, path) {
  if (!this._root)
    throw new E.NoBindBeforeInitError();
  if (require[module] || this[module])
    throw new E.BindToExistingError(module);
  if (path[0] != '/')
    throw new E.BindPathError(module);
  this._path_mapping[module] = path;
  const node = _ireq_get.bind(this, module);
  node._root = this._root + path;
  node._path_mapping = {};
  node.get = _ireq_get.bind(node);
  node.unbind = _ireq_unbind.bind(node);
  node.bindModule = _ireq_bind.bind(node);
  this[module] = node;
};

function _ireq_unbind(module) {
  delete this._path_mapping[module];
  delete this[module];
};

function _ireq_get(module, file = '') {
  if (!this._root)
    throw new Error(`iReq: You must run ireq.init() before requiring anything`);
  const middlePath = this._path_mapping[module];
  if (!middlePath)
    throw new Error(`iReq: Can't get module "${module}", no binding found`);
  const path = `${this._root}${middlePath}/${file}`;
  if (
    fs.existsSync(path) &&
    fs.lstatSync(path).isDirectory() &&
    !fs.existsSync(path + '/index.js')
  ) {
    return lookupFolder(path);
  }
  return require(path);
};

const _ireq = (module) => {
  return require(module); 
};
_ireq.init = _ireq_init.bind(_ireq);
_ireq.get = _ireq_get.bind(_ireq);
_ireq.unbind = _ireq_unbind.bind(_ireq);
_ireq.bindModule = _ireq_bind.bind(_ireq);

module.exports = _ireq;

'use strict';

const _path_mapping = {};
let _root = null;

const _ireq = module => {
  return require(module); 
};

const _ireq_init = (path) => {
  _root = path;
};

const _ireq_bind = (module, path) => {
  if (require[module])
    throw new Error(`iReq: Can't bind module "${module}", property already exists`);
  if (path[0] != '/')
    throw new Error(`iReq: Can't bind module "${module}", 'path' must start with /`);
  _path_mapping[module] = path;
  require[module] = _ireq[module] = _ireq_get.bind(null, module);
};

const _ireq_unbind = module => {
  delete _path_mapping[module];
  delete require[module];
};

const _ireq_get = (module, file) => {
  if (!_root)
    throw new Error(`iReq: You must run ireq.init() before requiring anything`);
  const middlePath = _path_mapping[module];
  if (!middlePath)
    throw new Error(`iReq: Can't get module "${module}", no binding found`);
  return require(`${_root}${middlePath}/${file}`);
};

_ireq.init = _ireq_init;
_ireq.get = _ireq_get;
_ireq.unbind = _ireq_unbind;
_ireq.bind = _ireq_bind;

module.exports = global.ireq = _ireq;

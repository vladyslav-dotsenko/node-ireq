'use strict';

const _path_mapping = {};

const _ireq = module => {
  return require(module); 
}

const _ireq_bind = (module, path) => {
  if (_ireq[module])
    throw new Error(`iReq: Can't bind module "${module}", property already exists`);
  _path_mapping[module] = path;
  _ireq[module] = _ireq_get.bind(null, module);
}

const _ireq_unbind = module => {
  delete _path_mapping[module];
  delete _ireq[module];
}

const _ireq_get = (module, file) => {
  if (!_path_mapping[module])
    throw new Error(`iReq: Can't get module "${module}", no binding found`);
  return require.main.require(`.${_path_mapping[module]}/${file}`);
}

_ireq.get = _ireq_get;
_ireq.unbind = _ireq_unbind;
_ireq.bind = _ireq_bind;

module.exports = global.ireq = _ireq;

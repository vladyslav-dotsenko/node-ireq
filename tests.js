'use strict';

const chai = require('chai');
chai.use(require('chai-spy'));
const expect = chai.expect;


describe('ireq', () => {

  const ireq = require('./index.js');
  const errors = require('./errors.js');

  it('should proxy normal require', () => {
    expect(ireq('fs').readFileSync).to.be.an.instanceof(Function);
  });

  it('should not break default require', () => {
    expect(require('./testable/index.js')).to.be.true;
    expect(require('./testable/index')).to.be.true;
    expect(require('./testable/')).to.be.true;
    expect(require('./testable')).to.be.true;
    expect(require('./testable/../testable')).to.be.true;
  });

  it('should not allow binding before initiated', () => {
    const tryToBind = () => ireq.bind('one', '/testable');
    expect(new errors.NoBindBeforeInitError()).to.be.instanceof(Error);
    expect(tryToBind).to.throw(errors.NoBindBeforeInitError);
    expect(ireq.one).to.not.exist;
  });

  it('should bind after initiated', () => {
    ireq.init(__dirname);
    const tryToBind = () => ireq.bind('one', '/testable');
    expect(tryToBind).to.not.throw();
    expect(ireq.one).to.be.an.instanceof(Function);
  });

  describe('binded importing', () => {

    it('should import direct filename', () => {
      expect(ireq.one('./index')).to.be.true;
      expect(ireq.one('./index.js')).to.be.true;
      expect(ireq.one('./../testable/index.js')).to.be.true;
      expect(ireq.one('../testable/index.js')).to.be.true;
    });

    it('should import index if no filename specified', () => {
      expect(ireq.one('./')).to.be.true;
      expect(ireq.one('')).to.be.true;
      expect(ireq.one()).to.be.true;
    });

    it('should allow multiple bindings', () => {
      expect(() => ireq.bind('two', '/testable')).to.not.throw();
      expect(ireq.two).to.be.an.instanceof(Function);
      expect(ireq.two()).to.be.true;
    });

    it('should unbind', () => {
      ireq.unbind('two');
      expect(ireq.two).to.not.exist;
    });

    it('should allow nested bindings', () => {
      expect(ireq.one.bind).to.be.an.instanceof(Function);
      ireq.one.bind('two', '/nested');
      expect(ireq.one.two).to.be.an.instanceof(Function);
      expect(ireq.one.two()).to.be.equal('OK');
    });

    it('should not break initial require with nested binding', () => {
      expect(ireq.one).to.be.an.instanceof(Function);
      expect(ireq.one()).to.be.true;
    });

  });

  describe('folder lookup', () => {

    it('should lookup files in folder if no index.js found', () => {
      ireq.one.bind('noIndexBind', '/nested-no-index');
      const nestedNoIndex = ireq.one.noIndexBind();
      expect(nestedNoIndex).to.have.all.keys('one', 'two');
      expect(nestedNoIndex.one).to.be.equal(1);
      expect(nestedNoIndex.two).to.be.equal(2);
    });

    it('should import by filename as usual', () => {
      expect(ireq.one.noIndexBind('./one')).to.be.exactly(1);
      expect(ireq.one('./nested-no-index/one')).to.be.exactly(1);
    });

  });

});

/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 29.06.2015.
 */
'use strict';
require('babel/polyfill');

var
	assert   = require('chai').assert,
	clc 		 = require('cli-color'),
	path	 	 = require('path'),
  semver   = require('semver'),

	App      =require('../index.js').Bsc
;

var app;

suite('Bsc Suit',function(){

  test('new Bsc()',(done)=>{

    try{
      app= new App();
      assert.isObject(app,'app should be an object');
      done();
    }catch(e){
      done(e);
    }

  });

  test('loadConfig()',(done)=>{

    app.loadConfig().then((r)=>{
      assert.isObject(app.cfg,'cfg should be an object');
      assert.property(app.cfg,'schemaVersion','cfg should have a schemaVersion');
      assert.isNotNull(semver.valid(app.cfg.schemaVersion),'schemaVersion should be valid SemVer');
      done();
    }).catch((e)=>{
      done(e);
    });

  });

});

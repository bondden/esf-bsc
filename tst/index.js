/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 29.06.2015.
 */
'use strict';

var
  assert=require('chai').assert,
  semver=require('semver'),
  fs    =require('fs-extra'),
  path  =require('path'),

  App   =require('../index.js').Bsc
  ;

var app;
var esfrc={
  bdl:path.resolve(__dirname+'/../.esfrc.tst'),
  tst:path.resolve(__dirname+'/../.esfrc')
};

suite('Bsc Suit',function(){

  suiteSetup(done=>{
    fs.move(esfrc.bdl,esfrc.tst,e=>{
      if(e){
        done(e);
      }else{
        done();
      }
    });
  });

  suiteTeardown(done=>{
    fs.move(esfrc.tst,esfrc.bdl,e=>{
      if(e){
        done(e);
      }else{
        done();
      }
    });
  });

  setup(done=>{

    try{
      app=new App();
      done();
    }catch(e){
      done(e);
    }

  });

  test('new Bsc()',done=>{

    try{
      app=new App();
      assert.isObject(app,'app should be an object');
      done();
    }catch(e){
      done(e);
    }

  });

  test('loadConfig()',done=>{

    app
      .loadConfig()
       .then(r=>{
         assert.isObject(app.cfg,'cfg should be an object');
         assert.property(app.cfg,'schemaVersion','cfg should have a schemaVersion');
         assert.isNotNull(semver.valid(app.cfg.schemaVersion),'schemaVersion should be valid SemVer');
         done();
       })
       .catch(e=>{
         done(e);
       })
    ;

  });

  test('loadConfig(cfgObj)',done=>{

    const cfgObj={
      schemaVersion:'0.1.1',
      dat:{
        a:'foo',
        b:2
      }
    };
    app
      .loadConfig(cfgObj)
       .then(r=>{
         
         console.log(app.cfg);
         
         assert.isObject(app.cfg,'cfg should be an object');
         assert.property(app.cfg,'schemaVersion','cfg should have a schemaVersion');
         assert.isNotNull(semver.valid(app.cfg.schemaVersion),'schemaVersion should be valid SemVer');
         assert.isObject(app.cfg.dat,'cfg should have an object attribute dat');
         done();
       })
       .catch(e=>{
         done(e);
       })
    ;

  });

  test('reloadConfig()',done=>{
    
    app
      .reloadConfig()
      .then(r=>{

        console.log(app.cfg);

        assert.isObject(app.cfg,'cfg should be an object');
        assert.property(app.cfg,'schemaVersion','cfg should have a schemaVersion');
        assert.isNotNull(semver.valid(app.cfg.schemaVersion),'schemaVersion should be valid SemVer');
        assert.equal(app.cfg.schemaVersion,'0.1.0','schemaVersion should be equal to "0.1.0"');
        done();
      })
      .catch(e=>{
        done(e);
      })
    ;

  });

  test('reloadConfig(cfgObj)',done=>{

    const cfgObj={
      schemaVersion:'0.1.1',
      dat:{
        a:'foo',
        b:2
      }
    };
    app
      .reloadConfig(cfgObj)
      .then(r=>{

        console.log(app.cfg);

        assert.isObject(app.cfg,'cfg should be an object');
        assert.property(app.cfg,'schemaVersion','cfg should have a schemaVersion');
        assert.isNotNull(semver.valid(app.cfg.schemaVersion),'schemaVersion should be valid SemVer');
        assert.isObject(app.cfg.dat,'cfg should have an object attribute dat');
        assert.equal(app.cfg.dat.a,'foo','cfg should have a sub-attribute dat.a, equal to "foo"');
        done();
      })
      .catch(e=>{
        done(e);
      })
    ;

  });

});

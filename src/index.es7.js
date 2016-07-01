/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 01.08.2015.
 */
"use strict";

var
  fs       =require('fs-extra'),
  path     =require('path'),
  parentSrc=require('parent-search')
  ;

import * as modUtl from 'esf-utl';

var
  U=modUtl.Utl,
  L=U.log,
  E=U.rejectingError
  ;

/**
 * abstract class
 */
export class Bsc {

  constructor(){
    this.cfg   =null;
    this.cfgPth='tst/d/esfapp.cfg.json';
  }

  /**
   * [[Description]]
   * @returns {Promise} [[Description]]
   */
  loadConfig(cfgObj=null){

    var H=this;
    if(H.cfg){
      return new Promise((rs,rj)=>{
        L('Bsc: Using preset cfg: '+JSON.stringify(H.cfg,null,'\t'));
        rs(H.cfg);
      });
    }

    return new Promise((rs,rj)=>{
      
      if(cfgObj){
        
        // in-memory cfgObj is set
        
        try{
          
          let cfgObjCln=JSON.parse(U.stringifyJSON(cfgObj));
          
          if(cfgObjCln){            
            H.cfg=cfgObjCln;
            
            //L(`H.cfg:  ${U.stringifyJSON(H.cfg)}`,'yb');
            //L(`cfgObj: ${U.stringifyJSON(cfgObj)}`,'yb');
            
            rs(H.cfg);
          }else{            
            let msg='in-memory cfgObject error: not an object';
            return E(12,msg,new Error(msg),rj);
          }
          
        }catch(e){
          return E(11,'in-memory cfgObject error',e,rj);
        }
        
      }else{
        
        // look for settings in fs

        L('Searching .esfrc starting from : `'+__dirname+'`...');

        parentSrc(__dirname,'.esfrc',{},(e0,esfrcPth)=>{

          if(e0){
            return E(3,'.esfrc search error',e0,rj);
          }

          if(!esfrcPth){
            let msg='.esfrc not found';
            return E(4,msg,new Error(msg),rj);
          }

          L('.esfrc found at : '+esfrcPth);

          let esfrcPath=path.resolve(esfrcPth);
          L('Getting cfgPth from : `'+esfrcPath+'`...');
          fs.readJson(esfrcPath,(e,r)=>{

            if(e){
              return E(1,'.esfrc reading error',e,rj);
            }

            if(typeof r.cfgPth==='string'){
              H.cfgPth=r.cfgPth;
            }

            if(!path.isAbsolute(H.cfgPth)){
              H.cfgPth=path.resolve(path.dirname(esfrcPth)+'/'+H.cfgPth);
            }

            L('Using cfgPath: '+H.cfgPth);

            fs.readJson(path.resolve(H.cfgPth),(e1,cfg)=>{

              if(e1){
                return E(2,'Error reading '+H.cfgPth,e1,rj);
              }

              H.cfg=cfg;
              rs(H.cfg);

            });

          });

        });
        
      }

    });

  }

  reloadConfig(cfg=null){
    var H=this;
    return new Promise((rs,rj)=>{

      let cfgObj=null;
      if(cfg){
        if(typeof cfg === 'string'){
          // this can be a path to cfg file:
          H.cfgPth=cfg; 
        }else if(typeof cfg === 'object' && cfg){
          cfgObj=cfg;
        }else{
          let msg=`Incorrect config: ${U.stringifyJSON(cfg)}`;
          return E(12,msg,new Error(msg),rj);
        }
      }

      H.loadConfig(cfgObj)
       .then(r=>{
         rs(r);
       })
       .catch(e=>{
         return E(11,'Error reloading config from: '+H.cfgPth,e,rj);
       })
      ;

    });
  }

}

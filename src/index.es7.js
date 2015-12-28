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
export class Bsc{

	constructor(){
		this.cfg=null;
		this.cfgPth='tst/d/esfapp.cfg.json';
	}

	/**
	 * [[Description]]
	 * @returns {Promise} [[Description]]
	 */
	loadConfig(){

		var H=this;
		if(H.cfg){
			return new Promise((rs,rj)=>{
        L('Bsc: Using preset cfg: '+JSON.stringify(H.cfg,null,'\t'));
				rs(H.cfg);
			});
		}

		return new Promise((rs,rj)=>{

      L('Searching .esfrc starting from : `'+__dirname+'`...');

      parentSrc(__dirname,'.esfrc',{},(e0,d0)=>{

        if(e0){
          return E(3,'.esfrc search error',e0,rj);
        }

        if(!d0){
          let msg='.esfrc not found';
          return E(3,msg,new Error(msg),rj);
        }

        L('.esfrc found at : '+d0);

        let esfrcPath=path.resolve(d0);
        L('Getting cfgPth from : `'+esfrcPath+'`...');
        fs.readJson(esfrcPath,(e,r)=>{

          if(e){
            return E(1,'.esfrc reading error',e,rj);
          }

          if(typeof r.cfgPth === 'string'){
            H.cfgPth = r.cfgPth;
          }

          if(!path.isAbsolute(H.cfgPth)){
            H.cfgPth=__dirname+'/'+H.cfgPth;
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

		});

	}

	reloadConfig(pathToConfigFile=null){
		var H=this;
		return new Promise((rs,rj)=>{

			if(pathToConfigFile){
				H.cfgPth=pathToConfigFile;
			}

			H.loadConfig().then((r)=>{
				rs(r);
			}).catch((e)=>{
        return E(3,'Error reloading config from: '+H.cfgPth,e,rj);
			});

		});
	}

}

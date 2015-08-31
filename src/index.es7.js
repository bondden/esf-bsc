/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 01.08.2015.
 */
"use strict";

var
	fs=require('fs-extra'),
	path=require('path')
;

/**
 * abstract class
 */
export class Bsc{

	constructor(){
		this.cfg=false;
		this.cfgPath='tst/d/esfapp.cfg.json';
	}

	/**
	 * [[Description]]
	 * @returns {Promise} [[Description]]
	 */
	loadConfig(){

		var H=this;
		if(H.cfg){
			return new Promise(function(rs,rj){
				rs(H.cfg);
			});
		}

		return new Promise(function(rs,rj){

			fs.readJson(path.resolve(__dirname+'/../../../.esfrc'),function(e,r){
				if(e){
					rj(e);
					return e;
				}
				
				if(typeof r.cfgPth === 'string'){
					H.cfgPth = r.cfgPth;
				}

				if(!path.isAbsolute(cfgPth)){
					H.cfgPth=__dirname+'/'+cfgPth;
				}

				fs.readJson(path.resolve(H.cfgPth),function(e1,cfg){
					if(e1){
						rj(e1);
						return e1;
					}

					H.cfg=cfg;
					rs(H.cfg);

				});

			});

		});

	}
	
	reloadConfig(pathToConfigFile=false){
		return new Promise(function(rs,rj){
			
			if(pathToConfigFile!==false){
				this.cfgPath=pathToConfigFile;	
			}			
			
			this.loadConfig().then(function(r){
				rs(r);
			}).catch(function(e){
				rj(e);
			});
			
		});
	}

}

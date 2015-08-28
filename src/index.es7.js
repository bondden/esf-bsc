/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 01.08.2015.
 */
"use strict";

var
	fs=require('fs-extra'),
	path=require('path')
;

/**
 *
 */
export class Bsc{

	constructor(){
		this.cfg=false;
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

			fs.readJson(path.resolve(__dirname+'/.esfrc'),function(e,r){
				if(e){
					rj(e);
					return e;
				}

				let cfgPth='tst/d/esfapp.cfg.json';
				if(r.cfgPth instanceof String){
					cfgPth=r.cfgPth;
				}

				if(!path.isAbsolute(cfgPth)){
					cfgPth=__dirname+'/'+cfgPth;
				}

				fs.readJson(path.resolve(cfgPth),function(e1,r1){
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

}

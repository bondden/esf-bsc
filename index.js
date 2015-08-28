/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 01.08.2015.
 */
"use strict";

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var fs = require('fs-extra'),
    path = require('path');

/**
 * abstract class
 */

var Bsc = (function () {
	function Bsc() {
		_classCallCheck(this, Bsc);

		this.cfg = false;
	}

	/**
  * [[Description]]
  * @returns {Promise} [[Description]]
  */

	_createClass(Bsc, [{
		key: 'loadConfig',
		value: function loadConfig() {

			var H = this;
			if (H.cfg) {
				return new Promise(function (rs, rj) {
					rs(H.cfg);
				});
			}

			return new Promise(function (rs, rj) {

				fs.readJson(path.resolve(__dirname + '/../../../.esfrc'), function (e, r) {
					if (e) {
						rj(e);
						return e;
					}

					var cfgPth = 'tst/d/esfapp.cfg.json';
					if (typeof r.cfgPth === 'string') {
						cfgPth = r.cfgPth;
					}

					if (!path.isAbsolute(cfgPth)) {
						cfgPth = __dirname + '/' + cfgPth;
					}

					fs.readJson(path.resolve(cfgPth), function (e1, cfg) {
						if (e1) {
							rj(e1);
							return e1;
						}

						H.cfg = cfg;
						rs(H.cfg);
					});
				});
			});
		}
	}]);

	return Bsc;
})();

exports.Bsc = Bsc;
//# sourceMappingURL=.maps/index.es7.js.map
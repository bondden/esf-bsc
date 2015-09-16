/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 01.08.2015.
 */
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bond007EsfUtl = require('@bond007/esf-utl');

var modUtl = _interopRequireWildcard(_bond007EsfUtl);

var fs = require('fs-extra'),
    path = require('path'),
    parentSrc = require('parent-search');

var U = modUtl.Utl,
    L = U.log,
    E = U.rejectingError;

/**
 * abstract class
 */

var Bsc = (function () {
  function Bsc() {
    _classCallCheck(this, Bsc);

    this.cfg = null;
    this.cfgPth = 'tst/d/esfapp.cfg.json';
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
          L('Bsc: Using preset cfg: ' + JSON.stringify(H.cfg, null, '\t'));
          rs(H.cfg);
        });
      }

      return new Promise(function (rs, rj) {

        L('Searching .esfrc starting from : `' + __dirname + '`...');

        parentSrc(__dirname, '.esfrc', {}, function (e0, d0) {

          if (e0) {
            return E(3, '.esfrc search error', e0, rj);
          }

          if (!d0) {
            var msg = '.esfrc not found';
            return E(3, msg, new Error(msg), rj);
          }

          L('.esfrc found at : ' + d0);

          var esfrcPath = path.resolve(d0);
          L('Getting cfgPth from : `' + esfrcPath + '`...');
          fs.readJson(esfrcPath, function (e, r) {

            if (e) {
              return E(1, '.esfrc reading error', e, rj);
            }

            if (typeof r.cfgPth === 'string') {
              H.cfgPth = r.cfgPth;
            }

            if (!path.isAbsolute(H.cfgPth)) {
              H.cfgPth = __dirname + '/' + H.cfgPth;
            }

            L('Using cfgPath: ' + H.cfgPth);

            fs.readJson(path.resolve(H.cfgPth), function (e1, cfg) {

              if (e1) {
                return E(2, 'Error reading ' + H.cfgPth, e1, rj);
              }

              H.cfg = cfg;
              rs(H.cfg);
            });
          });
        });
      });
    }
  }, {
    key: 'reloadConfig',
    value: function reloadConfig() {
      var pathToConfigFile = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      var H = this;
      return new Promise(function (rs, rj) {

        if (pathToConfigFile) {
          H.cfgPth = pathToConfigFile;
        }

        H.loadConfig().then(function (r) {
          rs(r);
        })['catch'](function (e) {
          return E(3, 'Error reloading config from: ' + H.cfgPth, e, rj);
        });
      });
    }
  }]);

  return Bsc;
})();

exports.Bsc = Bsc;
//# sourceMappingURL=.maps/index.es7.js.map
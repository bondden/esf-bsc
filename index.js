/**
 * Created by Denis Bondarenko <bond.den@gmail.com> on 01.08.2015.
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bsc = undefined;

var _esfUtl = require('esf-utl');

var modUtl = _interopRequireWildcard(_esfUtl);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var fs = require('fs-extra'),
    path = require('path'),
    parentSrc = require('parent-search');

var U = modUtl.Utl,
    L = U.log,
    E = U.rejectingError;

/**
 * abstract class
 */
class Bsc {

  constructor() {
    this.cfg = null;
    this.cfgPth = 'tst/d/esfapp.cfg.json';
  }

  /**
   * [[Description]]
   * @returns {Promise} [[Description]]
   */
  loadConfig() {

    var H = this;
    if (H.cfg) {
      return new Promise((rs, rj) => {
        L('Bsc: Using preset cfg: ' + JSON.stringify(H.cfg, null, '\t'));
        rs(H.cfg);
      });
    }

    return new Promise((rs, rj) => {

      L('Searching .esfrc starting from : `' + __dirname + '`...');

      parentSrc(__dirname, '.esfrc', {}, (e0, esfrcPth) => {

        if (e0) {
          return E(3, '.esfrc search error', e0, rj);
        }

        if (!esfrcPth) {
          let msg = '.esfrc not found';
          return E(3, msg, new Error(msg), rj);
        }

        L('.esfrc found at : ' + esfrcPth);

        let esfrcPath = path.resolve(esfrcPth);
        L('Getting cfgPth from : `' + esfrcPath + '`...');
        fs.readJson(esfrcPath, (e, r) => {

          if (e) {
            return E(1, '.esfrc reading error', e, rj);
          }

          if (typeof r.cfgPth === 'string') {
            H.cfgPth = r.cfgPth;
          }

          if (!path.isAbsolute(H.cfgPth)) {
            H.cfgPth = path.resolve(path.dirname(esfrcPth) + '/' + H.cfgPth);
          }

          L('Using cfgPath: ' + H.cfgPth);

          fs.readJson(path.resolve(H.cfgPth), (e1, cfg) => {

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

  reloadConfig(pathToConfigFile = null) {
    var H = this;
    return new Promise((rs, rj) => {

      if (pathToConfigFile) {
        H.cfgPth = pathToConfigFile;
      }

      H.loadConfig().then(r => {
        rs(r);
      }).catch(e => {
        return E(3, 'Error reloading config from: ' + H.cfgPth, e, rj);
      });
    });
  }

}
exports.Bsc = Bsc;
//# sourceMappingURL=.maps/index.es7.js.map

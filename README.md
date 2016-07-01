# ESF-Basic
## Road map

| Version | Functionality                                                                 | API Change                   | Status   |
| ------- | --------------------------------------------------------------------------    | ----------                   | -------- |
| 0.1.0   | loadConfig from defaults (req: [esf-bsc-0.2](esf-bsc-0.2))                    |                              | released |
| 0.2.0   | Implement `.esfrc` (req: [esf-bsc-0.1](esf-bsc-0.1))                          |                              | released |
| 1.0.0   | Implement API v.1.0 (req: [esf-bsc-1.0](esf-bsc-1.0))                         | `loadConfig`, `reloadConfig` | released |
| 1.1.0   | Check schemaVersion validity with a test (req: [esf-bsc-1.1](esf-bsc-1.1))    |                              | released |
| 1.2.0   | API v.1.1: Optional inMemory config loading (req: [esf-bsc-1.4](esf-bsc-1.4)) | `loadConfig`, `reloadConfig` | released |
| 1.3.0   | Check schemaVersion validity (req: [esf-bsc-1.2](esf-bsc-1.2))                |                              | _        |

## Requirements
### esf-bsc-1

| TP  | ReqId       | Requirement                                                                                                                 | Verification Methods              |
| --- | ----------- | --------------------------------------------------------------------------------------------                                | -----------------------           |
|     | esf-bsc-0.1 | It look for `.esfrc` file, containing path to config file                                                                   | at/ut: [loadConfig()](tst/idx.js) |
|     | esf-bsc-0.2 | Defaults for `".esfrc".cfgPath` should be `tst/d/esfapp.cfg.json`                                                           | at/ut: [loadConfig()](tst/idx.js) |
|     | esf-bsc-0.3 | It should be possible to reload config from any local path                                                                  | at/ut:                            |
|     | esf-bsc-1.0 | It should load config according defaults, `.esfrc` and reload from custom path on demand                                    | at/ut: [loadConfig()](tst/idx.js) |
|     | esf-bsc-1.1 | Test should check if config schemaVersion attribute is a valid SemVer version                                               |                                   |
|     | esf-bsc-1.2 | It should check if config schemaVersion attribute is a valid SemVer version                                                 | cr                                |
|     | esf-bsc-1.3 | It should use babel 6 and esf-utl 2.1                                                                                       |                                   |
|     | esf-bsc-1.4 | loadConfig and reloadConfig should accept an optional config object argument to load config from it instead of file, if set | at/ut: [loadConfig()](tst/idx.js) |

## API v.1.1

```js
Promise loadConfig([object cfgObject])                            // optional config object can be set instead of loading cfg from file
Promise reloadConfig([string pathToConfigFile|object cfgObject])  // also for reloading
```

## API v.1.0

```js
Promise loadConfig()
Promise reloadConfig(string pathToConfigFile)
```

--------------------------------------------------------------------------------

© MIT bondden 2009-2015

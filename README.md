# ESF-Basic

## Road map

| Version   | Functionality                               								               | Status    |
|---        |---                                          								               |---        |
| 0.1.0     | loadConfig from defaults (req: [esf-bsc-0.2](esf-bsc-0.2)) 	               | resleased |
| 0.2.0     | Implement ```.esfrc``` (req: [esf-bsc-0.1](esf-bsc-0.1))                   | resleased |
| 1.0.0     | Implement API v.1.0 (req: [esf-bsc-1.0](esf-bsc-1.0))				               | resleased |
| 1.1.0     | Check schemaVersion validity with a test (req: [esf-bsc-1.1](esf-bsc-1.1)) | resleased |
| 1.1.0     | Check schemaVersion validity (req: [esf-bsc-1.2](esf-bsc-1.2))             | _         |

## Requirements

### esf-bsc-1
| ReqId				| Requirement																																								 	 | Implementation Methods 							|
|--- 					|--- 																																												 	 |--- 					 					 							|
| esf-bsc-0.1	| It look for ```.esfrc``` file, containing path to config file																 | ```loadConfig```   									|
| esf-bsc-0.2	| Defaults for ```".esfrc".cfgPath``` should be ```tst/d/esfapp.cfg.json```										 | ```loadConfig```   									|
| esf-bsc-0.3	| It should be possible to reload config from any local path																	 | ```reloadConfig``` 									|
| esf-bsc-1.0	| It should load config according defaults, ```.esfrc``` and reload from custom path on demand | ```loadConfig```, ```reloadConfig``` |
| esf-bsc-1.1	| Test should check if config schemaVersion attribute is a valid SemVer version                | tests                                |
| esf-bsc-1.2	| It should check if config schemaVersion attribute is a valid SemVer version                  | ```loadConfig```                     |

## API v.1.0
```cs
Promise loadConfig()
Promise reloadConfig(string pathToConfigFile)
```

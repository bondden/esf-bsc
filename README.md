# ESF-Basic

## Road map

| Version   | Functionality                               								| Status    |
|---        |---                                          								|---        |
| 0.1.0     | loadConfig from defaults (req: [esf-bsc-0.2](esf-bsc-0.2)) 	| resleased |
| 0.2.0     | Implement ```.esfrc``` (req: [esf-bsc-0.1](esf-bsc-0.1))    | resleased |
| 1.0.0     | Implement API v.0.1 (req: [esf-bsc-1.0](esf-bsc-1.0))				| resleased |

## Requirements

### esf-bsc-1
| ReqId				| Requirement																																								 	 | Implementation Methods 							|
|--- 					|--- 																																												 	 |--- 					 					 							|
| esf-bsc-0.1	| It look for ```.esfrc``` file, containing path to config file																 | ```loadConfig```   									|
| esf-bsc-0.2	| Defaults for ```".esfrc".cfgPath``` should be ```tst/d/esfapp.cfg.json```										 | ```loadConfig```   									|
| esf-bsc-0.3	| It should be possible to reload config from any local path																	 | ```reloadConfig``` 									|
| esf-bsc-1.0	| It should load config according defaults, ```.esfrc``` and reload from custom path on demand | ```loadConfig```, ```reloadConfig``` |

## API v.1.0
```cs
Promise loadConfig()
Promise reloadConfig(string pathToConfigFile)
```
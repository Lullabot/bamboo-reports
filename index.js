#!/usr/local/bin/node
"use strict";

const BambooApp = require('./src/BambooApp');
const config = require('./config');

const bamboo = new BambooApp(config.bambooKey, config.bambooDomain);

bamboo.run();
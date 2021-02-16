"use strict";
var path = require('path');
var workerData = require('worker_threads').workerData;
require('ts-node').register();
require(path.resolve(__dirname, workerData.path));

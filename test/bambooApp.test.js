#!/usr/local/bin/node
"use strict";

require('../src/array.prototype');
const assert = require('assert');
const BambooApp = require('../src/BambooApp');
const config = require('../config');
const data = require('./data');

const bamboo = new BambooApp(config.bambooKey, config.bambooDomain);

describe('Bamboo App', () => {
    it('should get a full employee geo record', async () => {
        const record = await bamboo.getEmployeeAddress(40469);
        assert.strictEqual(record.hasOwnProperty('longitude'), true);
    });

    it('should fully load a set of directory records', async () => {
        const records = await bamboo.loadEmployees(data.directoryRecords);
        assert.strictEqual(records[0].hasOwnProperty('geo'), true);
        assert.strictEqual(records[0].geo.hasOwnProperty('latitude'), true);
    });

    it('should chunk a large array', () => {
        const chunked = data.directoryRecords.chunk(2);
        assert.strictEqual(chunked.length, 2);
        assert.strictEqual(chunked[0].length, 2);
        assert.strictEqual(chunked[1].length, 1);
    });

    it('should create a properly formatted CSV file', async () => {
        const records = await bamboo.loadEmployees(data.directoryRecords);
        bamboo.createProximityCsv(records);
    });
});

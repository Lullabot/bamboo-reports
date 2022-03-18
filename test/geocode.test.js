#!/usr/local/bin/node
"use strict";

const NodeGeocoder = require('node-geocoder');
const config = require('../config');

const options = {
    provider: 'mapquest',
    apiKey: config.mapquestKey, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

describe('GeoCoder', () => {
    it('should encode my address', async () => {
        // Using callback
        const res = await geocoder.geocode('209 Blue Jay Lane, Sewell, NJ, USA');
        console.log(res);
    });
});


#!/usr/local/bin/node
"use strict";

const calc = require('distance-calculator-js');
const data = require('./data');

describe('DistanceCalculator', () => {
    it('should get the distance between me and Seth', async () => {
        // => Signed decimal degrees without compass direction
        const Chris = { lat: data.chris.latitude, long: data.chris.longitude };
        const Seth = { lat: data.seth.latitude, long: data.seth.longitude };

        const distance = calc.calculate(Chris, Seth, 'M');
        let stop = 0;
    });
});


#!/usr/local/bin/node
"use strict";

require('./array.prototype');
const fs = require('fs');
const BambooApi = require("./bambooApi");
const NodeGeocoder = require("node-geocoder");
const calc = require('distance-calculator-js');
const config = require("../config");
const {progress} = require("mocha/lib/reporters");

/**
 * Defines class Bamboo.
 */
class BambooApp {
    /**
     * @type BambooApi
     */
    #bambooApi;

    /**
     * @type NodeGeocoder
     */
    #geocoder;

    /**
     * @type {string}
     */
    #outputDir = 'output';

    /**
     * @type {string}
     */
    #employeesFile = 'employees.json';

    /**
     * Constructor
     */
    constructor(bambooKey, bambooDomain) {
        this.#bambooApi = new BambooApi(bambooKey, bambooDomain);
        this.#geocoder = NodeGeocoder({
            provider: 'mapquest',
            apiKey: config.mapquestKey,
        });
    }

    async run() {
        // Attempt to load records from cache.
        let loadedRecords = await this.loadEmployeeFile();

        // If there was no file or it was empty, get data from bamboo.
        if (loadedRecords.length === 0) {
            console.log('Loading employees from Bamboo...');

            // Load all employees from the directory.
            const directoryRecords = await this.#bambooApi.getEmployeeDir();

            // Remove erroneous records.
            const filteredRecords = directoryRecords.employees.filter(record => {
                return record.id !== '40555';
            });

            // Chunk the requests into groups of 10 to prevent quota overload.
            const chunkedRecords = filteredRecords.chunk(10);
            for (let i = 0; i < chunkedRecords.length; i++) {
                const batch = await this.loadEmployees(chunkedRecords[i]);
                loadedRecords = loadedRecords.concat(batch);
            }

            // Store the employee directory.
            this.createEmployeeList(loadedRecords);
        }

        // Create Lon/Lat CSV.
        this.createLongLatCsv(loadedRecords);

        // Create the proximity matrix.
        this.createProximityCsv(loadedRecords);

        // Create the report grouped by country and province.
        this.createGroupedReport(loadedRecords);
    }

    /**
     * Load the contents of the Employees file or create it if it doesn't exist.
     * @returns {Promise<void>}
     */
    async loadEmployeeFile() {
        const _this = this;
        const filepath = `${this.#outputDir}/${this.#employeesFile}`;

        return new Promise((resolve, reject) => {
            fs.stat(filepath, async (err, stat) => {
                if (err == null) {
                    resolve(require('../'+filepath));
                } else if (err.code === 'ENOENT') {
                    let result = await _this._writeFile(_this.#employeesFile, '[]');
                    resolve([]);
                } else {
                    console.log('Error in employees file: ', err.code);
                    reject(err);
                }
            });
        });
    }

    /**
     * Load a set of employees from directory records.
     *
     * @param {array} directoryRecords
     * @returns {Promise<unknown[]>}
     */
    async loadEmployees(directoryRecords) {
        return await Promise.all(directoryRecords.map(async emp => {
            // console.log(`Loading employee ${emp.displayName}...`);
            let geo = await this.getEmployeeAddress(emp.id);

            return {
                id: emp.id,
                name: emp.displayName,
                geo: geo
            }
        }))
    }

    /**
     * Get a fully qualified employee address from OpenStreetMap.
     *
     * @param {int} employeeId
     * @returns {Promise<*>}
     */
    async getEmployeeAddress(employeeId) {
        const empAddress = await this.#bambooApi.getEmployee(employeeId, ['displayName', 'address1', 'city', 'state', 'zipCode', 'country']);
        const address = `${empAddress.address1}, ${empAddress.city}, ${empAddress.state} ${empAddress.zipCode}, ${empAddress.country}`;
        const geo = await this.#geocoder.geocode(address).catch(err => {
            console.warn(`Unable to locate a geo record for ${empAddress.displayName}`)
        });

        return geo ? geo[0] : {};
    }

    createEmployeeList(records) {
        this._writeFile('employees.json', JSON.stringify(records));
    }

    createLongLatCsv(records) {
        const rows = ['Name,Longitude,Latitude'];
        records.forEach(record => {
            rows.push(`${record.name}, ${record.geo.longitude}, ${record.geo.latitude}`);
        });

        this._writeFile('longlat.csv', rows.join('\n'));
    }

    createProximityCsv(records) {
        // Compare each person against each other.
        const heading = [''];
        const rows = [];
        records.forEach(record => {
            // console.log(`Calculating proximity for ${record.name}...`)

            const row = [];
            heading.push(record.name);
            row.push(record.name);

            let baseCoords = {long: record.geo.longitude, lat: record.geo.latitude};
            records.forEach(subRecord => {
                let targetCoords = {long: subRecord.geo.longitude, lat: subRecord.geo.latitude};
                let distance = calc.calculate(baseCoords, targetCoords, 'm');
                row.push(distance === 0 ? '' : distance);
            });
            rows.push(row.join(','));
        });

        let output = [heading.join(',')];
        output = output.concat(rows);

        this._writeFile('proximity.csv', output.join('\n'));
    }

    createGroupedReport(records) {
        // Record by Country
        const byCountry = this.groupByCountry(records);
        const rows = ['Country,Count,Names'];
        for(let i in byCountry) {
            rows.push(`${i},${byCountry[i].names.length},${byCountry[i].names.join(',')}`);
        }

        // Records by State or Province.
        const byState = this.groupByState(records);
        rows.push('', 'State/Prov,Count,Names');
        for(let i in byState) {
            rows.push(`${i},${byState[i].names.length},${byState[i].names.join(',')}`);
        }

        this._writeFile('geogroup.csv', rows.join('\n'));
    }

    /**
     * Group employees by their country.
     *
     * @param records
     * @returns {{}}
     */
    groupByCountry(records) {
        const group = {};

        records.forEach(record => {
            let country = record.geo.countryCode;
            group[country] = group[country] || {names: []};
            group[country].names.push(record.name);
        });

        return group;
    }

    groupByState(records) {
        const group = {};

        records.forEach(record => {
            let state = record.geo.stateCode;
            group[state] = group[state] || {names: []};
            group[state].names.push(record.name);
        });

        return group;
    }

    /**
     * Write a file to the output folder.
     * @param file
     * @param data
     * @returns {Promise<unknown>}
     * @private
     */
    async _writeFile(file, data) {
        const filepath = `${this.#outputDir}/${file}`;

        // fs.writeFile(filepath, data, (err) => {
        //     console.log('here');
        //     if (err) {
        //         throw err;
        //     }
        //     console.log(`⭐️ File ${file} written.`);
        // });

        return new Promise((resolve, reject) => {
            fs.writeFile(filepath, data, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(`⭐️ File ${file} written.`);
                    resolve(true);
                }
            });
        });
    }
}

module.exports = BambooApp;
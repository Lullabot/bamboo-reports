#!/usr/local/bin/node
"use strict";

const BambooApi = require('../src/bambooApi');
const config = require('../config');

const bamboo = new BambooApi(config.bambooKey, config.bambooDomain);

describe('Bamboo API', () => {
    it('should fail authentication', async () => {
        const bamboo = new BambooApi('badkey', config.bambooDomain);
        const response = await bamboo._request('/employee/0/?fields=firstName');
        let stop=0;
    });

    it('should return available fields', () => {
        bamboo.getFields().then(res => {
            console.log(res.data);
        });
    });

    it('should return employee data', () => {
        bamboo.getEmployee(40531, ['firstName', 'lastName', 'nickname', 'hireDate', 'address1', 'address2', 'city', 'state', 'zipCode', 'country']).then(res => {
            console.log(res.data);
        });
    });

    it('should get a list of all employees', async () => {
        const employees = await bamboo.getEmployeeDir();
        console.log(employees);
    });
});
#!/usr/local/bin/node
"use strict";

const axios = require('axios').default;

/**
 * Defines class BambooApi.
 */
class BambooApi {
    #key = '';
    #subdomain = '';

    /**
     * Constructor
     */
    constructor(key, subdomain) {
        this.#key = key;
        this.#subdomain = subdomain;
    }

    /**
     * Perform an API requests against Bamboo.
     *
     * @param {string} url
     * @param {object} data
     * @param {string} method
     * @returns {*}
     * @private
     */
    async _request(url, data, method) {
        axios.defaults.baseURL = `https://api.bamboohr.com/api/gateway.php/${this.#subdomain}/v1`;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.defaults.headers.common['Accept'] = 'application/json';

        const axiosConfig = {
            auth: {
                username: this.#key,
                password: 'x'
            },
            url: `https://api.bamboohr.com/api/gateway.php/${this.#subdomain}/v1${url}`,
            data: data,
        }

        // Run the request.
        let response = {status: 404};
        switch (method) {
            case 'GET':
            default:
                response = await axios.get(url, axiosConfig).catch(err => {
                    console.error(`Bamboo request failed. ${err.message}: ${err.response.headers.x-bamboohr-error-message}`);
                    process.exit(1);
                });
        }

        return response.data;
    }

    /**
     * Get a list of all employees.
     *
     * @returns {array}
     */
    async getEmployeeDir() {
        const url = '/employees/directory';
        return await this._request(url, {}, 'GET');
    }

    /**
     * Get employee data.
     *
     * @param {int} id
     * @param {array} fields
     * @returns {Promise<AxiosResponse<*>>}
     */
    async getEmployee(id, fields) {
        id = id || 0;
        const q = encodeURIComponent(fields.join(','));
        const url = `/employees/${id}/?fields=${q}`;

        return await this._request(url, {}, 'GET');
    }

    /**
     * Get a list of all possible fields.  Not all are accessible.
     *
     * @returns {Promise<AxiosResponse<*>>}
     */
    async getFields() {
        const url = `/meta/fields`;
        return await this._request(url, {}, 'GET');
    }
}

module.exports = BambooApi;
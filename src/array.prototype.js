#!/usr/local/bin/node
"use strict";

Array.prototype.chunk = function (size) {
    const newarray = [];

    for (let i = 0, j = this.length; i < j; i += size) {
        newarray.push(this.slice(i, i + size));
    }

    return newarray;
};
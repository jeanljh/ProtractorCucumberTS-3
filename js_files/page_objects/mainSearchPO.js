"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class MainSearchPO {
    constructor() {
        this.tabBookTypes = protractor_1.$$('.list-one li');
    }
}
exports.MainSearchPO = MainSearchPO;

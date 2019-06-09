"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class FlightsTabPO {
    constructor() {
        this.rbTripOpts = protractor_1.$$('.radio>label>input');
        this.lbDepartDate = protractor_1.$('#departDate');
        this.lbReturnDate = protractor_1.$('#returnDate');
        this.tfPerson = protractor_1.$('#person');
        this.cbbCabinClass = protractor_1.$('#cabinClass');
        this.listCabinClass = protractor_1.$$('#cabinClass option');
        this.iconMinus = protractor_1.$$('.glyphicon-minus-sign');
        this.iconAdd = protractor_1.$$('.glyphicon-plus-sign');
        this.lbPerson = protractor_1.$$('.dropdown-menu li input');
        this.btnDone = protractor_1.$('.travelerClose');
        this.linkAdvancedOpt = protractor_1.$('#flightSearch .extra_text');
        this.tfReturnFromCity = protractor_1.$('#returnFroCity');
        this.tfReturnToCity = protractor_1.$('#returnToCity');
    }
}
exports.FlightsTabPO = FlightsTabPO;

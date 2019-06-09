"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const mainSearchPO_1 = require("../page_objects/mainSearchPO");
const protractor_1 = require("protractor");
const chai_1 = require("chai");
const flightsTabPO_1 = require("../page_objects/flightsTabPO");
const ptor_1 = require("protractor/built/ptor");
const flightsTabPF_1 = require("../page_functions/flightsTabPF");
const mainSearchPO = new mainSearchPO_1.MainSearchPO();
const flightsTabPO = new flightsTabPO_1.FlightsTabPO();
const flightsTabPF = new flightsTabPF_1.FlightsTabPF();
const ec = ptor_1.protractor.ExpectedConditions;
let actResult, expResult;
cucumber_1.Given('I click Flights tab and expand Advanced Options', () => __awaiter(this, void 0, void 0, function* () {
    yield protractor_1.browser.wait(ec.elementToBeClickable(mainSearchPO.tabBookTypes.get(0)), 10000);
    yield mainSearchPO.tabBookTypes.get(0).click();
    yield flightsTabPO.linkAdvancedOpt.click();
}));
cucumber_1.Then('Round trip radio button is selected by default', () => __awaiter(this, void 0, void 0, function* () {
    chai_1.expect(yield flightsTabPO.rbTripOpts.get(0).isSelected()).true;
    chai_1.expect(yield flightsTabPO.rbTripOpts.get(1).isSelected()).false;
}));
cucumber_1.Then('Return date text, Return from and to text fields are visible', () => __awaiter(this, void 0, void 0, function* () {
    chai_1.expect(yield flightsTabPO.lbReturnDate.isDisplayed()).true;
    chai_1.expect(yield flightsTabPO.tfReturnFromCity.isDisplayed()).true;
    chai_1.expect(yield flightsTabPO.tfReturnToCity.isDisplayed()).true;
}));
cucumber_1.When('I click Oneway radio button', () => __awaiter(this, void 0, void 0, function* () { return yield protractor_1.browser.executeScript('arguments[0].click()', flightsTabPO.rbTripOpts.get(1)); }));
cucumber_1.Then('Oneway radio button is selected', () => __awaiter(this, void 0, void 0, function* () {
    chai_1.expect(yield flightsTabPO.rbTripOpts.get(0).isSelected()).false;
    chai_1.expect(yield flightsTabPO.rbTripOpts.get(1).isSelected()).true;
}));
cucumber_1.Then('Return date text, Return from and to text fields are not visible', () => __awaiter(this, void 0, void 0, function* () {
    chai_1.expect(yield flightsTabPO.lbReturnDate.isDisplayed()).false;
    chai_1.expect(yield flightsTabPO.tfReturnFromCity.isDisplayed()).false;
    chai_1.expect(yield flightsTabPO.tfReturnToCity.isDisplayed()).false;
}));
cucumber_1.When('I select {string}, {int}, {int}, {int}, {int}', (cabin, adult, child, infantLap, infantSeat) => __awaiter(this, void 0, void 0, function* () {
    yield protractor_1.browser.wait(ec.elementToBeClickable(mainSearchPO.tabBookTypes.get(0)), 10000);
    yield mainSearchPO.tabBookTypes.get(0).click();
    actResult = yield flightsTabPF.SelectTravelers(cabin, adult, child, infantLap, infantSeat);
}));
cucumber_1.Then('I can see these value are selected on travelers fields', () => __awaiter(this, void 0, void 0, function* () {
    expResult = yield protractor_1.browser.executeScript('return arguments[0].value', flightsTabPO.tfPerson);
    chai_1.expect(expResult).equal(actResult);
}));

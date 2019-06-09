import { Given, When, Then } from "cucumber";
import { MainSearchPO } from "../page_objects/mainSearchPO";
import { browser } from "protractor";
import { expect } from "chai";
import { FlightsTabPO } from "../page_objects/flightsTabPO";
import { protractor } from "protractor/built/ptor";
import { FlightsTabPF } from "../page_functions/flightsTabPF";

const mainSearchPO = new MainSearchPO();
const flightsTabPO = new FlightsTabPO();
const flightsTabPF = new FlightsTabPF();
const ec = protractor.ExpectedConditions;
let actResult: any, expResult: any;


Given('I click Flights tab and expand Advanced Options', async () => {
    await browser.wait(ec.elementToBeClickable(mainSearchPO.tabBookTypes.get(0)), 10000);
    await mainSearchPO.tabBookTypes.get(0).click();
    await flightsTabPO.linkAdvancedOpt.click();
});

Then('Round trip radio button is selected by default', async () => {
    expect(await flightsTabPO.rbTripOpts.get(0).isSelected()).true;
    expect(await flightsTabPO.rbTripOpts.get(1).isSelected()).false;
});

Then('Return date text, Return from and to text fields are visible', async () => {
    expect(await flightsTabPO.lbReturnDate.isDisplayed()).true;
    expect(await flightsTabPO.tfReturnFromCity.isDisplayed()).true;
    expect(await flightsTabPO.tfReturnToCity.isDisplayed()).true;
});

When('I click Oneway radio button', async () =>
    await browser.executeScript('arguments[0].click()', flightsTabPO.rbTripOpts.get(1)));

Then('Oneway radio button is selected', async () => {
    expect(await flightsTabPO.rbTripOpts.get(0).isSelected()).false;
    expect(await flightsTabPO.rbTripOpts.get(1).isSelected()).true;
});

Then('Return date text, Return from and to text fields are not visible', async () => {
    expect(await flightsTabPO.lbReturnDate.isDisplayed()).false;
    expect(await flightsTabPO.tfReturnFromCity.isDisplayed()).false;
    expect(await flightsTabPO.tfReturnToCity.isDisplayed()).false;
});

When('I select {string}, {int}, {int}, {int}, {int}',
    async (cabin: string, adult: number, child: number, infantLap: number, infantSeat: number) => {
        await browser.wait(ec.elementToBeClickable(mainSearchPO.tabBookTypes.get(0)), 10000);
        await mainSearchPO.tabBookTypes.get(0).click();
        actResult = await flightsTabPF.SelectTravelers(cabin, adult, child, infantLap, infantSeat);
    });

Then('I can see these value are selected on travelers fields', async () => {
    expResult = await browser.executeScript('return arguments[0].value', flightsTabPO.tfPerson);
    expect(expResult).equal(actResult);
});
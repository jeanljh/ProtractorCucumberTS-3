import { Before, After, Status } from 'cucumber';
import { browser } from 'protractor';
import { expect } from 'chai';

Before(async function() {
    await browser.get('https://www.cheapflightsfares.com/');
    expect(await browser.getCurrentUrl(), 'Main URL').equals('https://www.cheapflightsfares.com/');
});

After(async function(scenario) {
    if(scenario.result.status === Status.FAILED) {
        const screenshot = await browser.takeScreenshot();
        this.attach(screenshot, 'image/png');
    }
});
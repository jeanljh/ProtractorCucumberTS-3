import { ElementArrayFinder, protractor, browser, element, by } from "protractor";

const ec = protractor.ExpectedConditions;

export class SharedPF {
    async clickFromElements(elm: ElementArrayFinder, val: string) {
        await browser.wait(ec.elementToBeClickable(elm.get(0)), 5000, 'Flights tab is not clickable');
        for (let idx = 0; idx < await elm.count(); idx++) {
            const actResult = await elm.get(idx).getText();
            if (actResult.localeCompare(val, 'en', { sensitivity: 'base' }) === 0) {
                await elm.get(idx).click();
                return true;
            }
        }
        await console.log(`No matching element for ${val}`);
        return false;
    }

    async selectFromList(cssStr: string, val: string) {
        try {
            await element(by.cssContainingText(cssStr, val)).click();
            return true;
        } catch (error) {
            return false;;
        }
    }
}
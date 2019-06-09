import { FlightsTabPO } from "../page_objects/flightsTabPO";
import { browser, ElementFinder } from "protractor";

const flightsTabPO = new FlightsTabPO();

export class FlightsTabPF {
    async SelectTravelers(cabin: string, adult: number, child: number, infantLap: number,
        infantSeat: number) {
        await flightsTabPO.tfPerson.click();
        if (!await this.SelectClass(cabin)) return;
        if (adult < 1) {
            await console.log('Min total adults must be 1');
            return;
        }
        const total = adult + child + infantLap + infantSeat;
        if (total > 9) {
            await console.log('Max total travellers is 9');
            return;
        }
        if (infantLap > adult || infantSeat > adult) {
            await console.log('Total infant(on lap) or infant(on seat) must not more than total adults');
            return;
        }

        await this.SetTravelersCount(0, 1);
        await this.SetTravelersCount(1, 0);
        await this.SetTravelersCount(2, 0);
        await this.SetTravelersCount(3, 0);

        await this.SetTravelersCount(0, adult);
        await this.SetTravelersCount(1, child);
        await this.SetTravelersCount(2, infantLap);
        await this.SetTravelersCount(3, infantSeat);

        await browser.executeScript('arguments[0].click()', flightsTabPO.btnDone);

        // const strFormat = cabin.charAt(0).toUpperCase() + cabin.slice(1);
        return total === 1 ? `1 Adult, ${cabin}` : `${total} Travelers, ${cabin}`;
    }

    async SetTravelersCount(idx: number, input: number) {
        let currCount: number, diffCount: number, elm: ElementFinder;

        currCount = parseInt(await flightsTabPO.lbPerson.get(idx).getAttribute('value'));
        diffCount = Math.abs(input - currCount);

        if (input < currCount) {
            elm = flightsTabPO.iconMinus.get(idx);
        }
        else if (input > currCount) {
            elm = flightsTabPO.iconAdd.get(idx);
        }

        for (let i = 0; i < diffCount; i++) {
            await browser.executeScript('arguments[0].click()', elm);
        }
    }

    async SelectClass(cabin: string) {
        const total = await flightsTabPO.listCabinClass.count();
        let output: any;
        for (let i = 0; i < total; i++) {
            const actResult = await flightsTabPO.listCabinClass.get(i).getText();
            if (actResult.localeCompare(cabin, 'en', { sensitivity: 'base' }) === 0) {
                output = await flightsTabPO.listCabinClass.get(i).click().then(() => true);
            }
        }
        if (!output) {
            await console.log('No matching result for input');
            return;
        }
        output = await browser.executeScript('return arguments[0].options[arguments[0].selectedIndex].text',
            flightsTabPO.cbbCabinClass).then(t => t.toString());
        if (output.localeCompare(cabin, 'en', { sensitivity: 'base' }) === 0) return true;
        await console.log('Mismatch selected option with input');
    }
}
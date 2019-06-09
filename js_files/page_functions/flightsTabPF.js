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
const flightsTabPO_1 = require("../page_objects/flightsTabPO");
const protractor_1 = require("protractor");
const flightsTabPO = new flightsTabPO_1.FlightsTabPO();
class FlightsTabPF {
    SelectTravelers(cabin, adult, child, infantLap, infantSeat) {
        return __awaiter(this, void 0, void 0, function* () {
            yield flightsTabPO.tfPerson.click();
            if (!(yield this.SelectClass(cabin)))
                return;
            if (adult < 1) {
                yield console.log('Min total adults must be 1');
                return;
            }
            const total = adult + child + infantLap + infantSeat;
            if (total > 9) {
                yield console.log('Max total travellers is 9');
                return;
            }
            if (infantLap > adult || infantSeat > adult) {
                yield console.log('Total infant(on lap) or infant(on seat) must not more than total adults');
                return;
            }
            yield this.SetTravelersCount(0, 1);
            yield this.SetTravelersCount(1, 0);
            yield this.SetTravelersCount(2, 0);
            yield this.SetTravelersCount(3, 0);
            yield this.SetTravelersCount(0, adult);
            yield this.SetTravelersCount(1, child);
            yield this.SetTravelersCount(2, infantLap);
            yield this.SetTravelersCount(3, infantSeat);
            yield protractor_1.browser.executeScript('arguments[0].click()', flightsTabPO.btnDone);
            // const strFormat = cabin.charAt(0).toUpperCase() + cabin.slice(1);
            return total === 1 ? `1 Adult, ${cabin}` : `${total} Travelers, ${cabin}`;
        });
    }
    SetTravelersCount(idx, input) {
        return __awaiter(this, void 0, void 0, function* () {
            let currCount, diffCount, elm;
            currCount = parseInt(yield flightsTabPO.lbPerson.get(idx).getAttribute('value'));
            diffCount = Math.abs(input - currCount);
            if (input < currCount) {
                elm = flightsTabPO.iconMinus.get(idx);
            }
            else if (input > currCount) {
                elm = flightsTabPO.iconAdd.get(idx);
            }
            for (let i = 0; i < diffCount; i++) {
                yield protractor_1.browser.executeScript('arguments[0].click()', elm);
            }
        });
    }
    SelectClass(cabin) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = yield flightsTabPO.listCabinClass.count();
            let output;
            for (let i = 0; i < total; i++) {
                const actResult = yield flightsTabPO.listCabinClass.get(i).getText();
                if (actResult.localeCompare(cabin, 'en', { sensitivity: 'base' }) === 0) {
                    output = yield flightsTabPO.listCabinClass.get(i).click().then(() => true);
                }
            }
            if (!output) {
                yield console.log('No matching result for input');
                return;
            }
            output = yield protractor_1.browser.executeScript('return arguments[0].options[arguments[0].selectedIndex].text', flightsTabPO.cbbCabinClass).then(t => t.toString());
            if (output.localeCompare(cabin, 'en', { sensitivity: 'base' }) === 0)
                return true;
            yield console.log('Mismatch selected option with input');
        });
    }
}
exports.FlightsTabPF = FlightsTabPF;

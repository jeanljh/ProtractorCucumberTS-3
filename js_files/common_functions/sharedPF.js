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
const protractor_1 = require("protractor");
const ec = protractor_1.protractor.ExpectedConditions;
class SharedPF {
    clickFromElements(elm, val) {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.wait(ec.elementToBeClickable(elm.get(0)), 5000, 'Flights tab is not clickable');
            for (let idx = 0; idx < (yield elm.count()); idx++) {
                const actResult = yield elm.get(idx).getText();
                if (actResult.localeCompare(val, 'en', { sensitivity: 'base' }) === 0) {
                    yield elm.get(idx).click();
                    return true;
                }
            }
            yield console.log(`No matching element for ${val}`);
            return false;
        });
    }
    selectFromList(cssStr, val) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield protractor_1.element(protractor_1.by.cssContainingText(cssStr, val)).click();
                return true;
            }
            catch (error) {
                return false;
                ;
            }
        });
    }
}
exports.SharedPF = SharedPF;

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
const checkAvailabilityPO_1 = require("../page_objects/checkAvailabilityPO");
const checkAvailabilityPO = new checkAvailabilityPO_1.CheckAvailabilityPO();
class CheckAvailabilityPF {
    SelectDatePIcker(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const inputDate = new Date(date);
            const firstAvailDate = new Date(`${yield checkAvailabilityPO.lblDay.get(0).getText()} 
            ${yield checkAvailabilityPO.lblMonth.getText()} ${yield checkAvailabilityPO.lblYear.getText()}`);
            if (inputDate < firstAvailDate) {
                console.log('Invalid input date as it is a past date');
                return false;
            }
            while (true) {
                const curYear = new Date(yield checkAvailabilityPO.lblYear.getText()).getFullYear();
                const curMonth = new Date(`${yield checkAvailabilityPO.lblMonth.getText()} ${curYear}`).getMonth();
                if (inputDate.getFullYear() > curYear)
                    yield checkAvailabilityPO.btnNext.click();
                else if (inputDate.getMonth() > curMonth)
                    yield checkAvailabilityPO.btnNext.click();
                else
                    break;
            }
            const total = yield checkAvailabilityPO.lblDay.count();
            return yield checkAvailabilityPO.lblDay.reduce((acc, elm, idx) => {
                if (acc)
                    return acc;
                return elm.getText().then(text => {
                    if (text === inputDate.getDate().toString()) {
                        elm.click();
                        return true;
                    }
                    else if (idx === total - 1)
                        return false;
                });
            }, false);
        });
    }
    ValSelectedDate(date, checkInDate = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const expResult = new Date(date).toDateString();
            const actResult = new Date(checkInDate === true ? yield checkAvailabilityPO.tfCheckIn.getAttribute('value')
                : yield checkAvailabilityPO.tfCheckOut.getAttribute('value')).toDateString();
            return actResult === expResult ? true : false;
        });
    }
}
exports.CheckAvailabilityPF = CheckAvailabilityPF;

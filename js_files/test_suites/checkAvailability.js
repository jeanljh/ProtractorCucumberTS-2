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
const chai_1 = require("chai");
const checkAvailabilityPO_1 = require("../page_objects/checkAvailabilityPO");
const checkAvailabilityPF_1 = require("../page_functions/checkAvailabilityPF");
const checkAvailabilityPO = new checkAvailabilityPO_1.CheckAvailabilityPO();
const checkAvailabilityPF = new checkAvailabilityPF_1.CheckAvailabilityPF();
let actual, expect;
cucumber_1.Given('Default Check-In Date placeholder text is present', () => __awaiter(this, void 0, void 0, function* () { return chai_1.assert.equal(yield checkAvailabilityPO.tfCheckIn.getAttribute('placeholder'), 'Check-In Date'); }));
cucumber_1.Given('Default Check-Out Date placeholder text is present', () => __awaiter(this, void 0, void 0, function* () { return chai_1.assert.equal(yield checkAvailabilityPO.tfCheckOut.getAttribute('placeholder'), 'Check-Out Date'); }));
cucumber_1.Given("Default selected check-in date is today's date", () => __awaiter(this, void 0, void 0, function* () {
    yield checkAvailabilityPO.tfCheckIn.click();
    expect = yield new Date().toDateString();
    actual = new Date(`${yield checkAvailabilityPO.lblDay.get(0).getText()} ${yield checkAvailabilityPO.lblMonth.getText()}` +
        `${yield checkAvailabilityPO.lblYear.getText()}`).toDateString();
    chai_1.assert.equal(actual, expect);
    yield checkAvailabilityPO.lblDay.first().click();
    actual = new Date(yield checkAvailabilityPO.tfCheckIn.getAttribute('value')).toDateString();
    chai_1.assert.equal(actual, expect);
}));
cucumber_1.Given("Default selected check-out date is tomorrow's date", () => __awaiter(this, void 0, void 0, function* () {
    // const options: { year: string, month: string, day: string } = { year: 'numeric', month: 'long', day: 'numeric' };
    expect = yield new Date(new Date().setDate(new Date().getDate() + 1)).toDateString();
    actual = new Date(`${yield checkAvailabilityPO.lblDay.get(0).getText()} ${yield checkAvailabilityPO.lblMonth.getText()}` +
        `${yield checkAvailabilityPO.lblYear.getText()}`).toDateString();
    chai_1.assert.equal(actual, expect);
    yield checkAvailabilityPO.lblDay.first().click();
    actual = new Date(yield checkAvailabilityPO.tfCheckOut.getAttribute('value')).toDateString();
    chai_1.assert.equal(actual, expect);
}));
cucumber_1.When('Select {string} and {string} from date picker', (checkInDate, checkOutDate) => __awaiter(this, void 0, void 0, function* () {
    yield checkAvailabilityPO.tfCheckIn.click();
    chai_1.assert.isTrue(yield checkAvailabilityPF.SelectDatePIcker(checkInDate), 'select from check-in date picker');
    chai_1.assert.isTrue(yield checkAvailabilityPF.SelectDatePIcker(checkOutDate), 'select from check-out date picker');
}));
cucumber_1.Then('{string} and {string} are shown in check-in and check-out date fields', (checkInDate, checkOutDate) => __awaiter(this, void 0, void 0, function* () {
    chai_1.assert.isTrue(yield checkAvailabilityPF.ValSelectedDate(checkInDate), 'selected check-in date');
    chai_1.assert.isTrue(yield checkAvailabilityPF.ValSelectedDate(checkOutDate, false), 'selected check-out date');
}));

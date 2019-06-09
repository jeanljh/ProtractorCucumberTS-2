"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class CheckAvailabilityPO {
    constructor() {
        this.tfCheckIn = protractor_1.element(protractor_1.by.name('startDate'));
        this.tfCheckOut = protractor_1.element(protractor_1.by.name('endDate'));
        this.btnPrev = protractor_1.$("span[class*='triangle-w']");
        this.btnNext = protractor_1.$("span[class*='triangle-e']");
        this.lblMonth = protractor_1.$('.ui-datepicker-month');
        this.lblYear = protractor_1.$('.ui-datepicker-year');
        this.lblDay = protractor_1.$$("a[class*='ui-state-default']");
    }
}
exports.CheckAvailabilityPO = CheckAvailabilityPO;

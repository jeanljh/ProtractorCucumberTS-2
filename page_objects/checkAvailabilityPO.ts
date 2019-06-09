import { element, by, $$, $ } from "protractor";

export class CheckAvailabilityPO {
    tfCheckIn = element(by.name('startDate'));
    tfCheckOut = element(by.name('endDate'));
    btnPrev = $("span[class*='triangle-w']");
    btnNext = $("span[class*='triangle-e']");
    lblMonth = $('.ui-datepicker-month');
    lblYear = $('.ui-datepicker-year');
    lblDay = $$("a[class*='ui-state-default']");
}
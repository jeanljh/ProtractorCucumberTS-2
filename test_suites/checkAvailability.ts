import { Given, When, Then } from "cucumber";
import { assert } from "chai";
import { CheckAvailabilityPO } from '../page_objects/checkAvailabilityPO';
import { CheckAvailabilityPF } from "../page_functions/checkAvailabilityPF";

const checkAvailabilityPO = new CheckAvailabilityPO();
const checkAvailabilityPF = new CheckAvailabilityPF();
let actual: any, expect: any;

Given('Default Check-In Date placeholder text is present', async () =>
    assert.equal(await checkAvailabilityPO.tfCheckIn.getAttribute('placeholder'), 'Check-In Date'));

Given('Default Check-Out Date placeholder text is present', async () =>
    assert.equal(await checkAvailabilityPO.tfCheckOut.getAttribute('placeholder'), 'Check-Out Date'));

Given("Default selected check-in date is today's date", async () => {
    await checkAvailabilityPO.tfCheckIn.click();
    expect = await new Date().toDateString();
    actual = new Date(`${await checkAvailabilityPO.lblDay.get(0).getText()} ${await checkAvailabilityPO.lblMonth.getText()}` +
        `${await checkAvailabilityPO.lblYear.getText()}`).toDateString();
    assert.equal(actual, expect);

    await checkAvailabilityPO.lblDay.first().click();
    actual = new Date(await checkAvailabilityPO.tfCheckIn.getAttribute('value')).toDateString();
    assert.equal(actual, expect);
});

Given("Default selected check-out date is tomorrow's date", async () => {
    // const options: { year: string, month: string, day: string } = { year: 'numeric', month: 'long', day: 'numeric' };
    expect = await new Date(new Date().setDate(new Date().getDate() + 1)).toDateString();
    actual = new Date(`${await checkAvailabilityPO.lblDay.get(0).getText()} ${await checkAvailabilityPO.lblMonth.getText()}` +
        `${await checkAvailabilityPO.lblYear.getText()}`).toDateString();
    assert.equal(actual, expect);

    await checkAvailabilityPO.lblDay.first().click();
    actual = new Date(await checkAvailabilityPO.tfCheckOut.getAttribute('value')).toDateString();
    assert.equal(actual, expect);
});

When('Select {string} and {string} from date picker', async (checkInDate: string, checkOutDate: string) => {
    await checkAvailabilityPO.tfCheckIn.click();
    assert.isTrue(await checkAvailabilityPF.SelectDatePIcker(checkInDate), 'select from check-in date picker');
    assert.isTrue(await checkAvailabilityPF.SelectDatePIcker(checkOutDate), 'select from check-out date picker');
});

Then('{string} and {string} are shown in check-in and check-out date fields',
    async (checkInDate: string, checkOutDate: string) => {
        assert.isTrue(await checkAvailabilityPF.ValSelectedDate(checkInDate), 'selected check-in date');
        assert.isTrue(await checkAvailabilityPF.ValSelectedDate(checkOutDate, false), 'selected check-out date');
    });
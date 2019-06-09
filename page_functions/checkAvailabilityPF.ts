import { CheckAvailabilityPO } from "../page_objects/checkAvailabilityPO";
import { ElementArrayFinder } from "protractor";

const checkAvailabilityPO = new CheckAvailabilityPO();

export class CheckAvailabilityPF {
    async SelectDatePIcker(date: string) {
        const inputDate = new Date(date);
        const firstAvailDate = new Date(`${await checkAvailabilityPO.lblDay.get(0).getText()} 
            ${await checkAvailabilityPO.lblMonth.getText()} ${await checkAvailabilityPO.lblYear.getText()}`);
        if (inputDate < firstAvailDate) {
            console.log('Invalid input date as it is a past date');
            return false;
        }

        while (true) {
            const curYear = new Date(await checkAvailabilityPO.lblYear.getText()).getFullYear();
            const curMonth = new Date(`${await checkAvailabilityPO.lblMonth.getText()} ${curYear}`).getMonth();
            if (inputDate.getFullYear() > curYear) await checkAvailabilityPO.btnNext.click();
            else if (inputDate.getMonth() > curMonth) await checkAvailabilityPO.btnNext.click();
            else break;
        }

        const total = await checkAvailabilityPO.lblDay.count();
        return await checkAvailabilityPO.lblDay.reduce((acc: boolean, elm: ElementArrayFinder, idx: number) => {
            if (acc) return acc;
            return elm.getText().then(text => {
                if (text === inputDate.getDate().toString()) {
                    elm.click();
                    return true;
                }
                else if (idx === total - 1) return false;
            });
        }, false);
    }

    async ValSelectedDate(date: string, checkInDate: boolean = true) {
        const expResult = new Date(date).toDateString();
        const actResult = new Date(checkInDate === true ? await checkAvailabilityPO.tfCheckIn.getAttribute('value')
            : await checkAvailabilityPO.tfCheckOut.getAttribute('value')).toDateString();
        return actResult === expResult ? true : false;
    }
}
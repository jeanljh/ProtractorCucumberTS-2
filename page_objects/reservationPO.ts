import { $ } from "protractor";

export class ReservationPO {
    lblReserveDate = $(".modal-content input");
    lnkThisWeekend = $(".shortcut-memo :nth-child(2)");
    lnkNextWeekend = $(".shortcut-memo :nth-child(3)");
}
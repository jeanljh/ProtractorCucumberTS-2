"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class ReservationPO {
    constructor() {
        this.lblReserveDate = protractor_1.$(".modal-content input");
        this.lnkThisWeekend = protractor_1.$(".shortcut-memo :nth-child(2)");
        this.lnkNextWeekend = protractor_1.$(".shortcut-memo :nth-child(3)");
    }
}
exports.ReservationPO = ReservationPO;

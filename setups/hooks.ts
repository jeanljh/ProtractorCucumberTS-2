import { browser } from "protractor";
import { Before, After, Status } from "cucumber";

const url: string = 'https://www.quaysidehotel.com.my/';

Before(async function (): Promise<void> {
    await browser.get(url);
});

After(async function (scenario): Promise<void> {
    if (scenario.result.status === Status.FAILED) {
        const screenshot = await browser.takeScreenshot();
        this.attach(screenshot, 'image/png');
    }
});
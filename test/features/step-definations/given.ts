import { Given } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Login into inventory web app$/, async function () {
  /** 1. Login to inventory app */
  // @ts-ignore
  await browser.url("https://www.saucedemo.com/");
  //console.log(`>> Test config values: ${JSON.stringify(browser.config)}`);
  //await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  // await browser.maximizeWindow()

  /** 2. Login to Inventory App*/
  try {
    await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME)
    await $(`#password`).setValue(process.env.TEST_STD_PASSWORD)
    await $(`#login-button`).click()
  } catch (error) {
    console.log(`Error in first login. Retrying..`)
    await browser.refresh()
    await browser.pause(2000)
    await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME)
    await $(`#password`).setValue(process.env.TEST_STD_PASSWORD)
    await $(`#login-button`).click()
  }

  // await browser.debug()

})

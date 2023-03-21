import type { Options } from "@wdio/types";
import allure from "@wdio/allure-reporter";
import dotenv from "dotenv";
dotenv.config();

export const config: Options.Testrunner = {
  runner: 'local',
  hostname: '0.0.0.0',
  port: 4444,
  path: '/wd/hub',
  //path: '/ui/',
  specs: [ './test/features/**/*.feature' ],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
    maxInstances: 5,
    browserName: 'chrome',
    port: 4444,
    acceptInsecureCerts: true,
    timeouts: { implicit: 10000, pageLoad: 20000, script: 30000 },
},
{
    maxInstances: 1,
    browserName: 'firefox',
    port: 4444,
    acceptInsecureCerts: true,
    timeouts: { implicit: 10000, pageLoad: 20000, script: 30000 },
},
{
    maxInstances: 1,
    browserName: 'MicrosoftEdge',
    port: 4444,
    acceptInsecureCerts: true,
    timeouts: { implicit: 10000, pageLoad: 20000, script: 30000 },
}

],

  logLevel: "info",

  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  //services: ["chromedriver"],
  framework: "cucumber",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        useCucumberStepReporter: true,
      },
    ],
  ],

  cucumberOpts: {
    require: ["./test/features/step-definations/*.ts"],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    snippets: true,
    source: true,
    strict: false,
    tagExpression: "@demo",
    timeout: 600000,
    ignoreUndefinedDefinitions: false,
  },

  afterStep: async function (step, scenario, result, context) {
    // Take screenshot if failed
    if (!result.passed) {
      await browser.takeScreenshot();
    }
  },
};

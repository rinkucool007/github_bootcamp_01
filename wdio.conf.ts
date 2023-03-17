import type { Options } from "@wdio/types";
import allure from "@wdio/allure-reporter";
import dotenv from "dotenv";
dotenv.config();

export const config: Options.Testrunner = {
  //
  // ====================
  // Runner Configuration
  // ====================
  // WebdriverIO supports running e2e tests as well as unit and component tests.
  runner: "local",
  autoCompileOpts: {
    tsNodeOpts: {
      project: "./tsconfig.json",
    },
  },

  specs: ["./test/features/**/*.feature"],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--disable-web-security",
          "--headless",
          "--disable-dev-shm-usage",
          "--no-sandbox",
          "--window-size=1920,1080",
        ],
      },
      acceptInsecureCerts: true,
    },
  ],

  logLevel: "info",

  bail: 0,
  baseUrl: "http://localhost",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["chromedriver"],
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

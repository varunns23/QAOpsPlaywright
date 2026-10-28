// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */

//here config is an object which contains all the configuration settings(key value pairs) for playwright test cases
const config = ({
  testDir: './tests',

  retries: 1, //to run the failed test cases again for 1 time. we can also set it to any value as per our requirement. we can also set it to 0 to not run the failed test cases again.
  workers: 3, //to run the test cases in parallel for 3 workers.It means 3 files will run in parallel. we can also set it to any value as per our requirement. we can also set it to 1 to run the test cases in serial.
 //bydefault total 5 workers will run in parallel. we can also set it to 1 to run the test cases in serial. we can also set it to any value as per our requirement.
 //inside files, tests will run in serial by default.

 //deafult timeout in playwright is 30 seconds but we can change it to any value as per our requirement
  timeout: 30 * 1000,

  //for assertion we can also set a timeout for expect function which is 5 seconds by default but we can change it to any value as per our requirement
  expect: {
    timeout: 5000
  },

  //to generate the html report we can use reporter property and set it to html
  reporter: 'html',


  projects: [
    {
      name: 'safari', //name of the project
      use: {

        browserName: 'webkit', //to run the test cases in firefox browser we can set it to firefox and to run in chrome we can set it to chromium and to run in safari we can set it to webkit
        headless: false, //to run the test cases in headless mode we can set it to true and to run in headed mode we can set it to false
        //if we dont give headless here then we can also give it in the command line while running the test cases using --headed or --headless flag
        actionTimeout: 10 * 1000, //gloabl level timeout for actions
        navigationTimeout: 30 * 1000, //gloabl level timeout for navigations
        screenshot: 'on',
        trace: 'on', //retain-on-failure, off
        ...devices['iPhone 12'], //to run the test cases in mobile view we can use the devices property and set it to the device name. we can also use the devices property to run the test cases in different browsers and different devices. we can also use the devices property to run the test cases in different viewports. we can also use the devices property to run the test cases in different screen sizes. we can also use the devices property to run the test cases in different orientations. we can also use the devices property to run the test cases in different locales. we can also use the devices property to run the test cases in different timezones. we can also use the devices property to run the test cases in different geolocations. we can also use the devices property to run the test cases in different network conditions. we can also use the devices property to run the test cases in different CPU throttling conditions. we can also use the devices property to run the test cases in different memory throttling conditions. we can also use the devices property to run the test cases in different battery conditions. we can also use the devices property to run the test cases in different device orientations. we can also use the devices property to run the test cases in different device pixel ratios. we can also use the devices property to run the test cases in different device screen sizes. we can also use the devices property to run the test cases in different device screen resolutions. we can also use the devices property to run the test cases in different device screen densities. we can also use the devices property to runthe test cases in different device screen aspect ratios. we can also usethe devices property to runthe test cases in different device screen refresh rates. we can also usethe devices property to runthe test cases in different device screen color depths. we can also usethe devices property to runthe test cases in different device screen color gamuts. we can also usethe devices property to run

      }

    },
    {
      name: 'chrome', //name of the project
      use: {

        browserName: 'chromium', //to run the test cases in firefox browser we can set it to firefox and to run in chrome we can set it to chromium and to run in safari we can set it to webkit
        headless: false, //to run the test cases in headless mode we can set it to true and to run in headed mode we can set it to false
        //if we dont give headless here then we can also give it in the command line while running the test cases using --headed or --headless flag
        actionTimeout: 10 * 1000, //gloabl level timeout for actions
        navigationTimeout: 30 * 1000, //gloabl level timeout for navigations
        screenshot: 'on',
        trace: 'on', //retain-on-failure, off
        video : 'retain-on-failure', //to record the video of the test case execution and save it in the videos folder. we can also set it to on to record the video of all the test cases. we can also set it to off to not record the video of any test case. we can also set it to retain-on-failure to record the video of only failed test cases.
        //viewport: { width: 720, height: 720 }, //to set the viewport size for the browser window. we can also set it to null to use the default viewport size of the browser window. we can also set it to any value as per our requirement.
        ignoreHTTPSErrors: true, //to ignore the https errors in the browser window.If SSL certificate is not valid then it will ignore the error and continue the test execution. we can also set it to false to not ignore the https errors in the browser window. we can also set it to any value as per our requirement.
        permissions: ['geolocation'], //to set the permissions for the browser window. to provide loca
   
      }
    }
  ]


});

//exporting the config object to be used in other files
module.exports = config


// to use this config - npx playwright test tests/clientappE2EPOM.spec.js --config playwright.config1.js 
// to run any singe project - npx playwright test tests/clientappE2EPOM.spec.js --config playwright.config1.js --project="safari"
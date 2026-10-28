// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */

//here config is an object which contains all the configuration settings(key value pairs) for playwright test cases
const config = ({
  testDir: './tests',
  
  //deafult timeout in playwright is 30 seconds but we can change it to any value as per our requirement
timeout: 30 * 1000,

  //for assertion we can also set a timeout for expect function which is 5 seconds by default but we can change it to any value as per our requirement
expect : {
  timeout: 5000
},

//to generate the html report we can use reporter property and set it to html
  reporter: 'html',


  use: {
  
    browserName: 'chromium', //to run the test cases in firefox browser we can set it to firefox and to run in chrome we can set it to chromium and to run in safari we can set it to webkit

    headless: true, //to run the test cases in headless mode we can set it to true and to run in headed mode we can set it to false
   //if we dont give headless here then we can also give it in the command line while running the test cases using --headed or --headless flag

  actionTimeout: 10 * 1000, //gloabl level timeout for actions
  navigationTimeout: 30 * 1000, //gloabl level timeout for navigations
screenshot : 'on',
trace: 'on', //retain-on-failure, off
   
  }

   

});

//exporting the config object to be used in other files
   module.exports = config


const { Builder } = require('selenium-webdriver');
const axios = require('axios');
// const chrome = require('chromedriver')



async function openWebsitesFromAPI(browser) {
    // make a GET request to the API to retrieve the list of websites
    const response = await axios.get('https://api.peviitor.ro/v4/jobs/');
    const entries = response.data.response.docs;


    for (let entry of entries) {
        let driver = await new Builder().forBrowser(browser).build();
        driver.manage().window().maximize()
        // wait for 5 seconds
        // navigate to the website
        await driver.get(entry.job_link[0]);

        await driver.sleep(1000);

        // close the browser
        await driver.quit();
    }

    // loop through each website and open it in a new browser window
    let intervalId = setInterval(openWebsitesFromAPI, 10 * 60 * 1000);

    window.onbeforeunload = function () {
        clearInterval(intervalId);
    };
}

// Chrome: 'chrome'
// Firefox: 'firefox'
// Edge: 'MicrosoftEdge'
// Safari: 'safari'

openWebsitesFromAPI('chrome');
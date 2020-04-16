const puppeteer = require('puppeteer');
puppeteer.launch().then(async function(browser) {
    const page = await browser.newPage();
    await page.goto('http://digidb.io/digimon-list/');
    
    // Targeting the DOM Nodes that contain the Digimon names
    const digimonNames = await page.$$eval('#digiList tbody tr td:nth-child(2) a', function(digimons) {
      // Mapping each Digimon name to an array
        return digimons.map(function(digimon) {
          return digimon.innerText;
    });
  });
  // Transform the array into a string, then to an object and stringify it
  let dnString = digimonNames.join(",");
  let resu = JSON.stringify({names:dnString});
  await browser.close();
  console.log(resu);
});
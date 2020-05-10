let scrapePubli24 = async function(){
    const puppeteer = require('puppeteer');

    let data={
        email : "catalinaanamaria56@gmail.com",
        parola : "123456789Catalina",
        titlu : "aaaa",
        categorie: 'Auto',
        descriere : "....",
        oras : "Arad",
        nrTel : "074679890"
    }

    function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    };
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const publi24 = 'https://www.publi24.ro/adauga-anunturi?utm_expid=.OBHtHVd1SemklUogYx5Stg.0&utm_referrer=https%3A%2F%2Fwww.publi24.ro%2F';
    await page.goto(publi24);
  
    await page.type('#Title', data["titlu"]);
    await page.type('#Description', data["descriere"]);
    await page.click('#selectCategory > div.large-3.medium-6.columns > a')
    await page.waitForSelector('#CategoryBoxContainer > div > div > div > ul', {timeout: 5000});
    
  
    await page.screenshot({path: 'publi.png', fullPage: true});
    await browser.close();
  }

module.exports = scrapePubli24;
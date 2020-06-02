let scrapePubli24 = async function(userData){

  return new Promise( async(resolve,reject) => {
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({headless: true, slowMo: 100, defaultViewport: null })
    const page = await browser.newPage()
    
    const navigationPromise = page.waitForNavigation()
    
    await page.goto('https://www.publi24.ro/')
    
    await page.setViewport({ width: 1280, height: 578 })
    
    await page.waitForSelector('#headerPartial > #header > .row > .small-12 > .warningbg')
    await page.click('#headerPartial > #header > .row > .small-12 > .warningbg')
    
    await navigationPromise
    
    await page.waitForSelector('.login > .row > .small-12 > form > .radius:nth-child(2)')
    await page.click('.login > .row > .small-12 > form > .radius:nth-child(2)')
    
    await page.type('.login > .row > .small-12 > form > .radius:nth-child(2)', userData['publi24Username'])
    
    await page.type('.login > .row > .small-12 > form > .radius:nth-child(3)', userData['publi24Password'])
    
    await page.waitForSelector('.login > .row > .small-12 > form > .successbg')
    await page.click('.login > .row > .small-12 > form > .successbg')
    
    await navigationPromise
    
    await page.waitForSelector('.placead > #save-article-form #Title')
    await page.click('.placead > #save-article-form #Title')
    
    await page.type('.placead > #save-article-form #Title', userData['titlu'])
    
    await page.type('.placead > #save-article-form #Description', userData['descriere'])
    
    await page.waitForSelector('.placead > #save-article-form > #selectCategory > .large-3 > .button')
    await page.click('.placead > #save-article-form > #selectCategory > .large-3 > .button')
    
    await page.waitForSelector('.large-12 > .large-block-grid-6 > .radius:nth-child(1) > .GTM_SelectCategory > .GTM_SelectCategory:nth-child(1)')
    await page.click('.large-12 > .large-block-grid-6 > .radius:nth-child(1) > .GTM_SelectCategory > .GTM_SelectCategory:nth-child(1)')
    
    await page.waitForSelector('#save-article-form > #PlaceAdFormDetails #Prop_subcategory')
    await page.click('#save-article-form > #PlaceAdFormDetails #Prop_subcategory')
    
    await page.select('#save-article-form > #PlaceAdFormDetails #Prop_subcategory', 'Samsung')
    
    await page.waitForSelector('#save-article-form > #PlaceAdFormDetails #Prop_subcategory')
    await page.click('#save-article-form > #PlaceAdFormDetails #Prop_subcategory')
    
    await page.waitForSelector('#save-article-form > #PlaceAdFormDetails #Price')
    await page.click('#save-article-form > #PlaceAdFormDetails #Price')
    await page.type('#save-article-form > #PlaceAdFormDetails #Price', userData['pret'])
  
    /*
    await page.waitForSelector('#save-article-form > #formContact #ContactName')
    await page.click('#save-article-form > #formContact #ContactName')
    
    await page.type('#save-article-form > #formContact #ContactName', userData['numePubli24'])
    
    await page.waitForSelector('#save-article-form > #formContact #Phone')
    await page.click('#save-article-form > #formContact #Phone')
    
    await page.type('#save-article-form > #formContact #Phone', userData['telefon'])
    
    await page.type('#formContact > #rowLocation #Location', userData['oras'])
    await page.waitForSelector('#eac-container-Location', {timeout: 5000});
    await page.keyboard.press('Enter');
  
    */
    await page.waitForSelector('#ProductsDetails > div > div:nth-child(8) > div.large-8.medium-6.columns > table > tbody > tr.activation.free > td:nth-child(1) > label')
    //await page.click('.promo > tbody > .activation > td > .select')

    await page.click('#ProductsDetails > div > div:nth-child(8) > div.large-8.medium-6.columns > table > tbody > tr.activation.free > td:nth-child(1) > label')
    
    await page.click('#save-article-btn');
    await browser.close();

    resolve("Publi24 post ok");
  })


  }

module.exports = scrapePubli24;
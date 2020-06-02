
let scrapeOlx = async function (userData){
  return new Promise(async (resolve,reject) => {

    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
      const puppeteer = require('puppeteer');
      const browser = await puppeteer.launch({ headless: false, slowMo: 100, defaultViewport: null });
      const page = await browser.newPage();
      const olx = 'https://www.olx.ro/adauga-anunt/?bs=homepage_adding';
      await page.goto(olx);
      //checks for cookies and accepts
      try {
        await page.waitForSelector('#cookiesBar > button', {timeout: 5000});
        await page.click('#cookiesBar > button')
      } catch (error) {
        console.log("Cookie didn't appear.")
      }
  
      await page.type('#userEmail', userData["email"]);
      await page.type('#userPass', userData["parola"]);
      await Promise.all([
        page.waitForNavigation(),
       page.click('#se_userLogin')
      ]);
    
      await page.type('#add-title', userData["titlu"]);
     await page.click('.h100 > #category-breadcrumb-container > #targetrenderSelect1-0 > dt > a');
    
      await page.waitForSelector('.icongrid > .fleft:nth-child(1) > .lheight16 > #cat-101 > .caticon');
      await page.click('.icongrid > .fleft:nth-child(1) > .lheight16 > #cat-101 > .caticon');
      await page.waitForSelector('.fleft > .fleft > .dynamic-param-price__value > .dynamic-param-price__input > .text');
      await page.click('.fleft > .fleft > .dynamic-param-price__value > .dynamic-param-price__input > .text');
      await page.type('.fleft > .fleft > .dynamic-param-price__value > .dynamic-param-price__input > .text', userData["pret"]);
      
      if(userData["moneda"]=="euro"){
        await page.click("#targetrenderSelect2-0 > dt > a");
        await page.click("#targetrenderSelect2-0 > dd > ul > li:nth-child(2) > a");
      }
      if (userData["stare_olx"]=="nou"){
        await page.click("#targetparam17 > li:nth-child(3) > a");
      }
      else {
        await page.click("#targetparam17 > li:nth-child(2) > a");
      }
  
      if(userData["juridic"]="Persoana fizica"){
        await page.click("#targetid_private_business > li:nth-child(2) > a");
      }
      else{
        await page.click("#targetid_private_business > li:nth-child(3) > a");
      }
      await page.type('#add-description', userData["descriere"]);
      await page.type ('#mapAddress', userData["oras"]);
      await page.waitForSelector('#autosuggest-geo-ul > li', {timeout: 5000});
      await page.keyboard.press('Enter');
      await page.type ('#add-phone',userData["telefon"]);
      await page.waitForSelector('.acceptrules-box > .fblock > .area > .focusbox > .icon');
      await page.click('.acceptrules-box > .fblock > .area > .focusbox > .icon');
      await page.click("#save");
      await page.click ("#innerLayout > section > div.wrapper > ul > li.olx-multipay__step.olx-multipay__step--bundles > div > div.olx-multipay__step-buttons > a.olx-button.olx-button--secondary.qa-button-promo-without.js-allow-abandon");
     
      await page.screenshot({path: 'olx.png', fullPage: true});
      await browser.close();
      
      resolve("Olx post OK");

  })
 
}



module.exports = scrapeOlx;
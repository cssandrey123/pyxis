let userData={
    numePubli24 : "Catalina G",
    email : "catalinagligor@gmail.com",
    parola : "123456789Catalina",
    titlu : "Telefon Samsung Galaxy S5",
    descriere : "Vand telefon mobil samsung galaxy s5, stare foarte buna.",
    pret : "300",
    moneda : "lei",
    stare_olx : "utilizat",
    juridic : "Persoana fizica",
    oras : "Timisoara",
    telefon : "0742331917"
}

let olxScrapeMobile =async function (userData){
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

}
//olxScrapeMobile(userData);
let Publi24ScrapeMobile = async function (userData){
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({headless: false, slowMo: 100, defaultViewport: null })
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://www.publi24.ro/')
  
  await page.setViewport({ width: 1280, height: 578 })
  
  await page.waitForSelector('#headerPartial > #header > .row > .small-12 > .warningbg')
  await page.click('#headerPartial > #header > .row > .small-12 > .warningbg')
  
  await navigationPromise
  
  await page.waitForSelector('.login > .row > .small-12 > form > .radius:nth-child(2)')
  await page.click('.login > .row > .small-12 > form > .radius:nth-child(2)')
  
  await page.type('.login > .row > .small-12 > form > .radius:nth-child(2)', userData['email'])
  
  await page.type('.login > .row > .small-12 > form > .radius:nth-child(3)', userData['parola'])
  
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

  
  await page.waitForSelector('#save-article-form > #formContact #ContactName')
  await page.click('#save-article-form > #formContact #ContactName')
  
  await page.type('#save-article-form > #formContact #ContactName', userData['numePubli24'])
  
  await page.waitForSelector('#save-article-form > #formContact #Phone')
  await page.click('#save-article-form > #formContact #Phone')
  
  await page.type('#save-article-form > #formContact #Phone', userData['telefon'])
  
  await page.type('#formContact > #rowLocation #Location', userData['oras'])
  await page.waitForSelector('#eac-container-Location', {timeout: 5000});
  await page.keyboard.press('Enter');

  
  await page.waitForSelector('.promo > tbody > .activation > td > .select')
  await page.click('.promo > tbody > .activation > td > .select')
  
  await page.click('#save-article-btn');
  await browser.close()
}
Publi24ScrapeMobile(userData);

/*
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
*/

const puppeteer = require('puppeteer');

let data={
	email : "catalinaanamaria56@gmail.com",
	parola : "123456789Catalina",
  titlu : "Rochie lunga",
  categorie: "Moda",
  descriere : "Vand rochie neagra, marimea M",
  pret : "1000",
  marime : "M",
  stare: "Purtata o singura data",
  culoare: "Rosu",
  oras : "Arad",
  nrTel : "074679890"

}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
async function olx(){
	const browser = await puppeteer.launch();
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

	  await page.type('#userEmail', data["email"]);
    await page.type('#userPass', data["parola"]);
  	await Promise.all([
   	 page.waitForNavigation(),
     page.click('#se_userLogin')
    ]);
  
    try{
      await page.waitForSelector('#fancybox-wrap',{timeout : 10000});
      await page.click('#fancybox-close');
    } catch (error){
      console.log("Fancy box1 did not appear");
    }
    try{
      await page.waitForSelector('#smsVerificationContainer > div.step.closeConfirm.active > div.smsverification__footer > div.action-minor > a > span', {timeout : 10000});
      await page.click('#smsVerificationContainer > div.step.closeConfirm.active > div.smsverification__footer > div.action-minor > a > span');
    }catch(error){
      console.log("Fancy box 2 did not appear");
    }

    await page.type('#add-title', data["titlu"]);
    
    await page.waitForSelector('.h100 > #category-breadcrumb-container > #targetrenderSelect1-0 > dt > a')
    await page.click('.h100 > #category-breadcrumb-container > #targetrenderSelect1-0 > dt > a')
    
    await page.waitForSelector('.icongrid > .fleft > .lheight16 > #cat-1081 > .caticon')
    await page.click('.icongrid > .fleft > .lheight16 > #cat-1081 > .caticon')
    
    await page.waitForSelector('#fancybox-outer > #fancybox-content #fancybox-close')
    await page.click('#fancybox-outer > #fancybox-content #fancybox-close')

    

    await page.type('#add-description', data["descriere"]);
    await page.type ('#mapAddress', data["oras"]);
    await page.waitForSelector('#autosuggest-geo-ul > li', {timeout: 5000});
    await page.keyboard.press('Enter');
    await page.type ('#add-phone',data["nrTel"]);

    
    
    //Posting
    //await page.click('#save');

    //waits to take a screenshot of the page
   
    await page.screenshot({path: 'olx.png', fullPage: true});
    
    await browser.close();

}
olx();
async function publi24(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.publi24.ro/');
  await page.click('#header > div > div > a.warningbg.radius');
  await page.waitForNavigation();
  await page.click('#newOffer > div > div.fblock.cloud > div.area.clr > div > label', data['email']);
  await page.click ('#content > div > div > div > div:nth-child(3) > div > form > input:nth-child(3)', data[parola]);
  /*
  await page.type('#Title', data["titlu"]);
  await page.type('#Description', data["descriere"]);
  await page.click('#selectCategory > div.large-3.medium-6.columns > a')
  await page.waitForSelector('#CategoryBoxContainer > div > div > div > ul', {timeout: 5000});
  
*/
  await page.screenshot({path: 'publi.png', fullPage: true});
  await browser.close();
}
//publi24();


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
  titlu : "aaaa",
  categorie: 'Auto',
  descriere : "....",
  oras : "Arad",
  nrTel : "074679890"

}
//let categorie =["Auto","Imobiliare", "Locuri de munca", "Electrocasnice", "Moda si frumusete",
 //"Casa si gradina", "Mama si copilul", "Sport si timp liber", "Animale", "Agro", "Servicii"];

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
      await page.waitForSelector('#smsVerificationContainer > div.step.step1.active', {timeout : 5000});
      await page.click('#fancybox-close');
    } catch (error){
      console.log("Fancy box1 did not appear");
    }
    try{
      await page.waitForSelector('#smsVerificationContainer > div.step.closeConfirm.active', {timeout : 5000})
      await page.click('#fancybox-close');
    }catch(error){
      console.log("Fancy box 2 did not appear");
    }

    await page.type('#add-title', data["titlu"]);
    await page.click('#targetrenderSelect1-0 > dt > a');
    /* alegere categorie :((
    switch(data["categorie"]){
      case "Auto":
        await page.click("#cat-5 > span.caticon.cat-icon-5");
        break;
      case "Imobiliare":
          await page.click("#cat-3 > span.caticon.cat-icon-3");
          break;
       case "Locuri de munca":
          await page.click("#cat-4 > span.caticon.cat-icon-4");
          break;
    }
*/
    await page.type('#add-description', data["descriere"]);

   

    await page.type ('#mapAddress', data["oras"]);

    await page.waitForSelector('#autosuggest-geo-ul > li', {timeout: 5000});
    await page.keyboard.press('Enter');
    await page.type ('#add-phone',data["nrTel"]);

    await page.click('#newOffer > div > div.fblock.cloud > div.area.clr > div > label');
    
    //Posting
    //await page.click('#save');
    await timeout(5000);
    await page.screenshot({path: 'olx.png', fullPage: true});
    await browser.close();

}
//olx();
async function publi24(){
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
publi24();
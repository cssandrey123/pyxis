
let scrapeOlx = async function (userData){
  return new Promise(async (resolve,reject) => {

    console.log(userData);
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    };
    let data={
      email : "catalinaanamaria56@gmail.com",
      parola : "123456789Catalina",
      titlu : "aaaa",
      categorie: 'Auto',
      descriere : "....",
      oras : "Arad",
      nrTel : "074679890"
    };
    
    const puppeteer = require('puppeteer');
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
      await page.screenshot({path: 'public/backend-js/olx.png', fullPage: true});
      await browser.close();

      resolve("Olx post succesfully added");

  })
 
}



module.exports = scrapeOlx;
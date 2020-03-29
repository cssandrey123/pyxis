const express = require('express');
const app = express();
const path = require('path');
const puppeteer = require('puppeteer');


app.use(express.static(path.join(__dirname,'public')));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

      
app.post('/',(req,res) => {
  // replace code here

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
    // Retrun the POST result
    res.end(resu);

    // Closing the Puppeteer controlled headless browser
    await browser.close();        
  });


  // replace code here
  let test = JSON.stringify({name:"asd"});
});
// app.get('/',(req,res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//     res.send('Worked fuck it');
// });
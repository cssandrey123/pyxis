const express = require('express');
const app = express();  
const bodyParser = require('body-parser')
const path = require('path');
const scrapeOlx = require('./public/backend-js/olx-scrape.js');
const scrapePubli24 = require('./public/backend-js/publi24-scrape.js');

const pageRouter = require('./pages');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//routers
app.use('/',pageRouter);

const PORT = /*process.env.PORT ||*/ 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
     
app.post('/html/post.html',async (req,res) => {
  // Console log the req body
  req.on('data', reqBody => {
    /**
     * If you want to use reqBody, you need to parse it from json to javascript object with JSON.parse(reqBody)
     * Ex: // console.log(JSON.parse(reqBody).websites);
     */
    console.log(`Data receive in body: ${reqBody}`)
    
  });
  // Calling puppeteer to do the work, it's imported in line 5 from a local file
  // await scrapeOlx();
  // await scrapePubli24();
  res.end("sdasd");
});

app.post('/html/post.html/posteaza',async (req,res) => {
  console.log(req);
  req.on('data', async (reqBody) => {
    let olx=false;
    let publi=false;

    if(JSON.parse(reqBody).olx) {
      // apelat puppeteer pt olx
      let olxResponse = await scrapeOlx(JSON.parse(reqBody));
      if(olxResponse)
        olx=true;
    }
    if(JSON.parse(reqBody).publi24) {
      // apelat puppeteer pt publi24
      let publiResponse = await scrapePubli24(JSON.parse(reqBody));
      if(publiResponse)
        publi=true;
    }

    if(JSON.parse(reqBody).olx && olx === false){
      res.end('Something went wrong');
    }
    if(JSON.parse(reqBody).publi24 && publi24 === false){
      res.end('Something went wrong');
    }

    res.end('Post succesfully');
  });
  
 
});

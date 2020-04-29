const express = require('express');
const app = express();  
const bodyParser = require('body-parser')
const path = require('path');
const ppteer = require('./public/backend-js/puppeteer-post.js');

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
  const ppteerResponse = await ppteer();
  console.log(`Data sent:\n ${ppteerResponse}`);
  // Send response to frontend
  res.end(ppteerResponse);
});
